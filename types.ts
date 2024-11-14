export interface Article {
  metadata: { [key: string]: any };
  slug: string;
  articles?: Article[];
}

export type Articles = {
  [key: string]: {
    paths: {
      [key: string]: string;
    };
    articles: Article[];
  };
};

export type AvailableLanguages = string[];
