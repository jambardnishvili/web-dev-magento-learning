# How the Web Works End to End

## What it is

This page explains the full path from typing a URL in a browser to seeing HTML, JSON, or assets rendered on screen.

```mermaid
flowchart LR
    A["User clicks link or enters URL"] --> B["Browser checks cache and DNS"]
    B --> C["Request goes to nginx"]
    C --> D["nginx serves static file or forwards to PHP-FPM"]
    D --> E["Magento bootstrap loads config and DI"]
    E --> F["Magento resolves route and runs controller"]
    F --> G["Magento reads from Redis and MySQL as needed"]
    G --> H["Magento builds HTML or JSON response"]
    H --> I["nginx returns response to browser"]
    I --> J["Browser parses HTML, CSS, JS, and renders page"]
```

## Why it exists

Without this model, it is hard to debug problems because every issue feels like “Magento is broken.” In reality, a problem may belong to DNS, nginx, PHP-FPM, cache, routing, database access, or frontend rendering.

## When to use it

Use this model when you need to reason about:

- where a request starts
- who owns a failure
- where latency comes from
- why a page differs between users or environments

## Alternative approaches

The wrong alternative is to think of “the site” as one box. Real systems are layered:

- browser handles rendering and client-side behavior
- nginx handles HTTP entry and static assets
- PHP-FPM executes PHP workers
- Magento coordinates application logic
- Redis and MySQL provide different kinds of storage

## Magento-specific example

A shopper opens a product page:

1. The browser requests `/catalog/product/view` or a rewritten product URL.
2. nginx receives the request and forwards it to PHP-FPM.
3. Magento bootstraps, resolves the route, and builds the page.
4. Magento may read cache from Redis and product data from MySQL.
5. The final HTML goes back through nginx to the browser.

If the HTML is correct but the page still looks wrong, the issue may be frontend assets or browser-side JavaScript rather than backend PHP.

## Common mistakes

- Thinking nginx executes PHP. It does not. It forwards work to PHP-FPM.
- Thinking Magento stores everything in MySQL. It commonly uses Redis for cache and sessions.
- Thinking the browser just displays HTML. It also runs JavaScript, caches assets, and can change what the user sees after the response arrives.
- Debugging only application code when the failure is actually before Magento or after Magento.

## Related pages

- [HTTP, Headers, Cookies, and Sessions](http-requests-responses-headers-cookies-sessions.md)
- [Magento Request Lifecycle](../03-magento-core/magento-request-lifecycle.md)
- [Nginx, PHP-FPM, MySQL, Redis: Who Does What](../04-runtime-devops/nginx-php-fpm-mysql-redis-who-does-what.md)

