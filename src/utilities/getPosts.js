import { getCollection } from 'astro:content';

/* usage:
 * import { fetchPosts } from '~/utilities/getPosts';
 * const allPosts = fetchPosts({ collection: 'then' })
 */
async function fetchPosts({ collection }) {
  const now = new Date(Date.now());

  return await getCollection(collection).then((entries) =>
    entries
      .filter((entry) =>
        import.meta.env.MODE !== 'production'
          ? true
          : entry.data.isDraft !== true,
      )
      .filter((entry) => new Date(entry.data.publishDate) < now)
      .sort(
        (prevPost, post) =>
          new Date(post.data.publishDate).valueOf() -
          new Date(prevPost.data.publishDate).valueOf(),
      ),
  );
}

export { fetchPosts };
