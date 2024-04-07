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
import { rehypePlugins } from './markdown/rehype.js'

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
  // FIXME: sortClassName
  // https://astro-compress.nikolahristov.tech/Variable/HTML.HTML
  HTML: {
    sortAttributes: false,
    sortClassName: false,
  },
  Image: false,
  JavaScript: false,
  SVG: false,
}

export { astroCompressOptions, markdownOptions }
