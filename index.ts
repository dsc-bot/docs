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
    labelKey: 'docs.intro',
    slug: '@index',
  },

  {
    labelKey: 'docs.test',
    slug: 'test',
  },
];

export { fallbackLanguage, availableLanguages, articles };
