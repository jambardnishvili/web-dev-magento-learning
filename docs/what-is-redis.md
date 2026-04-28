# What Is Redis?

<div class="message-scene">
  <div class="message-scene__panel message-scene__panel--browser">
    <div class="message-scene__label">Magento</div>
    <div class="message-scene__card">
      <strong>Needs fast remembered data</strong>
      <span>Magento may check whether work was already done recently.</span>
      <code>cache key</code>
      <div class="message-scene__subtext">"Do we already have a safe answer?"</div>
    </div>
  </div>

  <div class="message-scene__track">
    <div class="message-scene__rail"></div>
    <div class="message-scene__chip message-scene__chip--request">Check</div>
    <div class="message-scene__chip message-scene__chip--response">Fast value</div>
  </div>

  <div class="message-scene__panel message-scene__panel--server">
    <div class="message-scene__label">Redis</div>
    <div class="message-scene__card message-scene__card--response">
      <strong>Fast temporary storage</strong>
      <span>Redis is often used for cache and sessions in Magento setups.</span>
      <code>cached value</code>
      <div class="message-scene__subtext">"Here is the remembered result."</div>
    </div>
  </div>
</div>

## Watch the visual first

Watch Magento ask for fast remembered data.

1. Magento checks whether recent work or temporary state is already remembered.
2. Magento asks Redis using a cache/session key.
3. Redis quickly returns the remembered value if it exists.
4. Magento can use that value instead of doing slower work again.
5. If the value is missing, Magento has to rebuild or fetch it elsewhere.

What changed on screen: Redis answered a fast temporary lookup, not a durable product-data lookup.

## The short story

Redis is fast storage for data that should be quick to read.

In Magento setups, Redis is commonly used for cache and sessions. Cache helps avoid repeating work. Sessions help remember user-specific temporary state, such as a visitor's current session.

## What you should notice

<div class="conversation-scene__notes">
  <div class="conversation-scene__note">
    <strong>Redis is fast</strong>
    <span>It is used when quick reads matter.</span>
  </div>
  <div class="conversation-scene__note">
    <strong>Redis is not the main database</strong>
    <span>Products and orders belong in durable storage like MySQL.</span>
  </div>
  <div class="conversation-scene__note">
    <strong>Cache can be cleared</strong>
    <span>If Redis cache is cleared, Magento can rebuild cached data again.</span>
  </div>
</div>

## Common confusion

Redis and MySQL both store data, but they do different jobs. MySQL is the durable source for store records. Redis is often used for fast cache or temporary state.

## What we are still leaving out

We are not splitting every Magento cache type yet. First, remember the role: Redis stores fast remembered data, often cache or sessions.

## Check yourself

- Are products and orders supposed to live only in Redis?
- Why is Redis useful even if MySQL already exists?
- If Redis cache is cleared, should Magento be able to rebuild cached values?

You should now understand that Redis is fast temporary storage, commonly used for cache and sessions.

## Use this in real work

Use this when Magento cache or sessions behave strangely, or when `env.php` shows Redis as the cache/session backend.

[Field guide: check Redis](field-guide/check-redis.md){ .lesson-link }
[Field guide: clear Magento cache](field-guide/clear-magento-cache.md){ .lesson-link }
[Field guide: map running services](field-guide/map-running-services.md){ .lesson-link }

[Back to Home](index.md){ .next-lesson }
