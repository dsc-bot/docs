> [!IMPORTANT]
> We are not accepting changes to this repo at the moment! We are working to add workflows to make things easier.

# dsc.bot Documentation

This repository is used for managing and translating dsc.bot's documentation.

## Translating/Contributing

Simply clone the repo, make the changes to a language and submit a pull request.

### Formatting/Syntax

We use [Markdoc](https://markdoc.dev/docs/syntax)!

## Adding a language

Translating a new language for the dsc.bot documentation is simple.

1. Clone the repository.
2. Open the `articles` folder.
3. Copy the base language (defined as `fallbackLanguage` in `index.ts`).
4. Name the new folder using the [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag) (e.g., for Spanish (Spain), use `es-ES`).
5. Add your language to the `availableLanguages` array in `index.ts`.
6. Make a pull request with your changes.
