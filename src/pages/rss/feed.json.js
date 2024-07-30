import spacetime from 'spacetime'
import siteInfo, { feedUrls } from '../../consts.ts'
import { formatRFC3339 } from '../../utilities/date.utils.js'
import {
  compileHTMLForRSS,
  // getPostDescription
} from '../../utilities/generateRssFeed.js'
import { getCleanSlug, getURLFromEntry } from '../../utilities/getPermaLink.js'
import { fetchPosts } from '../../utilities/getPosts.js'

export const prerender = true

// new Date().getFullYear()
const nowDate = spacetime.now().goto(siteInfo.tz).goto(null).year()
const copyrightYearFrom = Number(siteInfo.copyrightYear)
  ? siteInfo.copyrightYear
  : nowDate

const author = {
  name: siteInfo.author.networks.twitter.id,
  url: siteInfo.siteBase,
}
async function compilePostsForRss(posts) {
  const postDetails = posts.flatMap((post) => ({
    title: post.data.title,
    date_published: formatRFC3339(post.data.publishDate),
    // date_modified: formatRFC3339(post.data.updatedDate),
    // summary: getPostDescription(post),
    url: getURLFromEntry(post.slug, 'posts'),
    id: getURLFromEntry(post.slug, 'posts'),
    content_html: compileHTMLForRSS(post),
  }))
  return postDetails
}

const allPosts = await fetchPosts({ collection: 'posts' })
const posts = allPosts.map(getCleanSlug)
const items = await compilePostsForRss(posts)
// const TTL = 86_400
const feed = {
  version: 'https://jsonfeed.org/version/1.1',
  title: siteInfo.title,
  // icon: '/android-chrome-512x512.png',
  // favicon: '/apple-touch-icon.png',
  description: siteInfo.description,
  home_page_url: siteInfo.siteBase,
  feed_url: `${feedUrls.json}`,
  authors: [author],
  language: siteInfo.langFeed,
  copyright: `© ${copyrightYearFrom}-present, ${siteInfo.domain}`,
  items,
}

// TODO: 1.astro/container 2.在newsreader app(Thunderbird/NetNewsWire/Den)瀏覽效果
export async function GET() {
  return new Response(JSON.stringify(feed, null, 2), {
    status: 200,
    headers: {
      // 'Cache-Control': `s-maxage=${TTL}, stale-while-revalidate`,
      'Content-Type': 'application/feed+json; charset=UTF-8',
    },
  })
}
