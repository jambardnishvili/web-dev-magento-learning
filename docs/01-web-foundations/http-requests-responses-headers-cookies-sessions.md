# HTTP, Headers, Cookies, and Sessions

## What it is

HTTP is the protocol that browsers and servers use to communicate. A request goes from client to server. A response comes back with a status code, headers, and a body.

## Why it exists

This is the base layer beneath every Magento page load, API call, admin action, and AJAX request. If you understand HTTP, you can reason about auth, redirects, caching, cookies, and APIs without treating them as framework magic.

## When to use it

Use these concepts when reading:

- login flows
- cart persistence
- API calls
- redirects
- session bugs
- cache-control behavior

## Alternative approaches

The wrong mental model is “the browser is connected to the app continuously.” Standard web traffic is request/response based:

- each request carries method, URL, headers, and sometimes a body
- each response returns status, headers, and body
- state across requests is usually maintained with cookies and sessions

## Magento-specific example

When a customer logs in:

1. The browser submits credentials in an HTTP POST request.
2. Magento validates them and creates server-side session state.
3. The response sets or updates session cookies.
4. The browser sends that cookie back on later requests.
5. Magento uses it to recognize the customer.

For storefront and admin work, many “random logout” or “cart disappeared” bugs are actually cookie or session lifetime problems.

## Common mistakes

- Confusing cookies with sessions. Cookies live in the browser. Sessions usually live server-side.
- Ignoring headers. Redirects, content type, cache behavior, and auth often depend on headers.
- Treating all requests like page loads. Many Magento interactions are JSON or background requests.
- Forgetting that different subdomains or protocols can affect cookie behavior.

## Related pages

- [How the Web Works End to End](how-the-web-works-end-to-end.md)
- [Magento Request Lifecycle](../03-magento-core/magento-request-lifecycle.md)
- [Nginx, PHP-FPM, MySQL, Redis: Who Does What](../04-runtime-devops/nginx-php-fpm-mysql-redis-who-does-what.md)

