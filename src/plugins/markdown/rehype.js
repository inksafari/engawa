import rehypeAutolinkHeadings from 'rehype-autolink-headings'
// import rehypeCitation from 'rehype-citation'
import rehypeColorChips from 'rehype-color-chips'
// import rehypeComponents from 'rehype-components'
import rehypeKatex from 'rehype-katex'
// import rehypePrettyCode from 'rehype-pretty-code'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import {
  rehypeAutolinkHeadingsOptions,
  // rehypeCitationOptions,
  // rehypePrettyCodeOptions,
} from './rehype.options.js'

export const rehypePlugins = [
  rehypeRaw,
  rehypeSlug,
  [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
  // [rehypeCitation, rehypeCitationOptions],
  [rehypeKatex, { output: 'mathml' }],
  rehypeColorChips,
  // rehypeComponents
  // FIXME: 沒辦法正常顯示
  // [rehypePrettyCode, rehypePrettyCodeOptions],
]
