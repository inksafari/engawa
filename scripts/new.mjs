// A quick script that generates a new post template for a Astro site.
import slug from 'limax'
import spacetime from 'spacetime'

const SITE_TZ = 'Asia/Taipei'

function formatRFC3339(date) {
  const tzDate = spacetime(date).goto(SITE_TZ)
  const pattern = 'yyyy-MM-ddTHH:mm:ssZZZZ'
  const result = tzDate.unixFmt(pattern)

  return result
}

function formatPlainDate(date) {
  const tzDate = spacetime(date).goto(SITE_TZ)
  const pattern = 'yyyy-MM-dd'
  const result = tzDate.unixFmt(pattern)

  return result
}

const slugifier = (string_) => slug(string_, { tone: false })
const postData = (title, slug) => `---
title: '${title}'
publishDate: ${formatRFC3339(new Date())}
slug: '${slug}'
tags:
  - 雑記
isDraft: true
isIndex: false
---

`

const path = (slug) =>
  `./src/content/then/test/${formatPlainDate(new Date())}_${slug}.mdx`

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
