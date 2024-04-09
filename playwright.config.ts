import { defineConfig, devices } from "@playwright/test";

require("dotenv").config();

const browser = process.env.BROWSER || "Desktop Chrome";
const baseURL = process.env.BASE_URL || "https://google.pl";

// @see https://github.com/microsoft/playwright/issues/11627
const launchOptions = {
  args:
    browser === "Desktop Chrome"
      ? ["--ignore-gpu-blocklist", "--use-gl=angle", "--use-angle=gl-egl"]
      : [],
};

export default defineConfig({
  testDir: "./playwright",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL,
    trace: "retain-on-failure",
    video: "on",
    ignoreHTTPSErrors: true,
    ...devices[browser],
    launchOptions,
  },
  projects: [
    {
      name: "setup-auth",
      testMatch: /.*\.setup\.ts/,
    },
  ],
});
