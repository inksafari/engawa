import { expect, test as it } from '@playwright/test'

it('Colophon page', async ({ page }) => {
  await page.goto('/colophon')
  await expect(page).toHaveTitle('Colophon • @inksafari')
  await expect(page.getByTestId('heading')).toBeVisible()
  const link = page.getByTestId('link')
  await expect(link).toBeVisible()
  // await expect(link).toHaveText('Go home')
  await expect(link).toHaveAttribute('href', '/')
})
