import { TranslationLangs } from '@/types/translations';
import { Article } from './types';

/**
 * The language to use when one is not available
 * @constant
 */
const fallbackLanguage: TranslationLangs = 'en-US';

/**
 * Array of available languages.
 * @constant
 */
const availableLanguages: TranslationLangs[] = ['en-US'];

/**
 * Articles that are accessible, this determines what routes will be available.
 * @constant
 */
const articles: Article[] = [
  {
    labelKey: 'Documentation',
    slug: '@',
  },

  {
    labelKey: 'Something',
    slug: 'something',
    articles: [
      {
        labelKey: 'Getting Started',
        slug: 'test',
        articles: [
          {
            labelKey: 'Installation',
            slug: 'subarticle',
          },
          {
            labelKey: 'Project Structure',
            slug: 'subarticle2',
          },
        ],
      },
    ],
  },
];

export { fallbackLanguage, availableLanguages, articles };
