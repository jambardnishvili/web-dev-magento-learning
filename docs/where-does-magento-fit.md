# Where Does Magento Fit?

<div class="message-scene">
  <div class="message-scene__panel message-scene__panel--browser">
    <div class="message-scene__label">PHP</div>
    <div class="message-scene__card">
      <strong>PHP is running code</strong>
      <span>For this store, the code being run is Magento.</span>
      <code>GET /product</code>
      <div class="message-scene__subtext">"Which store page should be built?"</div>
    </div>
  </div>

  <div class="message-scene__track">
    <div class="message-scene__rail"></div>
    <div class="message-scene__chip message-scene__chip--request">Ask Magento</div>
    <div class="message-scene__chip message-scene__chip--response">Page output</div>
  </div>

  <div class="message-scene__panel message-scene__panel--server">
    <div class="message-scene__label">Magento</div>
    <div class="message-scene__card message-scene__card--response">
      <strong>Builds the store response</strong>
      <span>Magento decides what product page means and prepares the output.</span>
      <code>product page</code>
      <div class="message-scene__subtext">"Here is the page HTML."</div>
    </div>
  </div>
</div>

## Watch the visual first

This visual narrows "PHP runs code" into "PHP runs Magento."

1. PHP receives work for a store page.
2. The code being run is Magento.
3. Magento decides what `/product` means inside the store.
4. Magento prepares the page output.
5. The browser receives the output, not Magento's source code.

What changed on screen: the generic PHP layer became the specific store application.

## The short story

Magento is the store application.

PHP is the language/runtime that runs backend code. Magento is the big PHP application that knows store rules: products, categories, cart, checkout, customers, prices, layout, and configuration.

When the request is for a Magento page, PHP runs Magento code, and Magento prepares the response.

## What you should notice

<div class="conversation-scene__notes">
  <div class="conversation-scene__note">
    <strong>Magento is not the web server</strong>
    <span>The request reaches the web server first, then PHP, then Magento code.</span>
  </div>
  <div class="conversation-scene__note">
    <strong>Magento knows store rules</strong>
    <span>It decides what a product page, cart page, or checkout page means.</span>
  </div>
  <div class="conversation-scene__note">
    <strong>The browser gets output</strong>
    <span>The browser receives HTML or data, not Magento's PHP source code.</span>
  </div>
</div>

## Common confusion

It is tempting to say "Magento receives the request" immediately. That is close enough in casual speech, but technically the request reaches the web server first and only later reaches Magento code.

## What we are still leaving out

We are not opening Magento internals yet. Routes, controllers, layout, cache, and database reads come after this outer flow feels clear.

## Check yourself

- Is Magento the same thing as nginx?
- Is Magento the same thing as PHP?
- If a Magento product page fails but nginx and PHP are alive, which layer probably needs investigation next?

You should now understand that Magento is the PHP store application that decides store behavior and builds store responses.

## Use this in real work

Use this when the web server and PHP are alive, but the page still fails. That usually means Magento code, configuration, layout, data, or a module needs investigation.

[Field guide: product page shows 500](field-guide/product-page-shows-500.md){ .lesson-link }
[Field guide: find Magento logs](field-guide/find-magento-logs.md){ .lesson-link }
[Field guide: first 30 minutes on a new server](field-guide/first-30-minutes-new-magento-server.md){ .lesson-link }

[Next: How Magento chooses what code handles a URL](how-magento-chooses-code-for-url.md){ .next-lesson }
