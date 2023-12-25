// import { s } from 'hastscript'
import { unified } from 'unified'
import remarkDirective from 'remark-directive'
// FIXME: remark-expressive-code無法在articlePipeline使用
// 但是 rss reader 會幫忙框出程式碼區塊，不再考慮用其他工具取代
// import remarkExpressiveCode from 'remark-expressive-code'
import remarkMath from 'remark-math'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
// import rehypeAutolinkHeadings from 'rehype-autolink-headings'
// import rehypeExternalLinks from 'rehype-external-links'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
// import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import sanitizeHtml from 'sanitize-html'
import { getURLFromEntry } from '~/utilities/getPermaLink'
// import {
// SITE_URL,
// siteOwner,
// } from '~/consts'

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
  //   If you want to respond you can <a href="${SITE_URL}/contact">write me an Email</a>
  //   or reach out on <a href="https://twitter.com/{siteOwner.twitterHandle}">Twitter</a>.
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

export { compileHTMLForRSS }
