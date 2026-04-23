import { expect, test } from "@playwright/test";

const pages = [
  { path: "/", heading: "Web Dev and Magento Learning Site" },
  {
    path: "/01-web-foundations/how-the-web-works-end-to-end/",
    heading: "How the Web Works End to End"
  },
  {
    path: "/01-web-foundations/http-requests-responses-headers-cookies-sessions/",
    heading: "HTTP, Headers, Cookies, and Sessions"
  },
  {
    path: "/02-php-foundations/why-interfaces-exist-and-when-not-to-use-them/",
    heading: "Why Interfaces Exist, and When Not to Use Them"
  },
  {
    path: "/03-magento-core/magento-request-lifecycle/",
    heading: "Magento Request Lifecycle"
  },
  {
    path: "/04-runtime-devops/nginx-php-fpm-mysql-redis-who-does-what/",
    heading: "Nginx, PHP-FPM, MySQL, Redis: Who Does What"
  }
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

test("home page links to key learning sections", async ({ page }) => {
  await page.goto("/");

  const navigation = page.getByLabel("Navigation");

  await expect(navigation.getByRole("link", { name: "Learning Path" })).toBeVisible();
  await expect(navigation.getByRole("link", { name: "Glossary" })).toBeVisible();
  await expect(navigation.getByRole("link", { name: "How the Web Works End to End" })).toBeVisible();
});

test("how the web works page shows explainer assets", async ({ page }) => {
  await page.goto("/01-web-foundations/how-the-web-works-end-to-end/");

  await expect(page.locator(".request-explainer")).toBeVisible();
  await expect(page.locator(".mermaid")).toBeVisible();
});
