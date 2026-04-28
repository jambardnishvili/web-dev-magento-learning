# Where Does Page Data Live?

<div class="message-scene">
  <div class="message-scene__panel message-scene__panel--browser">
    <div class="message-scene__label">Magento</div>
    <div class="message-scene__card">
      <strong>Needs page details</strong>
      <span>Magento knows this is a product page, but it still needs the product data.</span>
      <code>product id: 42</code>
      <div class="message-scene__subtext">"What is the name, price, and description?"</div>
    </div>
  </div>

  <div class="message-scene__track">
    <div class="message-scene__rail"></div>
    <div class="message-scene__chip message-scene__chip--request">Look up data</div>
    <div class="message-scene__chip message-scene__chip--response">Product data</div>
  </div>

  <div class="message-scene__panel message-scene__panel--server">
    <div class="message-scene__label">Data storage</div>
    <div class="message-scene__card message-scene__card--response">
      <strong>Keeps saved facts</strong>
      <span>The store data is saved outside the PHP code, usually in a database.</span>
      <code>name + price + stock</code>
      <div class="message-scene__subtext">"Here are the saved details."</div>
    </div>
  </div>
</div>

## Watch the visual first

The key idea is that Magento code does not contain every product fact.

1. Magento knows it needs to build a product page.
2. Magento asks storage for the saved product facts.
3. Storage returns data such as name, price, and stock.
4. Magento uses those facts while building the response.
5. The browser receives the finished page, not raw database rows.

What changed on screen: Magento moved from "which page is this?" to "what saved facts does this page need?"

## The short story

Magento code decides what kind of page to build. The page data usually lives somewhere else.

For a product page, Magento may need the product name, price, images, stock status, category, and settings. Those facts are saved data. Magento reads them, combines them with code and layout rules, then prepares the page response.

## What you should notice

<div class="conversation-scene__notes">
  <div class="conversation-scene__note">
    <strong>Code and data are different</strong>
    <span>Code is the recipe. Data is the saved store information the recipe uses.</span>
  </div>
  <div class="conversation-scene__note">
    <strong>The database is not the page</strong>
    <span>It stores facts. Magento turns those facts into a page.</span>
  </div>
  <div class="conversation-scene__note">
    <strong>Slow data reads can slow pages</strong>
    <span>If Magento waits too long for saved data, the browser waits too.</span>
  </div>
</div>

## Common confusion

It is easy to think the product page is saved as one finished file. In Magento, the page is usually built from code, layout, settings, and saved data.

## What we are still leaving out

We are not going deep into MySQL tables yet. For now, remember: Magento asks storage for saved facts, then uses those facts to build the response.

## Check yourself

- Is the product page usually saved as one finished HTML file?
- If a product price is wrong, is that always a template problem?
- Why can slow storage make the browser feel slow?

You should now understand that Magento combines code, layout, and saved data to build a page response.

## Use this in real work

Use this when a page renders but shows old, missing, or wrong data. The next question is whether Magento read from cache, Redis, MySQL, files, or an external service.

[Field guide: check MySQL](field-guide/check-mysql.md){ .lesson-link }
[Field guide: check Redis](field-guide/check-redis.md){ .lesson-link }
[Field guide: trace a storefront value to its source](field-guide/trace-storefront-value-to-source.md){ .lesson-link }
[Field guide: product page shows 500](field-guide/product-page-shows-500.md){ .lesson-link }

[Next: What are product attributes?](what-are-product-attributes.md){ .next-lesson }
