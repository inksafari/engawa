// A quick script that generates a new post template for a Astro site.
// usage: bun new EXAMPLE or bun new EXAMPLE/index
import fs from 'node:fs/promises'
import { existsSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ora from 'ora'
import slug from 'limax'
import { formatRFC3339, formatPlainDate } from '../src/utilities/date.utils.js'

const slugifier = (string_) => slug(string_, { tone: false })
const currentDate = new Date()
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const contentDirectory = path.join(__dirname, '../src/content/then')

function frontMatter(title, titleSlug) {
  return `---
title: '${title}'
publishDate: ${formatRFC3339(currentDate)}
slug: '${titleSlug}'
tags:
  - 雑記
isDraft: true
isIndex: false
---
`
}

async function createArticlePost(title, file) {
  spinner.text = `Adding '${title}'.`

  try {
    const titleSlug = slugifier(title)
    const postTemplate = frontMatter(title, titleSlug)

    // Create the destination folder if it doesn't exist
    if (!existsSync(contentDirectory)) {
      mkdirSync(contentDirectory, { recursive: true })
    }

    if (existsSync(file)) {
      throw new Error(`File already exists`)
    } else {
      // create post file
      fs.appendFile(file, postTemplate)
      spinner.succeed(`New post '${title}' created.`)
    }
  } catch (error) {
    spinner.fail(error.message)
  }

  return file
}

const spinner = ora('Adding new post').start()
if (!process.argv[2]) {
  spinner.fail('Use the format `npm run new "Title of post"`')
}

const title = process.argv[2]

// Check if file extension ".mdx" includes
if (title.split('.').pop() === 'mdx') {
  throw new Error(`File extension ".mdx" should not include`)
  // Check if file extension ".md" includes
} else if (title.split('.').pop() === 'md') {
  throw new Error(`File extension ".md" should not include`)
  // Check if filename contains more than one directory
} else if (title.split('/').length > 2) {
  throw new Error(`More than one nested directory is not allowed.`)
  // TITLE/index → TITLE/index.mdx
} else if (title.split('/').pop() === 'index') {
  const newTitle = String(title).replace('/index', '')
  const destination = `${contentDirectory}/${formatPlainDate(new Date())}_${slugifier(newTitle)}`

  if (existsSync(destination)) {
    throw new Error(`File already exists`)
  } else if (existsSync(`${destination}.mdx`)) {
    throw new Error(`File already exists`)
  } else if (existsSync(`${destination}.md`)) {
    throw new Error(`File already exists`)
  } else {
    mkdirSync(destination, { recursive: true })
    const file = `${destination}/index.mdx`
    await createArticlePost(newTitle, file)
  }
} else {
  const fileName = `${contentDirectory}/${formatPlainDate(new Date())}_${slugifier(title)}`
  if (existsSync(fileName)) {
    throw new Error(`File already exists`)
  } else {
    const file = `${fileName}.mdx`
    await createArticlePost(title, file)
  }
}
// @source:
// https://github.com/kremalicious/blog/blob/main/scripts/new/createArticlePost.ts
