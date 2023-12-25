// WARNING: 尚未設定與測試
import type { PlaywrightTestConfig } from '@playwright/test'
import { defineConfig, devices } from '@playwright/test'

/**
 * See https://playwright.dev/docs/test-configuration
 */
const config: PlaywrightTestConfig = {
  use: {
    // Emulates the user locale.
    locale: 'en-GB',

    // Emulates the user timezone.
    timezoneId: 'Europe/Berlin',
  },
  webServer: {
    command: 'pnpm serve',
    // url: 'http://localhost:8081/',
    port: 8081,
    stdout: 'pipe',
  },
  testDir: './src/tests/playwright',
  testMatch: /(.+\.)?(test|spec)\.[jt]s/,
  timeout: 10 * 1000,
  reporter: 'html',
  // https://playwright.dev/docs/browsers
  projects: [
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge-dev' }, // Or 'msedge'
    },
    {
      name: 'Desktop Safari',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 12'],
      },
    },
  ],
}

export default defineConfig(config)
