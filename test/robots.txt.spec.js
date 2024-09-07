import { expect, test as it } from '@playwright/test'

const robotsFile = 'robots.txt'

it.describe('robots.txt', () => {
  it('Should be can access to robots.txt', async ({ page }) => {
    const response = await page.goto(robotsFile)
    await expect(response?.status()).toBe(200)
  })

  it('Should be the Content-Type is `text/plain`', async ({ page }) => {
    const response = await page.goto(robotsFile)
    const contentType = await response?.headerValue('content-type')
    expect(contentType).toBe('text/plain')

    const content = await response?.text()
    expect(content).toContain('User-agent: python-requests')
    expect(content).toContain('User-agent: DuckDuckBot')
  })
})
