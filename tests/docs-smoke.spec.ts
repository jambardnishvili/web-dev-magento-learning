import { expect, test } from "@playwright/test";

const pages = [
  { path: "/", heading: "Web Dev and Magento Learning Site" },
  { path: "/when-you-open-a-website-who-is-talking/", heading: "When You Open a Website, Who Is Talking?" },
  { path: "/what-is-a-request-and-what-is-a-response/", heading: "What Is a Request, and What Is a Response?" },
  { path: "/static-file-or-made-page/", heading: "Static File or Made Page?" },
  { path: "/what-does-the-web-server-do/", heading: "What Does the Web Server Do?" },
  { path: "/where-does-php-fit/", heading: "Where Does PHP Fit?" },
  { path: "/where-does-magento-fit/", heading: "Where Does Magento Fit?" },
  { path: "/how-magento-chooses-code-for-url/", heading: "How Magento Chooses What Code Handles a URL" },
  { path: "/how-magento-turns-layout-into-html/", heading: "How Magento Turns Layout Into Page HTML" },
  { path: "/where-does-page-data-live/", heading: "Where Does Page Data Live?" },
  { path: "/what-are-product-attributes/", heading: "What Are Product Attributes?" },
  { path: "/why-does-cache-exist/", heading: "Why Does Cache Exist?" },
  { path: "/what-is-php-fpm/", heading: "What Is PHP-FPM?" },
  { path: "/what-is-nginx/", heading: "What Is nginx?" },
  { path: "/what-is-mysql/", heading: "What Is MySQL?" },
  { path: "/what-is-redis/", heading: "What Is Redis?" },
  { path: "/deep-dives/how-php-runs-one-request/", heading: "How PHP Runs One Request" },
  { path: "/deep-dives/how-php-fpm-workers-handle-magento/", heading: "How PHP-FPM Workers Handle Magento" },
  { path: "/field-guide/", heading: "Field Guide" },
  { path: "/field-guide/first-30-minutes-new-magento-server/", heading: "First 30 Minutes on a New Magento Server" },
  { path: "/field-guide/onboard-new-magento-server/", heading: "Onboard a New Magento Server" },
  { path: "/field-guide/find-magento-root/", heading: "Find the Magento Root" },
  { path: "/field-guide/map-running-services/", heading: "Map Running Services" },
  { path: "/field-guide/find-site-config/", heading: "Find the Site Config" },
  { path: "/field-guide/product-page-shows-500/", heading: "Product Page Shows 500" },
  { path: "/field-guide/find-which-magento-code-handles-url/", heading: "Find Which Magento Code Handles a URL" },
  { path: "/field-guide/find-which-template-renders-page-part/", heading: "Find Which Template Renders a Page Part" },
  { path: "/field-guide/trace-storefront-value-to-source/", heading: "Trace a Storefront Value to Its Source" },
  { path: "/field-guide/find-php-version-and-errors/", heading: "Find PHP Version and Errors" },
  { path: "/field-guide/check-php-fpm-pool-and-slow-log/", heading: "Check PHP-FPM Pool and Slow Log" },
  { path: "/field-guide/502-bad-gateway/", heading: "502 Bad Gateway" },
  { path: "/field-guide/clear-magento-cache/", heading: "Clear Magento Cache" },
  { path: "/field-guide/find-magento-logs/", heading: "Find Magento Logs" },
  { path: "/field-guide/find-nginx-logs/", heading: "Find nginx Logs" },
  { path: "/field-guide/check-php-fpm/", heading: "Check PHP-FPM" },
  { path: "/field-guide/search-files-on-server/", heading: "Search Files on a Server" },
  { path: "/field-guide/check-mysql/", heading: "Check MySQL" },
  { path: "/field-guide/check-redis/", heading: "Check Redis" }
];

const lessonPages = pages
  .filter((page) => page.path !== "/" && !page.path.startsWith("/field-guide/"))
  .map((page) => page.path);

async function expectNoVisibleChildOverflow(page, selector) {
  const scene = page.locator(selector);
  await expect(scene).toBeVisible();

  const offenders = await scene.evaluate((node) => {
    const sceneBox = node.getBoundingClientRect();

    return [...node.querySelectorAll("*")]
      .filter((child) => {
        const style = getComputedStyle(child);
        const box = child.getBoundingClientRect();

        return style.display !== "none"
          && style.visibility !== "hidden"
          && Number(style.opacity) !== 0
          && box.width > 0
          && box.height > 0;
      })
      .map((child) => {
        const box = child.getBoundingClientRect();

        return {
          className: child.className || child.tagName,
          top: box.top - sceneBox.top,
          bottom: box.bottom - sceneBox.bottom,
          left: box.left - sceneBox.left,
          right: box.right - sceneBox.right
        };
      })
      .filter((box) => box.top < -2 || box.bottom > 2 || box.left < -2 || box.right > 2);
  });

  expect(offenders).toEqual([]);
}

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
    await expect(browserPage.locator("body")).not.toContainText("Page not found");
    expect(errors).toEqual([]);
  });
}

test("home page links to the lesson sequence", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /Start with Lesson 1/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Open the Field Guide/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /15. Redis/i })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Runtime deep dives" })).toBeVisible();
  await expect(page.locator(".md-content .lesson-card[href='deep-dives/how-php-runs-one-request/']")).toBeVisible();
});

