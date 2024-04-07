// 刻完程式碼，才發現 xast-util-sitemap pkg，強烈建議使用 xast-util-sitemap
// https://github.com/syntax-tree/xast-util-sitemap
import { u } from 'unist-builder'
import { x } from 'xastscript'
import { toXml } from 'xast-util-to-xml'
import siteInfo from '../consts.ts'
import { fetchPublicPosts } from '../utilities/getPosts.js'
import { getCleanSlug, getURLFromEntry } from '../utilities/getPermaLink.js'
import { formatPlainDate, formatISOString } from '../utilities/date.utils.js'

export const prerender = true

const channel = {
  url: siteInfo.siteBase,
  changefreq: 'yearly',
  priority: '0.80',
}

async function compilePostsForSitemap(posts) {
  return posts.flatMap((post) => ({
    url: getURLFromEntry(post.slug, 'then'),
    // FIXME: updatedDate留空，也會自動補上現在日期，只能暫時先刪 updatedDate
    lastmod: formatISOString(post.data.publishDate),
    priority: '0.60',
  }))
}

const allPosts = await fetchPublicPosts({ collection: 'then' })
const posts = allPosts.map(getCleanSlug)
const postData = await compilePostsForSitemap(posts)

/* https://www.sitemaps.org/protocol.html */
/* https://github.com/syntax-tree/xast-util-feed/blob/main/lib/atom.js */
function sitemapBuilder(channel, data) {
  const meta = channel
  const items = []

  if (data) {
    let index = -1

    while (++index < data.length) {
      const datum = data[index]
      const children = []

      if (!datum.url && !datum.lastmod && !datum.priority) {
        throw new Error(
          'Expected either `slug` or `date` to be set in entry `' + index + '`',
        )
      }

      if (datum.url) {
        const url = new URL(datum.url).href
        children.push(x('loc', url))
      }

      if (datum.lastmod !== null && datum.lastmod !== undefined) {
        children.push(x('lastmod', datum.lastmod))
      }

      if (datum.priority)
        children.push(x('priority', Number(datum.priority).toFixed(2)))

      items.push(x('url', children))
    }
  }

  return u('root', [
    u('instruction', { name: 'xml' }, 'version="1.0" encoding="utf-8"'),
    x('urlset', { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' }, [
      // site
      x('url', [
        x('loc', String(meta.url)),
        x('lastmod', formatPlainDate(new Date())),
        x('changefreq', String(meta.changefreq)),
        x('priority', Number(meta.priority).toFixed(2)),
      ]),
      // pages
      // ...
      // blog posts
      items,
    ]),
  ])
}
// 其他方式：
// https://docs.astro.build/en/guides/integrations-guide/sitemap/
// https://jeroenvanwissen.nl/blog/generate-a-simple-sitemapxml-on-your-astrobuild-website
// https://amxmln.com/blog/2023/creating-custom-sitemaps-in-astro/

export async function GET() {
  // const posts = await fetchPublicPosts({ collection: 'then' })
  // return new Response(await generateSitemapXml({ posts }), {
  return new Response(toXml(sitemapBuilder(channel, postData)), {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=UTF-8',
    },
  })
}
