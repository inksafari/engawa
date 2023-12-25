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

// Or `url-join`
function getURLFromEntry(slug, collection) {
  switch (collection) {
    case 'page': {
      return new URL(slug, SITE_URL)
    } // `${SITE_URL}/${slug}`;

    case 'then': {
      return new URL(slug, SITE_URL)
    } // `${SITE_URL}/${slug}`;

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
