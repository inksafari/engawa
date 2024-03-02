// import path from 'node:path'
// import urlJoin from 'url-join'
import slug from 'limax' // or `transliteration`
import { SITE_URL } from '~/consts'

const slugifier = (string_) => slug(string_, { tone: false })

function getCleanSlug(post) {
  // content/[collection]/2009-11-04_example.mdx
  const rawSlug = post.slug.replace(/^\d{4}-\d{2}-\d{2}_/, '')
  const niceSlug = slugifier(rawSlug)

  return {
    ...post,
    slug: niceSlug,
  }
}

function getURLFromEntry(slug, collection) {
  switch (collection) {
    case 'page': {
      // const result = urlJoin(SITE_URL, collection, slug)
      // const result = new URL(path.join(collection, slug), SITE_URL)
      const result = new URL(slug, SITE_URL)

      return result
    }

    case 'then': {
      // const result = urlJoin(SITE_URL, 'post', slug)
      // const result = new URL(path.join('post', slug), SITE_URL)
      const result = new URL(slug, SITE_URL)

      return result
    }

    default: {
      return 'ERROR!'
    }
  }
}

function removeTrailingSlash(pathname) {
  const matchTrailingSlash = /\w+\/$/
  if (matchTrailingSlash.test(pathname)) return pathname.slice(0, -1)
  return pathname
}

export { slugifier, getCleanSlug, getURLFromEntry, removeTrailingSlash }
// @source:
// https://github.com/hendriknielaender/double-trouble/blob/main/src/utils/permalinks.js
// https://github.com/gotofritz/gotofritz.github.io/blob/main/src/utils/slugRewrite.ts
