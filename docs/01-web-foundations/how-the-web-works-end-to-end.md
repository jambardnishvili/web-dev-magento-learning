# How the Web Works End to End

!!! note
    This page is a map, not a test. You do not need to fully understand every term on the first read. The goal is to see the big picture first, then learn the names of each part.

## What it is

This page explains the full path from typing a URL in a browser to seeing HTML, JSON, or assets rendered on screen.

```mermaid
flowchart TB
    A["User enters URL or clicks link"]
    B["Browser finds site address and checks saved data"]
    C["Web server (nginx) receives request"]
    D["Web server serves file or sends PHP work to PHP-FPM"]
    E["Magento starts up and loads its setup"]
    F["Magento decides which code should handle URL"]
    G["Magento reads saved fast data or database data"]
    H["Magento builds HTML or JSON response"]
    I["Web server returns response"]
    J["Browser parses assets and renders page"]

    A --> B --> C --> D --> E --> F --> G --> H --> I --> J
```

## Quick visual walkthrough

<div class="request-explainer" aria-label="Animated explainer showing how a browser request moves through the browser, web server, PHP, Magento, data storage, and back to the browser.">
  <div class="request-explainer__stage">
    <div class="request-explainer__browser">
      <div class="request-explainer__browser-bar">
        <span></span><span></span><span></span>
        <div class="request-explainer__browser-url">shop.example.com/product</div>
      </div>
      <div class="request-explainer__browser-body">
        <div class="request-explainer__hero">
          <strong>Product page</strong>
          <span>Customer opens item</span>
        </div>
        <div class="request-explainer__line"></div>
        <div class="request-explainer__line short"></div>
        <div class="request-explainer__line"></div>
        <div class="request-explainer__button">Add to cart</div>
        <div class="request-explainer__rendered">
          <strong>Page rendered</strong>
          <span>HTML returned</span>
          <span>CSS and JS applied</span>
        </div>
      </div>
    </div>

    <div class="request-explainer__flow">
      <div class="request-explainer__card server">
        <strong>Web server</strong>
        <span>Receives request first</span>
        <span>Can serve static files</span>
      </div>
      <div class="request-explainer__card php">
        <strong>PHP</strong>
        <span>Runs PHP code</span>
        <span>Starts Magento</span>
      </div>
      <div class="request-explainer__card magento">
        <strong>Magento app</strong>
        <span>Matches route</span>
        <span>Builds response</span>
      </div>
      <div class="request-explainer__data-row">
        <div class="request-explainer__card fast">
          <strong>Fast data</strong>
          <span>Cache / session</span>
        </div>
        <div class="request-explainer__card db">
          <strong>Database</strong>
          <span>Durable data</span>
        </div>
      </div>
      <div class="request-explainer__request-chip">GET /product</div>
      <div class="request-explainer__response-chip">HTML response</div>
    </div>
  </div>

  <div class="request-explainer__steps">
    <div>1. Browser asks for page</div>
    <div>2. Web server receives request</div>
    <div>3. PHP starts Magento</div>
    <div>4. Magento loads needed data</div>
    <div>5. Response returns and page renders</div>
  </div>
</div>

This loop is meant to make the order feel familiar. It is not trying to teach every technical detail at once.

## Terms used in this page

Before going deeper, here is the same vocabulary in plain English:

- `DNS`: how the browser finds the address of the site
- `cache`: saved data used to avoid repeating work
- `nginx`: the web server that receives the request first
- `PHP-FPM`: the PHP worker process that actually runs PHP code
- `bootstrap`: the app startup step
- `route`: the rule that decides which code handles the URL
- `database`: durable stored data such as products, customers, and orders
- `assets`: files like CSS, JavaScript, images, and fonts

## Why it exists

Without this model, it is hard to debug problems because every issue feels like “Magento is broken.” In reality, a problem may belong to:

- how the browser found the site
- the web server
- the PHP worker process
- saved cached data
- Magento routing or business logic
- database access
- frontend rendering in the browser

## When to use it

Use this model when you need to reason about:

- where a request starts
- who owns a failure
- where latency comes from
- why a page differs between users or environments

## Alternative approaches

The wrong alternative is to think of “the site” as one box. Real systems are layered:

- browser handles rendering and client-side behavior
- the web server (`nginx`) handles the first HTTP entry and static files
- the PHP worker layer (`PHP-FPM`) runs PHP code
- Magento coordinates application logic
- storage layers such as Redis and MySQL provide different kinds of saved data

## Magento-specific example

A shopper opens a product page:

1. The browser requests `/catalog/product/view` or a rewritten product URL.
2. The web server receives the request and forwards PHP work to PHP-FPM.
3. Magento starts up, decides which code should handle the URL, and builds the page.
4. Magento may read cache from Redis and product data from MySQL.
5. The final HTML goes back through nginx to the browser.

If the HTML is correct but the page still looks wrong, the issue may be frontend assets or browser-side JavaScript rather than backend PHP.

## Common mistakes

- Thinking the web server executes PHP. It does not. It passes that work to PHP-FPM.
- Thinking Magento stores everything in one place. It often uses Redis for fast temporary data and MySQL for durable business data.
- Thinking the browser just displays HTML. It also runs JavaScript, caches assets, and can change what the user sees after the response arrives.
- Debugging only application code when the failure is actually before Magento or after Magento.

## Related pages

- [HTTP, Headers, Cookies, and Sessions](http-requests-responses-headers-cookies-sessions.md)
- [Magento Request Lifecycle](../03-magento-core/magento-request-lifecycle.md)
- [Nginx, PHP-FPM, MySQL, Redis: Who Does What](../04-runtime-devops/nginx-php-fpm-mysql-redis-who-does-what.md)
