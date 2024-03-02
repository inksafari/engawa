import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCitation from 'rehype-citation'
import rehypeColorChips from 'rehype-color-chips'
import rehypeKatex from 'rehype-katex'
// import rehypePrettyCode from 'rehype-pretty-code'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import {
  rehypeAutolinkHeadingsOptions,
  rehypeCitationOptions,
  // rehypePrettyCodeOptions,
} from '~/plugins/markdown/rehype.options'

export const rehypePlugins = [
  rehypeRaw,
  rehypeSlug,
  [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
  [rehypeCitation, rehypeCitationOptions],
  [rehypeKatex, { output: 'mathml' }],
  rehypeColorChips,
  // FIXME: 沒辦法正常顯示
  // [rehypePrettyCode, rehypePrettyCodeOptions],
]
