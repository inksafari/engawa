import { unified } from 'unified'
import remarkDirective from 'remark-directive'
import remarkMath from 'remark-math'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import sanitizeHtml from 'sanitize-html'
// import { formatPlainDate, formatISOString } from '../utilities/date.utils.js'
import { getURLFromEntry } from '../utilities/getPermaLink.js'
// import siteInfo from '../consts.ts'

// 在 NetNewsWire v6.1.4 和 Reeder v4.2.8 瀏覽，文字可以完整讀取，套件效果未測
// https://www.w3.org/TR/xhtml1/dtds.html#a_dtd_Latin-1_characters
// https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references
function articlePipeline(input) {
  const processor = unified()
    .use(remarkParse)
    // remark plugins
    .use(remarkDirective)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    // rehype plugins
    .use(rehypeKatex, { output: 'mathml' })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .freeze()

  const output = processor.processSync(String(input))
  const result = sanitizeHtml(output.value)
  // const content = result.replace(/\n/g, '')

  return result
}

function compileHTMLForRSS(post) {
  const postUrl = getURLFromEntry(post.slug, 'then')
  const primaryHTML = articlePipeline(post.body)

  // <p>
  //   Thanks for reading this post in your RSS reader! <br />
  //   If you want to respond you can <a href="${siteInfo.siteBase}/contact">write me an Email</a>
  //   or reach out on <a href={siteInfo.author.networks.twitter.link}>Twitter</a>.
  //  </p>
  const additionalHTML = `
    <hr />
    <p>
      <a href="${postUrl}">
        Read the full post on the site
      </a>
    </p>
  `
  return sanitizeHtml(primaryHTML + additionalHTML)
}

/* https://github.com/moeyua/astro-theme-typography/blob/main/src/utils/index.ts */
function getPostDescription(post) {
  if (post.data.abstract) {
    return post.data.abstract
  }

  const html = articlePipeline(post.body)
  const allowedTags = [...sanitizeHtml.defaults.allowedTags, 'img']
  const sanitized = sanitizeHtml(html, { allowedTags })
  return sanitized.slice(0, 160)
}

export { articlePipeline, compileHTMLForRSS, getPostDescription }
