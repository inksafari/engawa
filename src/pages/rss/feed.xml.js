import { atom } from 'xast-util-feed'
import { toXml } from 'xast-util-to-xml'
import {
  SITE_DOMAIN,
  SITE_URL,
  SITE_TITLE,
  SITE_DESCRIPTION,
  RSS_LANG,
  feedUrls,
} from '~/consts'
import { compileHTMLForRSS } from '~/utilities/generateRSSFeed'
import { fetchPosts } from '~/utilities/getPosts'
import { getCleanSlug, getURLFromEntry } from '~/utilities/getPermaLink'

export const prerender = true

const author = {
  name: SITE_DOMAIN,
  url: SITE_URL,
}

const channel = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  feedUrl: feedUrls.atom,
  lang: RSS_LANG,
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
