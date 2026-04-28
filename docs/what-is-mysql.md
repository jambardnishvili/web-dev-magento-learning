# What Is MySQL?

<div class="message-scene">
  <div class="message-scene__panel message-scene__panel--browser">
    <div class="message-scene__label">Magento</div>
    <div class="message-scene__card">
      <strong>Needs durable facts</strong>
      <span>Magento needs saved store data to build the page.</span>
      <code>product id: 42</code>
      <div class="message-scene__subtext">"What is this product's name, price, and stock?"</div>
    </div>
  </div>

  <div class="message-scene__track">
    <div class="message-scene__rail"></div>
    <div class="message-scene__chip message-scene__chip--request">Query</div>
    <div class="message-scene__chip message-scene__chip--response">Rows</div>
  </div>

  <div class="message-scene__panel message-scene__panel--server">
    <div class="message-scene__label">MySQL</div>
    <div class="message-scene__card message-scene__card--response">
      <strong>Stores long-term data</strong>
      <span>MySQL keeps product, order, customer, and configuration records.</span>
      <code>saved rows</code>
      <div class="message-scene__subtext">"Here are the facts Magento asked for."</div>
    </div>
  </div>
</div>

## Watch the visual first

Watch Magento ask for durable store facts.

1. Magento needs saved product information.
2. Magento sends a database query.
3. MySQL returns rows of saved data.
4. Magento uses those rows to build the response.
5. The browser receives the finished output, not raw MySQL rows.

What changed on screen: the durable facts came from MySQL, but Magento still built the page.

## The short story

MySQL is the database.

In Magento, the database stores durable business data: products, customers, orders, store configuration, categories, and many relationships between them. Magento asks MySQL for facts, then uses those facts while building the response.

## What you should notice

<div class="conversation-scene__notes">
  <div class="conversation-scene__note">
    <strong>Durable means saved</strong>
    <span>Product and order data should still exist after a server restarts.</span>
  </div>
  <div class="conversation-scene__note">
    <strong>MySQL returns data, not pages</strong>
    <span>Magento turns database data into HTML or API responses.</span>
  </div>
  <div class="conversation-scene__note">
    <strong>Slow queries slow pages</strong>
    <span>If Magento waits on MySQL, the browser waits on Magento.</span>
  </div>
</div>

## Common confusion

The database is not the website. It stores records. Magento decides how to use those records and what response to send back.

## What we are still leaving out

We are not explaining tables, indexes, or SQL yet. First, remember the role: MySQL stores durable Magento data.

## Check yourself

- Should products and orders survive a server restart?
- Does MySQL return finished web pages?
- If Magento cannot connect to MySQL, can it reliably build product pages?

You should now understand that MySQL is Magento's durable business-data storage.

## Use this in real work

Use this when Magento logs show SQL errors, missing tables, connection failures, or product/category data problems.

[Field guide: check MySQL](field-guide/check-mysql.md){ .lesson-link }
[Field guide: product page shows 500](field-guide/product-page-shows-500.md){ .lesson-link }
[Field guide: first 30 minutes on a new server](field-guide/first-30-minutes-new-magento-server.md){ .lesson-link }

[Next: What is Redis?](what-is-redis.md){ .next-lesson }
