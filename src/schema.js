import { z as zod } from 'astro:content'
import uniqolor from 'uniqolor'
import { fullLink } from '~/utilities/getPermaLink'
import siteInfo from '~/consts'

function getDefaultColor() {
  return uniqolor.random({ saturation: 90, lightness: [70, 90] }).color
}

function removeDupsAndLowerCase(array) {
  if (array.length === 0) return array
  const distinctItems = new Set(array)
  return [...distinctItems]
}

const title = zod.string().max(60)
const abstract = zod.preprocess(
  (value) => value || siteInfo.description,
  zod.string().max(160).optional(),
)
const isIndex = zod.boolean().default(false).optional()
const isDraft = zod.boolean().default(false).optional()
const publishDate = zod.coerce.date()
const updatedDate = zod.coerce.date().optional()
const themeColor = zod
  .string()
  .min(4)
  .max(9)
  .regex(/^#/)
  .default(getDefaultColor)
// const optionalUrl = zod.preprocess(val => val && fullLink(val), zod.string().url().optional())
const sameSiteUrl = zod.preprocess(
  (value) => value && fullLink(value),
  zod.string().max(60).optional(),
)
const bibliography = zod.array(zod.string().url()).optional()
const tags = zod
  .array(zod.string())
  .default(['unsorted'])
  .transform(removeDupsAndLowerCase)
  .optional()

// ts:
// export type Post = import('astro:content').CollectionEntry<'posts'>
// export type Page = import('astro').Page<Post>
const pageSchema = zod.object({
  title,
  isIndex,
})

const postSchema = zod.object({
  title,
  abstract,
  isIndex,
  isDraft,
  publishDate,
  updatedDate,
  themeColor,
  tags,
  prev: sameSiteUrl,
  next: sameSiteUrl,
  bibliography,
})

const metaSchema = zod.object({
  title,
  abstract,
  isIndex,
  publishDate: zod.coerce.date().optional(),
  updatedDate,
  tags,
  prev: sameSiteUrl,
  next: sameSiteUrl,
})

const statusSchema = zod.object({
  title,
  abstract,
  publishDate,
})

export { postSchema, pageSchema, metaSchema, statusSchema }
