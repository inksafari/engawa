import { atom } from 'xast-util-feed'
import { toXml } from 'xast-util-to-xml'
import { compileHTMLForRSS } from '~/utilities/generateRSSFeed'
import { fetchPosts } from '~/utilities/getPosts'
import { getCleanSlug, getURLFromEntry } from '~/utilities/getPermaLink'
import siteInfo, { feedUrls } from '~/consts'

export const prerender = true

const author = {
  name: siteInfo.author.networks.twitter.id,
  url: siteInfo.siteBase,
}

const channel = {
  title: siteInfo.title,
  description: siteInfo.description,
  url: siteInfo.siteBase,
  feedUrl: feedUrls.atom,
  lang: siteInfo.langFeed,
  author,
}

async function compilePostsForRSS(posts) {
  return posts.flatMap((post) => ({
    title: post.data.title,
    url: getURLFromEntry(post.slug, 'then'),
    // 程式自動轉換為 ISO-8601 時間格式
    published: post.data.publishDate,
    // modified: post.data.updatedDate,
    descriptionHtml: compileHTMLForRSS(post),
  }))
}

const allPosts = await fetchPosts({ collection: 'then' })
const posts = allPosts.map(getCleanSlug)
const items = await compilePostsForRSS(posts)
const TTL = 86_400

// TODO: 1.test 2.在newsreader app(Thunderbird/Den)瀏覽效果
// 在 NetNewsWire v6.1.4 和 Reeder v4.2.8 瀏覽，文字可以完整讀取，套件效果未測
// https://github.com/kubosho/blog.kubosho.com/tree/master/src/feed
// https://github.com/alex-grover/alexgrover.me/blob/main/tests/rss.test.ts
export async function GET() {
  return new Response(toXml(atom(channel, items)), {
    status: 200,
    headers: {
      'Cache-Control': `s-maxage=${TTL}, stale-while-revalidate`,
      'Content-Type': 'application/atom+xml; charset=UTF-8', // 'text/xml; charset=UTF-8'
    },
  })
}
