import matter from 'gray-matter';
import { readdirSync, readFileSync, stat, statSync, writeFileSync } from 'fs';
import path from 'path';

interface Article {
  metadata: Record<string, unknown>;
  slug: string;
  articles?: Article[];
}

interface LanguageData {
  paths: Record<string, string>;
  articles: Article[];
}

interface Articles {
  [language: string]: LanguageData;
}

async function processMarkdownFiles() {
  const languages = readdirSync('../articles').filter((f) => statSync(`../articles/${f}`).isDirectory());
  const articlesByLanguage: Articles = {};

  for (const lang of languages)
    articlesByLanguage[lang] = buildArticle({}, [], '../articles/'+lang);

  const output =
    `/**\n *\n *\n * DO NOT MANUALLY EDIT - THIS FILE IS PROGRAMMATICALLY GENERATED - scripts/generateMetadata.ts \n *\n *\n*/\n` +
    `import type { AvailableLanguages, Articles } from './types';\n` +
    `export const fallbackLanguage = 'en-US';\n` +
    `export const articles: Articles = ${JSON.stringify(articlesByLanguage, null, 2)};\n` +
    `export const availableLanguages: AvailableLanguages = ${JSON.stringify(languages, null, 2)};\n`;
  writeFileSync('../articles.ts', output);
}

function buildArticle(paths: LanguageData['paths'], articles: Article[], rootPath: string, depth: number = 1) {
  const files = readdirSync(rootPath);

  for (let file of files) {
    const filePath = path.join(rootPath, file);
    const isDir = statSync(filePath).isDirectory();
    if (depth != 1 && file === 'index.md') continue;

    const content = readFileSync(isDir ? path.join(filePath, 'index.md') : filePath, 'utf-8');
    const { data: frontMatter } = matter(content);

    const article: Article = {
      metadata: frontMatter,
      slug: depth === 1 && file === 'index.md' ? '@' : path.basename(filePath, '.md'),
    };
    const articlePath = '/' + filePath.replace(/\\/g,'/').split('/').slice(3).join('/');
    paths[article.slug === '@' ? '@' : articlePath.replace('.md', '')] = articlePath + (isDir?'/index.md' :'')
    if (isDir) {
      const built = buildArticle(paths, [], filePath, depth+1);
      paths = Object.assign(paths, built.paths);
      if (built.articles.length > 0) article.articles = built.articles;
    }
    articles.push(article);
  }

  return { paths, articles };
}

processMarkdownFiles().catch(console.error);
