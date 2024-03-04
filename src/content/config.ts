/* https://docs.astro.build/en/guides/content-collections */
import { defineCollection } from 'astro:content'
import { postSchema, pageSchema, statusSchema } from '~/schema'

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
  then: postCollection,
  status: statusCollection,
}
