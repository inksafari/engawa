import { remarkPlugins } from '../markdown/remark.js'
import { rehypePlugins } from '../markdown/rehype.js'
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

export const markdownOptions = {
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
