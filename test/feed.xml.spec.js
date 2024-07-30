import { expect, test as it } from '@playwright/test'

const feedFile = 'feed.xml'
const feedSlug = `/rss/${feedFile}`

it.describe('Feed.xml', () => {
  //it('Check rss link', async ({ page }) => {
  //await page.goto('/rss')
  //await page.getByRole('link', { name: 'feed.xml' }).click()
  //await expect(page).toHaveURL(feedSlug)
  //})

  it('Should be can access to atom feed', async ({ page }) => {
    const response = await page.goto(feedSlug)
    expect(response?.status()).toBe(200)
  })

  it('Should be the Content-Type is `text/xml`', async ({ page }) => {
    const response = await page.goto(feedSlug)
    const contentType = await response?.headerValue('content-type')
    expect(contentType).toBe('text/xml')

    const content = await response?.text()
    expect(content).toContain('<?xml version="1.0" encoding="utf-8"?>')
    expect(content).toContain('<entry>')
  })
})
