import {
  SITE_DOMAIN,
  SITE_URL,
  SITE_TITLE,
  RSS_LANG,
  feedUrls,
} from '~/consts';
import { pubDate, compileHTMLForRSS } from '~/utilities/generateRSSFeed';
import { fetchPosts } from '~/utilities/getPosts';
import { getURLFromEntry } from '~/utilities/getPermaLink';

export const prerender = true;

const author = {
  name: SITE_DOMAIN,
  url: SITE_URL,
};
async function compilePostsForRSS(posts) {
  return posts.flatMap((post) => ({
    title: post.data.title,
    date_published: pubDate(post.data.publishDate),
    url: getURLFromEntry(post.slug, 'then'),
    id: getURLFromEntry(post.slug, 'then'),
    // content_html: compileHTMLForRSS(post),
  }));
}

const posts = await fetchPosts({ collection: 'then' });
const items = await compilePostsForRSS(posts);
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
};

const headersData = {
  status: 200,
  headers: {
    'Content-Type': 'application/json',
  },
};

// TODO: 1.test 2.在newsreader app(Thunderbird/NetNewsWire/Den)瀏覽效果
export async function GET() {
  return new Response(JSON.stringify(feed, null, 2), headersData);
}
