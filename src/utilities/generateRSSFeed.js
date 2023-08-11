import { Feed } from "feed";
import { fetchPosts } from "~/utilities/getPosts";
import { postUrl } from "~/utilities/getPermaLink";
import { RSS_LANG } from "~/consts";

function pubDate(dateStr) {
  const date = new Date(dateStr);
  date.setUTCHours(0);
  return date;
}

export default async function generateRssFeed(options) {
  const {
    title,
    description,
    site,
    //favicon,
    //author,
    format,
  } = options;
  const posts = await fetchPosts({ collection: "then" });
  const feed = new Feed({
    title: title,
    description: description,
    id: new URL(site).href,
    link: new URL(site).href,
    language: RSS_LANG,
    updated: new Date(),
  });
  posts.forEach((post) => {
    feed.addItem({
      title: post.data.title,
      id: postUrl(post.slug),
      link: postUrl(post.slug),
      date: pubDate(post.data.publishDate.toString()),
    });
  });
  if (format === "xml") {
    return feed.rss2();
  }
  return feed.json1();
}
// @refs:
// https://github.com/yrnana/yrnana.github.io/blob/main/src/helpers/utils.ts
// https://github.com/izmttk/astro-mecure/blob/main/src/pages/rss/feed.%5Bformat%5D.ts
// https://github.com/izmttk/astro-mecure/blob/main/src/utils/generateRSSFeed.ts
// https://github.com/MykalMachon/mykal.codes/blob/main/www/src/utils/rss.ts
// https://github.com/MykalMachon/mykal.codes/blob/main/www/src/pages/feeds/%5Btype%5D.xml.ts
