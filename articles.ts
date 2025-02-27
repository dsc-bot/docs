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
      "/bots": "/bots/index.md",
      "/bots/banner": "/bots/banner.md",
      "/bots/overview": "/bots/overview.md",
      "/bots/permissions": "/bots/permissions.md",
      "@": "/index.md",
      "/legal": "/legal/index.md",
      "/legal/privacy-policy": "/legal/privacy-policy.md"
    },
    "articles": [
      {
        "metadata": {
          "title": "Introduction",
          "order": 0
        },
        "slug": "@"
      },
      {
        "metadata": {
          "title": "Bot Listing",
          "order": 1
        },
        "slug": "bots",
        "articles": [
          {
            "metadata": {
              "title": "Overview",
              "order": 1
            },
            "slug": "overview"
          },
          {
            "metadata": {
              "title": "Permissions",
              "order": 1
            },
            "slug": "permissions"
          },
          {
            "metadata": {
              "title": "Banner",
              "order": 2
            },
            "slug": "banner"
          }
        ]
      },
      {
        "metadata": {
          "title": "Legal",
          "order": 999
        },
        "slug": "legal",
        "articles": [
          {
            "metadata": {
              "title": "Privacy Policy",
              "order": 1
            },
            "slug": "privacy-policy"
          }
        ]
      }
    ]
  }
};
export const availableLanguages: AvailableLanguages = [
  "en-US"
];
