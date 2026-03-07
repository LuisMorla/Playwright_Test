import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  retries: 1,
  reporter: "allure-playwright",

  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },


  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

  ],
  webServer: {
    command: 'npm run start',
    url:"https://demoqa.com/",
    reuseExistingServer: true
  }
});
