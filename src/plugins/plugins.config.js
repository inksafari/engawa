import { remarkPlugins } from './markdown/remark.js'
import { rehypePlugins } from './markdown/rehype.js'

const markdownOptions = {
  syntaxHighlight: false,
  // shikiConfig: {
  // theme: 'css-variables',
  // wrap: true,
  // },
  remarkPlugins,
  rehypePlugins,
}

/* https://github.com/astro-community/AstroCompress */
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
