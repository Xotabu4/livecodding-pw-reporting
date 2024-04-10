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
  retries: process.env.CI ? 2 : 0,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? [["blob"]] : [["html"]],
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
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: {
          mode: "on-first-retry",
        },
        headless: process.env.CI ? true : false,
      },
    },
  ],
});
