import { expect, test as it } from '@playwright/test'

const feedFile = 'feed.json'
const feedSlug = `/rss/${feedFile}`

it.describe('Feed.json', () => {
  //it('Check rss link', async ({ page }) => {
  //await page.goto('/rss')
  //await page.getByRole('link', { name: 'feed.json' }).click()
  //await expect(page).toHaveURL(feedSlug)
  //})

  it('Should be can access to json feed', async ({ page }) => {
    const response = await page.goto(feedSlug)
    await expect(response?.status()).toBe(200)
  })

  it('Should be the Content-Type is `application/json`', async ({ page }) => {
    const response = await page.goto(feedSlug)
    const contentType = await response?.headerValue('content-type')
    expect(contentType).toBe('application/json')

    const content = await response?.text()
    expect(content).toContain('https://jsonfeed.org/version/1.1')
    expect(content).toContain('date_published')
  })
})
