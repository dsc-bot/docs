import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { glob } from 'glob';

const ARTICLES_DIR = path.join(__dirname, '../articles');

async function getArticles(): Promise<any[]> {
  const files = await glob('**/*.md', { cwd: ARTICLES_DIR });
  const articlesByLanguage: Record<string, any[]> = {};

  files.forEach((file) => {
    const filePath = path.join(ARTICLES_DIR, file);
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const { data: frontMatter } = matter(fileContents);

    const [language, ...slugs] = file.replace(/\.md$/, '').split(path.sep);

    const isIndex = slugs[slugs.length - 1] === 'index';
    const slug = isIndex ? (slugs.length > 1 ? slugs[slugs.length - 2] : '@') : slugs.pop();

    articlesByLanguage[language] = articlesByLanguage[language] || [];

    let current = articlesByLanguage[language];
    slugs.slice(0, -1).forEach((slugPart) => {
      let subArticle = current.find((item) => item.slug === slugPart);
      if (!subArticle) {
        subArticle = { slug: slugPart, articles: [] };
        current.push(subArticle);
      }
      current = subArticle.articles;
    });

    if (!current.find((item) => item.slug === slug)) {
      const articleData = {
        metadata: frontMatter,
        slug,
      };

      if (!isIndex && slugs.length > 0) {
        // @ts-expect-error This is okay lol
        articleData.articles = [];
      }

      current.push(articleData);
    }
  });

  return Object.keys(articlesByLanguage).map((language) => ({
    language,
    articles: articlesByLanguage[language],
  }));
}

async function generateArticlesFile() {
  const articlesData = await getArticles();
  const availableLanguages = articlesData.map((langData) => langData.language);

  const output =
    `const availableLanguages = ${JSON.stringify(availableLanguages, null, 2)};\n\n` +
    `const articles = ${JSON.stringify(articlesData, null, 2)};\n\n` +
    `export { availableLanguages, articles };`;

  fs.writeFileSync(path.join(__dirname, '../articles.ts'), output, 'utf-8');
  console.log('articles.ts file generated successfully.');
}

generateArticlesFile().catch((error) => {
  console.error('Error generating articles file:', error);
});
