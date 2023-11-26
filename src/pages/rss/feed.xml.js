export const prerender = true;
import { atom } from 'xast-util-feed';
import { toXml } from 'xast-util-to-xml';
import {
  SITE_DOMAIN,
  SITE_URL,
  SITE_TITLE,
  SITE_DESCRIPTION,
  RSS_LANG,
  feedUrls,
} from '~/consts';
import { pubDate, compileHTMLForRSS } from '~/utilities/generateRSSFeed';
import { fetchPosts } from '~/utilities/getPosts';
import { getURLFromEntry } from '~/utilities/getPermaLink';

const author = {
  name: SITE_DOMAIN,
  url: SITE_URL,
};

const channel = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  feedUrl: feedUrls.atom,
  lang: RSS_LANG,
  author,
};

async function compilePostsForRSS(posts) {
  return posts.flatMap((post) => ({
    title: post.data.title,
    url: getURLFromEntry(post.slug, 'then'),
    published: pubDate(post.data.publishDate),
    //descriptionHtml: compileHTMLForRSS(post),
  }));
}
const posts = await fetchPosts({ collection: 'then' });
const items = await compilePostsForRSS(posts);
const TTL = 86400;

const headersData = {
  status: 200,
  headers: {
    'Cache-Control': `s-maxage=${TTL}, stale-while-revalidate`,
    'Content-Type': 'text/xml; charset=UTF-8', // 'Content-Type': 'application/atom+xml',
  },
};

// TODO: 1.test 2.在newsreader app(Thunderbird/NetNewsWire/Den)瀏覽效果
// https://github.com/kubosho/blog.kubosho.com/tree/master/src/feed
// https://github.com/alex-grover/alexgrover.me/blob/main/tests/rss.test.ts
export async function GET() {
  return new Response(toXml(atom(channel, items)), headersData);
}
