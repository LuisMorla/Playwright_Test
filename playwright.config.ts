import { defineConfig, devices } from '@playwright/test';
import { createArgosReporterOptions } from "@argos-ci/playwright/reporter";
import type { TestOptions } from './test-options';

export default defineConfig<TestOptions>({

  retries: 1,
reporter: [
    // Use "dot" reporter on CI, "list" otherwise (Playwright default).
    process.env.CI ? ["dot"] : ["list"],
    // Add Argos reporter.
    // [
    //   "@argos-ci/playwright/reporter",
    //   createArgosReporterOptions({
    //     // Upload to Argos on CI only.
    //     uploadToArgos: !!process.env.CI,
    //     token: process.env.ARGOS_TOKEN,
    //   }),
    // ],
  ],
use: {
    // Es vital que definas los valores por defecto aquí si los usas en el fixture
    globalsUrl: 'https://demoqa.com/', 
    baseURL: 'https://demoqa.com/',
    trace: 'on-first-retry',
    screenshot: "only-on-failure",
  },


  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }

  ],
  // webServer: {
  //   command: 'npm run start',
  //   url:"https://demoqa.com/",
  //   reuseExistingServer: true
  // }
});
