import type { PlaywrightTestConfig } from '@playwright/test'
import { defineConfig, devices } from '@playwright/test'
// import { screenReaderConfig } from '@guidepup/playwright'

/**
 * See https://playwright.dev/docs/test-configuration
 */
const config: PlaywrightTestConfig = {
  // https://github.com/guidepup/guidepup-playwright
  // https://github.com/guidepup/guidepup-playwright/network/dependents
  // ...screenReaderConfig,
  testDir: './test',
  testMatch: /(.+\.)?(test|spec)\.[jt]s/,
  timeout: 5 * 60 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  // Configure browser and context here
  use: {
    baseURL: 'http://localhost:8081',
    trace: 'on-first-retry',

    // Emulates the user locale.
    locale: 'en-GB',

    // Emulates the user timezone.
    timezoneId: 'Europe/Amsterdam',
  },
  // https://playwright.dev/docs/browsers
  projects: [
    // { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
    // { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
    // {
    // name: 'Desktop Safari',
    // use: { ...devices['Desktop Safari'], headless: false, video: 'on' },
    //},
  ],
  outputDir: 'test/reports',
  reportSlowTests: null,
  // @see https://playwright.dev/docs/test-reporters
  reporter: [
    ['list', { printSteps: true }],
    ['html', { outputFolder: 'test/reports' }],
    ['json', { outputFile: 'test/reports/results.json' }],
  ],
  expect: {
    toMatchSnapshot: {
      threshold: 0.5,
    },
  },

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'bun run preview',
    url: 'http://localhost:8081/',
    // port: 8081,
    stdout: 'pipe',
  },
}

export default defineConfig(config)
