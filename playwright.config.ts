import { defineConfig, devices } from '@playwright/test';
import { createArgosReporterOptions } from "@argos-ci/playwright/reporter";
import type { TestOptions } from './test-options';

export default defineConfig<TestOptions>({

  retries: 1,
reporter: [
    // Use "dot" reporter on CI, "list" otherwise (Playwright default).
    process.env.CI ? ["dot"] : ["list"],
    // Add Argos reporter.
    [
      "@argos-ci/playwright/reporter",
      createArgosReporterOptions({
        // Upload to Argos on CI only.
        uploadToArgos: !!process.env.CI,
        token: process.env.ARGOS_TOKEN,
      }),
    ],
  ],
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
    globalsUrl: 'https://demoqa.com/',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: "only-on-failure",
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
