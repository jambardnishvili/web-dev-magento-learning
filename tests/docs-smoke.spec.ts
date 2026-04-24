import { expect, test } from "@playwright/test";

const pages = [
  { path: "/", heading: "Web Dev and Magento Learning Site" }
];

for (const page of pages) {
  test(`page renders: ${page.path}`, async ({ page: browserPage }) => {
    const errors: string[] = [];

    browserPage.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    const response = await browserPage.goto(page.path);
    expect(response?.ok()).toBeTruthy();
    await expect(browserPage.getByRole("heading", { level: 1, name: page.heading })).toBeVisible();
    await expect(browserPage.locator("body")).not.toContainText("404");
    expect(errors).toEqual([]);
  });
}

test("home page shows rewrite placeholder", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Current lesson pages removed.")).toBeVisible();
  await expect(page.getByText("rebuild from scratch around simpler visual-first lessons")).toBeVisible();
});
