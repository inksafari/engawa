import { atom } from 'xast-util-feed'
import { toXml } from 'xast-util-to-xml'
import siteInfo, { feedUrls } from '../../consts.ts'
import { compileHTMLForRSS } from '../../utilities/generateRssFeed.js'
import { getCleanSlug, getURLFromEntry } from '../../utilities/getPermaLink.js'
import { fetchPosts } from '../../utilities/getPosts.js'

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

async function compilePostsForRss(posts) {
  return posts.flatMap((post) => ({
    title: post.data.title,
    url: getURLFromEntry(post.slug, 'posts'),
    // 程式自動轉換為 ISO-8601 時間格式
    published: post.data.publishDate,
    // modified: post.data.updatedDate,
    descriptionHtml: compileHTMLForRSS(post),
  }))
}

const allPosts = await fetchPosts({ collection: 'posts' })
const posts = allPosts.map(getCleanSlug)
const items = await compilePostsForRss(posts)
const TTL = 86_400

// TODO: https://validator.w3.org/feed/
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
