import { getCollection } from 'astro:content'

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
      .sort(
        (previousPost, post) =>
          new Date(post.data.publishDate).valueOf() -
          new Date(previousPost.data.publishDate).valueOf(),
      ),
  )
}

export { fetchPosts }
