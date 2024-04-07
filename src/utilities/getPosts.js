import { getCollection } from 'astro:content'

const orderByDateDesc = (previousPost, post) =>
  post.data.publishDate.valueOf() - previousPost.data.publishDate.valueOf()

/* Usage:
 * import { fetchPosts } from '~/utilities/getPosts';
 * const allPosts = fetchPosts({ collection: 'then' })
 */
async function fetchPosts({ collection }) {
  const now = new Date(Date.now())

  return await getCollection(collection).then((entries) =>
    entries
      .filter((entry) =>
        import.meta.env.MODE === 'production'
          ? entry.data.isDraft !== true
          : true,
      )
      .filter((entry) => new Date(entry.data.publishDate) < now)
      .toSorted(orderByDateDesc),
  )
}

async function fetchPublicPosts({ collection }) {
  const now = new Date(Date.now())

  return await getCollection(collection).then((entries) =>
    entries
      .filter((entry) => entry.data.isDraft !== true)
      .filter((entry) => entry.data.isIndex !== false)
      .filter((entry) => new Date(entry.data.publishDate) < now)
      .toSorted(orderByDateDesc),
  )
}

export { fetchPosts, fetchPublicPosts, orderByDateDesc }
