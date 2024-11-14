/**
 *
 *
 * DO NOT MANUALLY EDIT - THIS FILE IS PROGRAMMATICALLY GENERATED - scripts/generateMetadata.ts 
 *
 *
*/
import type { AvailableLanguages, Articles } from './types';
export const fallbackLanguage = 'en-US';
export const articles: Articles = {
  "en-US": {
    "paths": {
      "@": "/index.md",
      "/something": "/something/index.md",
      "/something/test/subarticle2": "/something/test/subarticle2.md",
      "/something/test": "/something/test/index.md",
      "/something/test/subarticle": "/something/test/subarticle/index.md"
    },
    "articles": [
      {
        "metadata": {
          "title": "Hello WorldZS"
        },
        "slug": "@"
      },
      {
        "metadata": {
          "title": "Hello World312"
        },
        "slug": "something",
        "articles": [
          {
            "metadata": {
              "title": "Hello Worldsafdgggggggggggggggggggggggg"
            },
            "slug": "test",
            "articles": [
              {
                "metadata": {
                  "title": "Hello Worlddgfs"
                },
                "slug": "subarticle2"
              },
              {
                "metadata": {
                  "title": "Hello World4356"
                },
                "slug": "subarticle"
              }
            ]
          }
        ]
      }
    ]
  }
};
export const availableLanguages: AvailableLanguages = [
  "en-US"
];
