import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  workers: 2,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["blob", {
    fileName: 'report.zip'
  }], ["./support/reporters/pwServer"]],
  
  // [
  //   [
  //     'list', 
  //     { printSteps: true }
  //   ],
  //   [
  //     'html',
  //     { open: 'never' }
  //   ]
  // ],
  
  // process.env.CI
    // ? [["blob"], ["./support/reporters/pwServer"]]: 
    //[["html", { open: "always" }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {},
  // globalSetup: require.resolve('./misc/cacheWarmer.ts'),
  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: "https://shopdemo-alex-hot.koyeb.app",
        screenshot: {
          mode: "only-on-failure",
          fullPage: true,
        },
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: {
          mode: "on-first-retry",
        },
        video: {
          mode: 'on-first-retry',
          size: { width: 1280, height: 720 }
        },
        headless: true
      },
    },
  ],
});
