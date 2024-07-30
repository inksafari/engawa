import { expect, test as it } from '@playwright/test'

it.describe('Search page', () => {
  it('Search', async ({ page }) => {
    await page.goto('/search')
    await page.getByPlaceholder('Search...').click()
    await page.getByPlaceholder('Search...').fill('astro')
  })
  it('Visual', async ({ page }) => {
    await page.goto('/search')
    await expect(page).toHaveScreenshot({ fullPage: true })
  })
})
