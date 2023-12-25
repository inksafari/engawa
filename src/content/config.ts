/* https://docs.astro.build/en/guides/content-collections */
import { defineCollection, z as zod } from 'astro:content'
import uniqolor from 'uniqolor'

function removeDupsAndLowerCase(array: string[]) {
  if (array.length === 0) return array
  const distinctItems = new Set(array)
  return [...distinctItems]
}

function getDefaultColor() {
  return uniqolor.random({ saturation: 90, lightness: [70, 90] }).color
}

const MAX_FILE_SIZE = 1024 * 1024 * 5
const ACCEPTED_IMAGE_MIME_TYPES = new Set([
  'image/avif',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
])
const ACCEPTED_IMAGE_TYPES = ['avif', 'jpeg', 'jpg', 'png', 'webp']

const page_schema = {
  title: zod.string().max(60),
  excerpt: zod.string().max(250).optional(),
  isIndex: zod.boolean().default(false).optional(),
  isDraft: zod.boolean().default(false).optional(),
}

const blogCollection = defineCollection({
  schema: ({ image }) =>
    zod.object({
      themeColor: zod
        .string()
        .min(4)
        .max(9)
        .regex(/^#/)
        .default(getDefaultColor),
      tags: zod
        .array(zod.string())
        .default(['unsorted'])
        .transform(removeDupsAndLowerCase)
        .optional(),
      image: image()
        // .refine((files) => files?.length == 1, 'Image is required.')
        // .refine((img) => img.width >= 1200 && img.height >= 630, {
        // message: 'OpenGraph image must be at least 1200 X 630 pixels!'
        // })
        .refine((files) => {
          return files?.[0]?.size <= MAX_FILE_SIZE
        }, `Max image size is 5MB.`)
        .refine(
          (files) => ACCEPTED_IMAGE_MIME_TYPES.has(files?.[0]?.type),
          'Only .avif, .jpg, .jpeg, .png and .webp formats are supported.',
        )
        .or(zod.string())
        .optional(),
      image_alt: zod.string().optional(),
      image_caption: zod.string().optional(),
      image_source: zod.string().optional(),
      ...page_schema,
      publishDate: zod.coerce.date(),
      updatedDate: zod.coerce.date().optional(),
      prev: zod.string().max(250).optional(),
      next: zod.string().max(250).optional(),
    }),
})

export const collections = {
  page: defineCollection({ schema: zod.object(page_schema) }),
  then: blogCollection,
}
// @source:
// https://github.com/withastro/astro/blob/main/examples/blog/src/content/config.ts
// https://github.com/tonydangblog/blog/blob/main/apps/frontend/src/content/config.ts
// https://github.com/goulvenclech/goulven-clech.dev/blob/master/src/content/config.ts
// https://github.com/alexnguyennz/alexnguyen.co.nz/blob/main/src/content/config.ts
