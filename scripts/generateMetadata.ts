import { glob } from 'glob';
import matter from 'gray-matter';
import { readFileSync, writeFileSync } from 'fs';
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
  const files = await glob('../articles/**/*.md');
  const languages = await glob('../articles/*', { nodir: false });
  const availableLanguages = languages.map((l) => path.basename(l));

  const articlesByLanguage: Articles = {};

  for (const lang of availableLanguages) {
    const langFiles = files.filter((f) => f.startsWith(`../articles/${lang}/`));
    const paths: Record<string, string> = {};

    // Build paths map
    for (const file of langFiles) {
      const relativePath = file.split(`../articles/${lang}/`)[1];
      const parts = relativePath.split('/');
      const isIndex = path.basename(file) === 'index.md';

      let urlPath: string;
      if (parts.length === 1 && isIndex) {
        urlPath = '@';
      } else if (isIndex) {
        urlPath = '/' + parts.slice(0, -1).join('/');
      } else {
        urlPath =
          '/' +
          parts
            .slice(0, -1)
            .concat(path.basename(parts[parts.length - 1], '.md'))
            .join('/');
      }

      paths[urlPath] = '/' + relativePath;
    }

    articlesByLanguage[lang] = {
      paths,
      articles: buildArticleTree(langFiles, lang),
    };
  }

  const output = `export const availableLanguages = ${JSON.stringify(availableLanguages, null, 2)};
export const articles = ${JSON.stringify(articlesByLanguage, null, 2)};`;

  writeFileSync('../articles.ts', output);
}

function buildArticleTree(files: string[], language: string): Article[] {
  const articles: Article[] = [];
  const metadataMap = new Map<string, Record<string, unknown>>();

  // First pass: collect all metadata
  for (const file of files) {
    const content = readFileSync(file, 'utf-8');
    const { data: frontMatter } = matter(content);
    const parts = file.split('/').slice(file.split('/').indexOf(language) + 1);
    const isIndex = path.basename(file) === 'index.md';

    let slug: string;
    if (parts.length === 1 && isIndex) {
      slug = '@';
    } else if (isIndex) {
      slug = parts[parts.length - 2];
    } else {
      slug = path.basename(file, '.md');
    }

    metadataMap.set(slug, frontMatter);
  }

  // Second pass: build tree
  for (const file of files) {
    const parts = file.split('/').slice(file.split('/').indexOf(language) + 1);
    const isIndex = path.basename(file) === 'index.md';

    let slug: string;
    let parentPath: string;

    if (parts.length === 1 && isIndex) {
      slug = '@';
      parentPath = '';
    } else if (isIndex) {
      slug = parts[parts.length - 2];
      parentPath = parts.slice(0, -2).join('/');
    } else {
      slug = path.basename(file, '.md');
      parentPath = parts.slice(0, -1).join('/');
    }

    const article: Article = {
      metadata: metadataMap.get(slug) || {},
      slug,
    };

    if (!parentPath) {
      articles.push(article);
    } else {
      let parentParts = parentPath.split('/');
      let parent = articles.find((a) => a.slug === parentParts[0]);

      if (!parent) {
        parent = {
          metadata: metadataMap.get(parentParts[0]) || {},
          slug: parentParts[0],
          articles: [],
        };
        articles.push(parent);
      }

      let current = parent;
      for (let i = 1; i < parentParts.length; i++) {
        if (!current.articles) current.articles = [];
        let next = current.articles.find((a) => a.slug === parentParts[i]);
        if (!next) {
          next = {
            metadata: metadataMap.get(parentParts[i]) || {},
            slug: parentParts[i],
            articles: [],
          };
          current.articles.push(next);
        }
        current = next;
      }

      if (!current.articles) current.articles = [];
      const existingArticle = current.articles.find((a) => a.slug === slug);
      if (!existingArticle) {
        current.articles.push(article);
      }
    }
  }

  return articles;
}

processMarkdownFiles().catch(console.error);
