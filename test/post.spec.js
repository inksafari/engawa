import { expect, test as it } from '@playwright/test'
import path from 'node:path/posix'

// import { removeTrailingSlash } from './../src/utilities/getPermaLink.js'

function removeTrailingSlash(pathname) {
  const matchTrailingSlash = /\w+\/$/
  if (matchTrailingSlash.test(pathname)) {
    return pathname.slice(0, -1)
  }
  return pathname
}

const baseUrl = 'http://localhost:8081/'
const postSlug = 'chinese-loremipsum'
const postUrl = new URL(path.join('blog', postSlug), baseUrl)
const canonical = removeTrailingSlash(postUrl)

it.beforeEach(async ({ page }) => {
  await page.goto(`/blog/${postSlug}`)
})

it('meta is correct', async ({ page }) => {
  await expect(page).toHaveTitle(/中文假文/)

  //await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
  //'content',
  ///中文假文/
  //)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    canonical,
  )
  //await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
  //'content',
  //canonical
  //)
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    '測試',
  )
})
