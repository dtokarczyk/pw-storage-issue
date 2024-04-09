import { test as setup } from "@playwright/test";

setup("auth", async ({ page }) => {
  await page.goto("");

  await page.context().storageState({
    path: `playwright/.auth/auth.json`,
  });
});
