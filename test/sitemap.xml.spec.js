import { expect, test as it } from '@playwright/test'

const sitemapSlug = 'sitemap.xml'

it.describe('Sitemap', () => {
  it('Should be can access to sitemap file', async ({ page }) => {
    const response = await page.goto(sitemapSlug)
    expect(response?.status()).toBe(200)
  })

  it('Should be the Content-Type is `text/xml`', async ({ page }) => {
    const response = await page.goto(sitemapSlug)
    const contentType = await response?.headerValue('content-type')
    expect(contentType).toBe('text/xml')

    const content = await response?.text()
    expect(content).toContain('<?xml version="1.0" encoding="utf-8"?>')
    expect(content).toContain(
      '<loc>',
      //'<loc>http://localhost:8081/blog/chinese-loremipsum</loc>',
    )
  })
})
