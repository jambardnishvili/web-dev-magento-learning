# Why Does Cache Exist?

<div class="response-kind-scene">
  <div class="response-kind-scene__lane response-kind-scene__lane--made">
    <div class="response-kind-scene__endpoint response-kind-scene__endpoint--browser">
      <div class="response-kind-scene__label">First time</div>
      <strong>GET /product</strong>
      <span>"Please build this page."</span>
    </div>

    <div class="response-kind-scene__motion">
      <div class="response-kind-scene__rail"></div>
      <div class="response-kind-scene__chip response-kind-scene__chip--page-request">Build</div>
      <div class="response-kind-scene__chip response-kind-scene__chip--page-response">Save copy</div>
    </div>

    <div class="response-kind-scene__endpoint response-kind-scene__endpoint--server">
      <div class="response-kind-scene__label">Magento works</div>
      <strong>Builds the answer</strong>
      <span>Magento reads data, applies layout rules, and prepares the response.</span>
      <div class="response-kind-scene__steps">
        <span>Read data</span>
        <span>Build HTML</span>
        <span>Store copy</span>
      </div>
    </div>
  </div>

  <div class="response-kind-scene__lane response-kind-scene__lane--file">
    <div class="response-kind-scene__endpoint response-kind-scene__endpoint--browser">
      <div class="response-kind-scene__label">Next time</div>
      <strong>GET /product</strong>
      <span>"Please send this page again."</span>
    </div>

    <div class="response-kind-scene__motion">
      <div class="response-kind-scene__rail"></div>
      <div class="response-kind-scene__chip response-kind-scene__chip--file-request">Ask cache</div>
      <div class="response-kind-scene__chip response-kind-scene__chip--file-response">Fast copy</div>
    </div>

    <div class="response-kind-scene__endpoint response-kind-scene__endpoint--server">
      <div class="response-kind-scene__label">Cache answers</div>
      <strong>Reuses safe work</strong>
      <span>If the saved copy is still valid, the system can return it quickly.</span>
      <div class="response-kind-scene__badge">cached HTML</div>
    </div>
  </div>
</div>

## Watch the visual first

Compare the first request with the later request.

1. The first time, Magento does the work: read data, build HTML, and save a copy.
2. The next time, the system checks whether a safe saved answer exists.
3. If the saved answer is still valid, the response can come back faster.
4. If the saved answer is old or unsafe, Magento must rebuild it.

What changed on screen: repeated work turned into a reusable saved answer.

## The short story

Cache exists because some work does not need to be repeated every time.

If Magento builds the same product page again and again, the store wastes time. Cache keeps a safe copy of previous work. When the same kind of request arrives again, the system can reuse that copy instead of rebuilding everything from scratch.

## What you should notice

<div class="conversation-scene__notes">
  <div class="conversation-scene__note">
    <strong>Cache is a shortcut</strong>
    <span>It avoids repeated work when the old answer is still good enough.</span>
  </div>
  <div class="conversation-scene__note">
    <strong>Cache must be invalidated</strong>
    <span>If the price changes, the old cached copy may need to be removed.</span>
  </div>
  <div class="conversation-scene__note">
    <strong>Cache bugs feel strange</strong>
    <span>A page can look old because the browser received an old saved answer.</span>
  </div>
</div>

## Common confusion

Cache is not the source of truth. It is a remembered answer. The real product data still lives in storage, and Magento must decide when cached answers are safe to reuse.

## What we are still leaving out

We are not separating browser cache, Magento cache, Redis, or full-page cache yet. First, the idea has to be clear: cache means "reuse a previous answer when that is safe."

## Check yourself

- Is cache the source of truth?
- Why can cache make a page look old after a change?
- Why is clearing cache different from fixing the original cause?

You should now understand that cache is a saved shortcut, not the real source of product or order data.

## Use this in real work

Use this when something looks stale after a code, content, product, or configuration change. First decide whether the problem is stale cache or a real runtime error.

[Field guide: clear Magento cache](field-guide/clear-magento-cache.md){ .lesson-link }
[Field guide: check Redis](field-guide/check-redis.md){ .lesson-link }
[Field guide: product page shows 500](field-guide/product-page-shows-500.md){ .lesson-link }

[Next: What is PHP-FPM?](what-is-php-fpm.md){ .next-lesson }
