import { TranslationKey } from '@/types/translations';

export interface Article {
  labelKey: TranslationKey;
  slug: string;
  articles?: Article[];
}
