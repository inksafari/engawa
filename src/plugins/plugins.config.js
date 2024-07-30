import { rehypePlugins } from './markdown/rehype.js'
// import {
// transformerNotationDiff,
// transformerNotationHighlight,
// transformerNotationWordHighlight,
// transformerNotationFocus,
// transformerNotationErrorLevel,
// transformerRenderWhitespace,
// transformerMetaHighlight,
// transformerMetaWordHighlight,
// transformerCompactLineOptions,
// transformerRemoveLineBreak,
// } from '@shikijs/transformers'
import { remarkPlugins } from './markdown/remark.js'

/* https://www.astroicon.dev/reference/configuration/ */
/* https://iconify.design/ */
const astroIconOptions = {
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

const markdownOptions = {
  syntaxHighlight: false, // 'shiki',
  shikiConfig: {
    // theme: 'css-variables',
    themes: {
      light: 'github-light',
      dark: 'one-dark-pro',
    },
    wrap: true,
    // transformers: [
    // transformerNotationDiff(),
    // transformerNotationHighlight(),
    // transformerNotationWordHighlight(),
    // transformerNotationFocus(),
    // transformerNotationErrorLevel(),
    // transformerRenderWhitespace(),
    // transformerMetaHighlight(),
    // transformerMetaWordHighlight(),
    // transformerCompactLineOptions(),
    // transformerRemoveLineBreak(),
    // ],
  },
  remarkPlugins,
  rehypePlugins,
}

/* https://github.com/Playform/Compress */
const astroCompressOptions = {
  // Logger: 0,
  // CSS: { comments: true },
  CSS: false,
  HTML: {
    'html-minifier-terser': {
      decodeEntities: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      sortAttributes: false,
      sortClassName: false,
    },
  },
  Image: false,
  JavaScript: false,
  SVG: false,
}

export { astroCompressOptions, astroIconOptions, markdownOptions }
