// A quick script that generates a new post template for a Astro site.
import { format } from 'https://deno.land/std@0.210.0/datetime/mod.ts'
import slug from 'limax'

const slugifier = (string_) => slug(string_, { tone: false })
const postData = (title, slug) => `---
title: '${title}'
publishDate: ${format(new Date(), 'yyyy-MM-dd HH:mm')}
slug: '${slug}'
tags:
  - 雑記
isDraft: true
isIndex: false
---

`

const path = (slug) =>
  `./src/content/then/${format(new Date(), 'yyyy-MM-dd')}_${slug}.mdx`

const pageExists = async (slug) => {
  try {
    await Deno.lstat(path(slug))
    return true
  } catch {
    return false
  }
}

const createPlaceholderFile = async (slug, title) => {
  const data = postData(title, slug)

  await Deno.writeTextFile(path(slug), data)
}

const main = async () => {
  const title = prompt('Enter title:') ?? 'default'
  const slug = slugifier(title)
  const existsAsPost = await pageExists(slug)

  if (existsAsPost) {
    console.log('Slug already exists')
    await main()
  } else {
    await createPlaceholderFile(slug, title)
  }
}

await main()

console.info('✅ Done!')
// @source: https://github.com/bdevos/appjeniksaan-site/blob/main/create.ts
