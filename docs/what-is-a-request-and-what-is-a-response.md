# What Is a Request, and What Is a Response?

<div class="message-scene">
  <div class="message-scene__panel message-scene__panel--browser">
    <div class="message-scene__label">Browser</div>
    <div class="message-scene__card">
      <strong>Request</strong>
      <span>The browser sends the first message.</span>
      <code>GET /product</code>
      <div class="message-scene__subtext">"Please send me this page."</div>
    </div>
  </div>

  <div class="message-scene__track">
    <div class="message-scene__rail"></div>
    <div class="message-scene__chip message-scene__chip--request">Request</div>
    <div class="message-scene__chip message-scene__chip--response">Response</div>
  </div>

  <div class="message-scene__panel message-scene__panel--server">
    <div class="message-scene__label">Server</div>
    <div class="message-scene__card message-scene__card--response">
      <strong>Response</strong>
      <span>The server sends the answer back.</span>
      <code>200 OK + page</code>
      <div class="message-scene__subtext">"Here is the page you asked for."</div>
    </div>
  </div>
</div>

## Watch the visual first

The important part is the direction.

1. `Request` moves from the browser to the server.
2. The server receives the request and prepares an answer.
3. `Response` moves from the server back to the browser.
4. The response includes a result, such as `200 OK + page`.

What changed on screen: the first message asks for something, and the second message carries the answer back.

## The short story

In the last lesson, the browser and server started talking. This lesson names the two messages in that conversation.

The browser sends a **request** first. The server sends a **response** back second.

If the response does not come back, the browser has nothing to show.

## What you should notice

<div class="conversation-scene__notes">
  <div class="conversation-scene__note">
    <strong>Request goes out</strong>
    <span>The browser asks for something, like a page, image, or data.</span>
  </div>
  <div class="conversation-scene__note">
    <strong>Response comes back</strong>
    <span>The server answers with something the browser can use.</span>
  </div>
  <div class="conversation-scene__note">
    <strong>They are a pair</strong>
    <span>You usually think about them together: request first, response second.</span>
  </div>
</div>

## Common confusion

People often talk about "loading a page" as if it were one thing. It is actually at least two steps: the browser sends a request, and the server sends a response.

## What we are still leaving out

We are still not going into headers, cookies, sessions, status codes, or Magento internals yet. The goal here is only to make the message pair feel obvious.

## Check yourself

- If you see `GET /product`, is that a request or a response?
- If you see `500`, `404`, or `200 OK`, which side sent that back?
- If no response comes back, what can the browser show?

You should now understand that a request is the ask and a response is the answer.

## Use this in real work

Use this when a browser shows `500`, `502`, `404`, or a blank page. The status code is part of the response, and it tells you which debugging path to start with.

[Field guide: product page shows 500](field-guide/product-page-shows-500.md){ .lesson-link }
[Field guide: 502 Bad Gateway](field-guide/502-bad-gateway.md){ .lesson-link }
[Field guide: find nginx logs](field-guide/find-nginx-logs.md){ .lesson-link }

[Next: Static file or made page](static-file-or-made-page.md){ .next-lesson }
