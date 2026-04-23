# HTTP, Headers, Cookies, and Sessions

## What it is

When you use a website, your browser keeps sending messages to a server and getting messages back.

Those messages have proper names:

- the browser sends a [request](../glossary.md#request)
- the server sends a [response](../glossary.md#response)
- the response includes a [status code](../glossary.md#status-code), [headers](../glossary.md#header), and a [body](../glossary.md#body)

[HTTP](../glossary.md#http) is the standard format those messages use.

## Why it exists

This is the base layer beneath every Magento page load, login, form submit, redirect, and API call.

If this page is clear, a lot of “web magic” stops feeling magical. You can see that many bugs are really message problems:

- wrong message sent
- wrong message returned
- missing cookie
- bad redirect
- wrong cache instructions

## When to use it

Use these concepts when reading:

- login flows
- cart persistence
- API calls
- redirects
- session bugs
- cache-control behavior

## Alternative approaches

The wrong mental model is “the browser is just connected to the app continuously.”

Standard web traffic is more like this:

1. browser sends one request
2. server sends one response
3. browser may send another request later
4. if the app needs memory between requests, it usually uses [cookies](../glossary.md#cookie) and [sessions](../glossary.md#session)

Useful translation:

- request = “please do this” or “please give me this”
- response = “here is the result”
- header = extra info about the message
- body = main content of the message
- cookie = small browser-stored value sent back later
- session = server-side memory tied to that browser

## Magento-specific example

When a customer logs in:

1. The browser sends login details in an HTTP `POST` request.
2. Magento validates them and creates server-side session state.
3. The response sets or updates a session cookie.
4. The browser sends that cookie back on later requests.
5. Magento uses it to recognize the customer.

So if someone says “the customer keeps getting logged out” or “the cart disappears,” the bug may not be in page code at all. It may be in cookie or session handling.

## Common mistakes

- Confusing cookies with sessions. A cookie is usually the browser-side tag. A session is usually the server-side stored state.
- Ignoring headers. Redirects, content type, cache behavior, and auth often depend on them.
- Treating all requests like full page loads. Many Magento interactions are JSON or background requests.
- Forgetting that subdomains, protocol, and cookie settings can change whether login or cart state survives.

## Related pages

- [How the Web Works End to End](how-the-web-works-end-to-end.md)
- [Magento Request Lifecycle](../03-magento-core/magento-request-lifecycle.md)
- [Nginx, PHP-FPM, MySQL, Redis: Who Does What](../04-runtime-devops/nginx-php-fpm-mysql-redis-who-does-what.md)
