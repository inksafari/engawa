import { expect, test as it } from '@playwright/test'

// TODO: https://github.com/yacosta738/yacosta738.github.io/blob/main/tests/integration/blog-search.spec.ts
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
