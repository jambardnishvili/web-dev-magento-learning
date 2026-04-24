import { expect, test } from "@playwright/test";

const pages = [
  { path: "/", heading: "Web Dev and Magento Learning Site" },
  { path: "/when-you-open-a-website-who-is-talking/", heading: "When You Open a Website, Who Is Talking?" }
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

test("home page links to the first lesson", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /Start with Lesson 1/i })).toBeVisible();
});

for (const width of [860, 1100, 1440]) {
  test(`lesson scene stays inside the content column at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1400 });
    await page.goto("/when-you-open-a-website-who-is-talking/");

    const scene = page.locator(".conversation-scene");
    await expect(scene).toBeVisible();

    const hasOverflow = await scene.evaluate((node) => node.scrollWidth > node.clientWidth + 1);
    expect(hasOverflow).toBeFalsy();

    const browserCard = page.locator(".conversation-scene__card--browser");
    const serverCard = page.locator(".conversation-scene__card--server");
    await expect(browserCard).toBeVisible();
    await expect(serverCard).toBeVisible();
  });
}

test("lesson scene fits above the fold on first load", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/when-you-open-a-website-who-is-talking/");

  const scene = page.locator(".conversation-scene");
  await expect(scene).toBeVisible();

  const box = await scene.boundingBox();
  expect(box).not.toBeNull();
  expect((box?.y ?? 0) + (box?.height ?? 0)).toBeLessThanOrEqual(820);
});