test("field guide links to command pages", async ({ page }) => {
  await page.goto("/field-guide/");
  await expect(page.getByRole("heading", { level: 2, name: "How this section is organized" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Onboarding" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Trace Magento Code" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Trace Magento Data" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Runtime Diagnostics" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Troubleshooting" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Command Cheatsheets" })).toBeVisible();

  const lessonMap = page.locator(".lesson-map");
  await expect(lessonMap.locator("a[href='first-30-minutes-new-magento-server/']")).toBeVisible();
  await expect(lessonMap.locator("a[href='onboard-new-magento-server/']")).toBeVisible();
  await expect(lessonMap.locator("a[href='find-magento-root/']")).toBeVisible();
  await expect(lessonMap.locator("a[href='product-page-shows-500/']")).toBeVisible();
  await expect(lessonMap.locator("a[href='find-which-magento-code-handles-url/']")).toBeVisible();
  await expect(lessonMap.locator("a[href='find-which-template-renders-page-part/']")).toBeVisible();
  await expect(lessonMap.locator("a[href='trace-storefront-value-to-source/']")).toBeVisible();
  await expect(lessonMap.locator("a[href='find-php-version-and-errors/']")).toBeVisible();
  await expect(lessonMap.locator("a[href='check-php-fpm-pool-and-slow-log/']")).toBeVisible();
  await expect(lessonMap.locator("a[href='502-bad-gateway/']")).toBeVisible();
  await expect(lessonMap.locator("a[href='clear-magento-cache/']")).toBeVisible();
  await expect(lessonMap.locator("a[href='find-nginx-logs/']")).toBeVisible();
  await expect(lessonMap.locator("a[href='check-redis/']")).toBeVisible();
});

for (const lessonPath of lessonPages) {
  test(`lesson has consistent teaching sections: ${lessonPath}`, async ({ page }) => {
    await page.goto(lessonPath);

    await expect(page.getByRole("heading", { level: 2, name: "Watch the visual first" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Check yourself" })).toBeVisible();
    await expect(page.locator("article")).toContainText("You should now understand");
    await expect(page.getByRole("heading", { level: 2, name: "Use this in real work" })).toBeVisible();
  });
}

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

for (const lessonPath of [
  "/what-is-a-request-and-what-is-a-response/",
  "/where-does-php-fit/",
  "/where-does-magento-fit/",
  "/how-magento-chooses-code-for-url/",
  "/where-does-page-data-live/",
  "/what-is-php-fpm/",
  "/what-is-nginx/",
  "/what-is-mysql/",
  "/what-is-redis/"
]) {
  test(`pair animation renders without horizontal overflow: ${lessonPath}`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(lessonPath);

    const scene = page.locator(".message-scene");
    await expect(scene).toBeVisible();

    const hasOverflow = await scene.evaluate((node) => node.scrollWidth > node.clientWidth + 1);
    expect(hasOverflow).toBeFalsy();
    await expectNoVisibleChildOverflow(page, ".message-scene");
  });
}

test("layout assembly animation renders without clipping", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/how-magento-turns-layout-into-html/");

  const scene = page.locator(".layout-scene");
  await expect(scene).toBeVisible();

  const hasOverflow = await scene.evaluate((node) => node.scrollWidth > node.clientWidth + 1);
  expect(hasOverflow).toBeFalsy();
  await expectNoVisibleChildOverflow(page, ".layout-scene");
});

test("attribute value animation renders without clipping", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/what-are-product-attributes/");

  const scene = page.locator(".attribute-scene");
  await expect(scene).toBeVisible();

  const hasOverflow = await scene.evaluate((node) => node.scrollWidth > node.clientWidth + 1);
  expect(hasOverflow).toBeFalsy();
  await expectNoVisibleChildOverflow(page, ".attribute-scene");
});

for (const lessonPath of [
  "/static-file-or-made-page/",
  "/why-does-cache-exist/"
]) {
  test(`two-lane animation renders without horizontal overflow: ${lessonPath}`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(lessonPath);

    const scene = page.locator(".response-kind-scene");
    await expect(scene).toBeVisible();

    const hasOverflow = await scene.evaluate((node) => node.scrollWidth > node.clientWidth + 1);
    expect(hasOverflow).toBeFalsy();
    await expectNoVisibleChildOverflow(page, ".response-kind-scene");
  });
}

test("web server decision animation renders without clipping", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/what-does-the-web-server-do/");

  const scene = page.locator(".web-server-scene");
  await expect(scene).toBeVisible();

  const hasOverflow = await scene.evaluate((node) => node.scrollWidth > node.clientWidth + 1);
  expect(hasOverflow).toBeFalsy();
  await expectNoVisibleChildOverflow(page, ".web-server-scene");
});

for (const { path, selector } of [
  { path: "/deep-dives/how-php-runs-one-request/", selector: ".php-request-scene" },
  { path: "/deep-dives/how-php-fpm-workers-handle-magento/", selector: ".worker-pool-scene" }
]) {
  test(`runtime deep-dive visual renders without clipping: ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(path);

    const scene = page.locator(selector);
    await expect(scene).toBeVisible();

    const hasOverflow = await scene.evaluate((node) => node.scrollWidth > node.clientWidth + 1);
    expect(hasOverflow).toBeFalsy();
    await expectNoVisibleChildOverflow(page, selector);
  });
}

for (const { path, selector } of [
  { path: "/deep-dives/how-php-runs-one-request/", selector: ".php-request-scene" },
  { path: "/deep-dives/how-php-fpm-workers-handle-magento/", selector: ".worker-pool-scene" }
]) {
  for (const width of [860, 1100]) {
    test(`runtime deep-dive visual stays responsive at ${width}px: ${path}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1400 });
      await page.goto(path);

      const scene = page.locator(selector);
      await expect(scene).toBeVisible();

      const hasOverflow = await scene.evaluate((node) => node.scrollWidth > node.clientWidth + 1);
      expect(hasOverflow).toBeFalsy();
      await expectNoVisibleChildOverflow(page, selector);
    });
  }
}
