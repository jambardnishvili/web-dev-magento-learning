# Where Does PHP Fit?

<div class="message-scene">
  <div class="message-scene__panel message-scene__panel--browser">
    <div class="message-scene__label">Web server</div>
    <div class="message-scene__card">
      <strong>Page needs backend code</strong>
      <span>The web server has received a page request.</span>
      <code>GET /product</code>
      <div class="message-scene__subtext">"This is not just a file."</div>
    </div>
  </div>

  <div class="message-scene__track">
    <div class="message-scene__rail"></div>
    <div class="message-scene__chip message-scene__chip--request">Run PHP</div>
    <div class="message-scene__chip message-scene__chip--response">HTML result</div>
  </div>

  <div class="message-scene__panel message-scene__panel--server">
    <div class="message-scene__label">PHP</div>
    <div class="message-scene__card message-scene__card--response">
      <strong>Runs backend code</strong>
      <span>PHP executes code that can build the page response.</span>
      <code>make page</code>
      <div class="message-scene__subtext">"Here is the result."</div>
    </div>
  </div>
</div>

## Watch the visual first

Follow the handoff.

1. The web server already has the browser request.
2. The request is not just for a ready-made file.
3. The web server sends the work to PHP.
4. PHP runs backend code and creates an output.
5. The output goes back toward the browser as HTML or another response.

What changed on screen: the work moved from "serve a file" to "run code to make a result."

## The short story

PHP is where backend code runs.

The web server receives the browser request first. If the request needs code, the web server hands that work to PHP. PHP runs the code and gives a result back.

The browser still does not see PHP. The browser only sees the response that comes back.

## What you should notice

<div class="conversation-scene__notes">
  <div class="conversation-scene__note">
    <strong>PHP is not the browser</strong>
    <span>PHP runs on the server side, not inside the user's browser.</span>
  </div>
  <div class="conversation-scene__note">
    <strong>PHP makes results</strong>
    <span>It can prepare HTML, JSON, redirects, or errors.</span>
  </div>
  <div class="conversation-scene__note">
    <strong>The web server still matters</strong>
    <span>The web server receives the request and decides when PHP is needed.</span>
  </div>
</div>

## Common confusion

People sometimes say "PHP page" as if the browser downloads PHP. It does not. PHP runs on the server, and the browser receives the output.

## What we are still leaving out

We are not naming PHP-FPM yet. For now, think: PHP is the part that runs backend code when a page must be made.

## Check yourself

- Does PHP run in the browser or on the server?
- If the browser receives HTML, does that mean it downloaded PHP source code?
- If a request needs business logic, why is a static file response not enough?

You should now understand that PHP is the server-side code layer that can create a response when a page has to be made.

## Use this in real work

Use this when nginx can reach the server but the PHP application does not answer correctly. PHP may be healthy while Magento code fails, or PHP-FPM itself may be unavailable.

[Field guide: check PHP-FPM](field-guide/check-php-fpm.md){ .lesson-link }
[Field guide: 502 Bad Gateway](field-guide/502-bad-gateway.md){ .lesson-link }
[Field guide: product page shows 500](field-guide/product-page-shows-500.md){ .lesson-link }

[Next: Where does Magento fit?](where-does-magento-fit.md){ .next-lesson }
