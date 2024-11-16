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
      "/something/test": "/something/test/index.md",
      "/something/test/subarticle": "/something/test/subarticle/index.md",
      "/something/test/subarticle/subarticle2": "/something/test/subarticle/subarticle2.md",
      "/something/test/subarticle2": "/something/test/subarticle2.md",
      "/something/test/subarticle3": "/something/test/subarticle3.md",
      "/something/test/subarticle9": "/something/test/subarticle9/index.md"
    },
    "articles": [
      {
        "metadata": {
          "title": "Introduction",
          "order": 1
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
              "title": "Hi World"
            },
            "slug": "test",
            "articles": [
              {
                "metadata": {
                  "title": "Hello World4356"
                },
                "slug": "subarticle",
                "articles": [
                  {
                    "metadata": {
                      "title": "Hello World gg"
                    },
                    "slug": "subarticle2"
                  }
                ]
              },
              {
                "metadata": {
                  "title": "Hello Worlddgfs"
                },
                "slug": "subarticle2"
              },
              {
                "metadata": {
                  "title": "Article 3"
                },
                "slug": "subarticle3"
              },
              {
                "metadata": {
                  "title": "Article 9"
                },
                "slug": "subarticle9"
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
