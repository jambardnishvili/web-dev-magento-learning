# What Is nginx?

<div class="message-scene">
  <div class="message-scene__panel message-scene__panel--browser">
    <div class="message-scene__label">Browser</div>
    <div class="message-scene__card">
      <strong>Sends the web request</strong>
      <span>The browser asks the site for a page or file.</span>
      <code>GET /product</code>
      <div class="message-scene__subtext">"Please send this product page."</div>
    </div>
  </div>

  <div class="message-scene__track">
    <div class="message-scene__rail"></div>
    <div class="message-scene__chip message-scene__chip--request">Request</div>
    <div class="message-scene__chip message-scene__chip--response">Response</div>
  </div>

  <div class="message-scene__panel message-scene__panel--server">
    <div class="message-scene__label">nginx</div>
    <div class="message-scene__card message-scene__card--response">
      <strong>A common web server</strong>
      <span>nginx is often the front-door web server in Magento hosting.</span>
      <code>serve or forward</code>
      <div class="message-scene__subtext">"I can serve files or hand PHP work to PHP-FPM."</div>
    </div>
  </div>
</div>

## Watch the visual first

This visual gives the real name for the front-door web server.

1. The browser sends a web request.
2. nginx receives the request first.
3. nginx decides whether it can serve the response directly.
4. If PHP code is needed, nginx forwards the work to PHP-FPM.
5. nginx sends the final response back toward the browser.

What changed on screen: "web server" now has a concrete name: nginx.

## The short story

nginx is a web server.

That means it is often the first server program that receives the browser request. It can send simple files back itself. If the request needs backend PHP code, nginx passes the request to PHP-FPM.

## What you should notice

<div class="conversation-scene__notes">
  <div class="conversation-scene__note">
    <strong>nginx is the front door</strong>
    <span>It receives browser requests before Magento code runs.</span>
  </div>
  <div class="conversation-scene__note">
    <strong>It is not PHP</strong>
    <span>nginx does not run Magento code. PHP-FPM runs the PHP code.</span>
  </div>
  <div class="conversation-scene__note">
    <strong>It can be fast for files</strong>
    <span>Images, CSS, and JavaScript can often be returned directly.</span>
  </div>
</div>

## Common confusion

nginx is not "the Magento server" by itself. It is one part of the server stack. For Magento pages, nginx usually forwards work to PHP-FPM.

## What we are still leaving out

We are not configuring nginx yet. For now, connect the name to the role: nginx is a web server, and the web server is the front door.

## Check yourself

- Does nginx run Magento PHP code itself?
- Why can nginx serve images or CSS faster than a Magento page?
- If nginx returns `502`, should you check only Magento logs?

You should now understand that nginx is the front-door web server that serves simple files or forwards PHP work.

## Use this in real work

Use this when you need to prove which domain maps to which code folder, why a request is `404`, or why nginx cannot talk to PHP-FPM.

[Field guide: find the site config](field-guide/find-site-config.md){ .lesson-link }
[Field guide: find nginx logs](field-guide/find-nginx-logs.md){ .lesson-link }
[Field guide: 502 Bad Gateway](field-guide/502-bad-gateway.md){ .lesson-link }

[Next: What is MySQL?](what-is-mysql.md){ .next-lesson }
