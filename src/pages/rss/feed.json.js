import { SITE_DOMAIN, SITE_URL, SITE_TITLE, RSS_LANG, feedUrls } from '~/consts'
import { compileHTMLForRSS } from '~/utilities/generateRSSFeed'
import { formatRFC3339 } from '~/utilities/date.utils'
import { fetchPosts } from '~/utilities/getPosts'
import { getCleanSlug, getURLFromEntry } from '~/utilities/getPermaLink'

export const prerender = true

const author = {
  name: SITE_DOMAIN,
  url: SITE_URL,
}
async function compilePostsForRSS(posts) {
  const postDetails = posts.flatMap((post) => ({
    title: post.data.title,
    date_published: formatRFC3339(post.data.publishDate),
    url: getURLFromEntry(post.slug, 'then'),
    id: getURLFromEntry(post.slug, 'then'),
    content_html: compileHTMLForRSS(post),
  }))
  return postDetails
}

const allPosts = await fetchPosts({ collection: 'then' })
const posts = allPosts.map(getCleanSlug)
const items = await compilePostsForRSS(posts)
// const TTL = 86_400
const feed = {
  version: 'https://jsonfeed.org/version/1.1',
  title: SITE_TITLE,
  // icon: '/android-chrome-512x512.png',
  // favicon: '/apple-touch-icon.png',
  home_page_url: SITE_URL,
  feed_url: `${feedUrls.json}`,
  authors: [author],
  language: RSS_LANG,
  copyright: `© ${new Date().getFullYear()}-present, ${SITE_DOMAIN}`,
  items,
}

// TODO: 1.test 2.在newsreader app(Thunderbird/NetNewsWire/Den)瀏覽效果
export async function GET() {
  return new Response(JSON.stringify(feed, null, 2), {
    status: 200,
    headers: {
      // 'Cache-Control': `s-maxage=${TTL}, stale-while-revalidate`,
      'Content-Type': 'application/feed+json; charset=UTF-8',
    },
  })
}
