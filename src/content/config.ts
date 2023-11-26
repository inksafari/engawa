import { z, defineCollection } from 'astro:content';

const page_schema = {
  title: z.string().max(60),
  excerpt: z.string().max(250).optional(),
  isIndex: z.boolean().default(false).optional(),
  isDraft: z.boolean().default(false).optional(),
};

const post_schema = {
  ...page_schema,
  //image: z.string().optional(),
  //image_alt: z.string().optional(),
  //image_caption: z.string().optional(),
  publishDate: z
    .string()
    .or(z.date())
    .transform((val) => {
      const date = new Date(val);
      return date.toISOString();
    }),
  updatedDate: z
    .string()
    .or(z.date())
    .transform((val) => {
      const date = new Date(val);
      return date.toISOString();
    })
    .optional(),
  prev: z.string().max(250).optional(),
  next: z.string().max(250).optional(),
  //categories: z.array(z.string()).default(['uncategorized']).optional(),
};

export const collections = {
  page: defineCollection({ schema: z.object(page_schema) }),
  then: defineCollection({ schema: z.object(post_schema) }),
};
// @source:
// https://github.com/tonydangblog/blog/blob/main/apps/frontend/src/content/config.ts
// https://github.com/goulvenclech/goulven-clech.dev/blob/master/src/content/config.ts
