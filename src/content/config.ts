/* https://docs.astro.build/en/guides/content-collections */
import { defineCollection } from 'astro:content'
import { pageSchema, postSchema, statusSchema } from '~/schema'

const pageCollection = defineCollection({
  type: 'content',
  schema: pageSchema,
})

const postCollection = defineCollection({
  type: 'content',
  schema: postSchema,
})

const statusCollection = defineCollection({
  type: 'content',
  schema: statusSchema,
})

export const collections = {
  page: pageCollection,
  blog: postCollection,
  status: statusCollection,
}
