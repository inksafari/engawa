// import path from 'node:path'
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerNotationFocus,
  transformerNotationErrorLevel,
  // transformerRenderWhitespace,
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerCompactLineOptions,
  // transformerRemoveLineBreak,
} from '@shikijs/transformers' // 'shikiji-transformers'

// https://github.com/riceball-tw/astro-blog/blob/main/astro.config.mjs
// https://github.com/danillouz/mysite/blob/main/src/plugins/autolink-headings.mjs
const rehypeAutolinkHeadingsOptions = {
  behavior: 'prepend',
  properties: { class: 'heading-permalink', ariaHidden: true, tabIndex: -1 },
  content: {
    type: 'text',
    value: '// ',
  },
}

// https://github.com/timlrx/rehype-citation?tab=readme-ov-file#api
const rehypeCitationOptions = {
  // FIXME: path無法讀取
  // path: path.join(process.cwd(), 'data'),
  // FIXME: markdown front-matter只能讀取部分bib
  bibliography: [
    'https://raw.githubusercontent.com/timlrx/rehype-citation/main/test/references-data.bib',
    'https://raw.githubusercontent.com/timlrx/rehype-citation/main/test/CITATION.cff',
    'https://raw.githubusercontent.com/jgm/pandoc/main/CITATION.cff',
    'https://raw.githubusercontent.com/quarto-dev/quarto-cli/main/CITATION.cff',
    'https://raw.githubusercontent.com/citation-js/citation-js/main/CITATION.cff',
    'https://raw.githubusercontent.com/rstudio/rmarkdown/main/CITATION.cff',
    'https://raw.githubusercontent.com/timlrx/rehype-citation/main/CITATION.cff',
  ],
}

// https://rehype-pretty-code.netlify.app/
// https://shiki.style/packages/transformers
const rehypePrettyCodeOptions = {
  theme: {
    dark: 'github-dark-dimmed',
    light: 'github-light',
  },
  onVisitHighlightedLine(element) {
    element.properties.className?.push('line')
  },
  transformers: [
    transformerNotationDiff(),
    transformerNotationHighlight(),
    transformerNotationWordHighlight(),
    transformerNotationFocus(),
    transformerNotationErrorLevel(),
    // transformerRenderWhitespace(),
    transformerMetaHighlight(),
    transformerMetaWordHighlight(),
    transformerCompactLineOptions(),
    // transformerRemoveLineBreak(),
  ],
}

export {
  rehypeAutolinkHeadingsOptions,
  rehypeCitationOptions,
  rehypePrettyCodeOptions,
}
