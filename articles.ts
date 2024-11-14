const availableLanguages = [
  "en-US"
];

const articles = [
  {
    "language": "en-US",
    "articles": [
      {
        "metadata": {
          "title": "Hello World"
        },
        "slug": "@"
      },
      {
        "slug": "something",
        "articles": [
          {
            "metadata": {
              "title": "Hello World"
            },
            "slug": "something"
          },
          {
            "metadata": {
              "title": "Hello World"
            },
            "slug": "subarticle2",
            "articles": []
          },
          {
            "slug": "test",
            "articles": [
              {
                "metadata": {
                  "title": "Hello World"
                },
                "slug": "test"
              },
              {
                "slug": "subarticle",
                "articles": [
                  {
                    "metadata": {
                      "title": "Hello World"
                    },
                    "slug": "subarticle"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

export { availableLanguages, articles };