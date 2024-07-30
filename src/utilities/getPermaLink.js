import path from 'node:path/posix' // import urlJoin from 'url-join'
import slug from 'limax' // or `transliteration`
import siteInfo from '../consts.ts'

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

function fullLink(path, base = siteInfo.siteBase) {
  return new URL(path, base).href
}

function getURLFromEntry(slug, collection) {
  switch (collection) {
    case 'pages': {
      // const result = urlJoin(siteInfo.siteBase, collection, slug)
      // const result = new URL(path.join(collection, slug), siteInfo.siteBase)
      const result = new URL(slug, siteInfo.siteBase)

      return result
    }

    case 'posts': {
      // const result = urlJoin(siteInfo.siteBase, 'post', slug)
      // const result = new URL(slug, siteInfo.siteBase)
      const result = new URL(path.join('blog', slug), siteInfo.siteBase)

      return result
    }

    case 'status': {
      // const result = urlJoin(siteInfo.siteBase, 'status', slug)
      // const result = new URL(path.join('status', slug), siteInfo.siteBase)
      const result = new URL(slug, siteInfo.siteBase)

      return result
    }

    default: {
      return 'ERROR!'
    }
  }
}

function removeTrailingSlash(pathname) {
  const matchTrailingSlash = /\w+\/$/
  if (matchTrailingSlash.test(pathname)) {
    return pathname.slice(0, -1)
  }
  return pathname
}

export {
  slugifier,
  getCleanSlug,
  fullLink,
  getURLFromEntry,
  removeTrailingSlash,
}
// @source:
// https://github.com/hendriknielaender/double-trouble/blob/main/src/utils/permalinks.js
// https://github.com/gotofritz/gotofritz.github.io/blob/main/src/utils/slugRewrite.ts
