import { z as zod } from 'astro:content'
import uniqolor from 'uniqolor'
import siteInfo from './consts'
import { fullLink } from './utilities/getPermaLink.js'

function getDefaultColor() {
  return uniqolor.random({ saturation: 90, lightness: [70, 90] }).color
}

function removeDupsAndLowerCase(array) {
  if (array.length === 0) {
    return array
  }
  const distinctItems = new Set(array)
  return [...distinctItems]
}

const title = zod.string().max(60)
const prevTitle = zod.string().max(60).optional()
const nextTitle = zod.string().max(60).optional()
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
// TODO: slug和name分開
// https://github.com/wry-red/site/blob/main/src/utils/usePosts.ts
const tags = zod
  .array(zod.string())
  .min(1)
  .max(10)
  .default(['unsorted'])
  .transform(removeDupsAndLowerCase)
  .optional()

// https://zenn.dev/yukiyada/articles/d5681300a7fc28
const blogCategory = zod.union([
  zod.literal('tech'),
  zod.literal('life'),
  zod.literal('other'),
])

/* https://github.com/deminearchiver/website/blob/main/app/src/schemas/utils.ts */
// 沒有用到，暫時保留
const imageObjectSchema = ({ image }) =>
  zod.object({
    src: image(),
    alt: zod.string().default(''),
    credit: zod.string(),
  })

const imageSchema = (context) => {
  const { image } = context
  return imageObjectSchema(context)
}

// ts:
// export type Post = import('astro:content').CollectionEntry<'posts'>
// export type Page = import('astro').Page<Post>
const pageSchema = zod.object({
  title,
  isIndex,
})

const postSchema = (context) => {
  return zod.object({
    banner: imageSchema(context).optional(),
    title,
    abstract,
    isIndex,
    isDraft,
    publishDate,
    updatedDate,
    themeColor,
    tags,
    // category: blogCategory,
    prev: sameSiteUrl,
    prevTitle,
    next: sameSiteUrl,
    nextTitle,
    bibliography,
  })
}

const metaSchema = zod.object({
  title,
  abstract,
  isIndex,
  publishDate: zod.coerce.date().optional(),
  updatedDate: zod.coerce.date().optional(),
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
