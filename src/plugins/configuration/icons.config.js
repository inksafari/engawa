/* https://www.astroicon.dev/reference/configuration/ */
/* https://iconify.design/ */
export const astroIconOptions = {
  // iconDir: 'src/assets/icons',
  include: {
    'fa6-brands': ['linkedin', 'square-github'],
    'fa6-solid': ['calendar', 'clock', 'eye', 'tag'],
    lucide: ['info', 'hammer', 'sun-medium', 'moon', 'search', 'rss'],
  },
  svgoOptions: {
    plugins: [
      {
        name: 'inlineStyles',
        params: {
          onlyMatchedOnce: false,
        },
      },
    ],
  },
}
