# How PHP Runs One Request

<div class="php-request-scene">
  <div class="php-request-scene__browser">
    <div class="php-request-scene__bar">
      <span></span><span></span><span></span>
      <strong>shop.example.com/product</strong>
    </div>
    <div class="php-request-scene__screen">
      <strong>Browser</strong>
      <span>Needs a page response.</span>
      <code>GET /product</code>
      <div class="php-request-scene__ghost-lines">
        <i></i><i></i><i></i>
      </div>
    </div>
  </div>

  <div class="php-request-scene__bridge">
    <div class="php-request-scene__rail"></div>
    <div class="php-request-scene__chip php-request-scene__chip--request">request</div>
    <div class="php-request-scene__chip php-request-scene__chip--response">HTML response</div>
  </div>

  <div class="php-request-scene__runtime">
    <div class="php-request-scene__runtime-head">
      <strong>One PHP-FPM worker</strong>
      <span>This worker handles one Magento request, then becomes free again.</span>
    </div>
    <div class="php-request-scene__runtime-grid">
      <div class="php-request-scene__stack">
        <div class="php-request-scene__step php-request-scene__step--start">
          <b>1. Start execution</b>
          <span>PHP receives request data from the web server.</span>
        </div>
        <div class="php-request-scene__step php-request-scene__step--autoload">
          <b>2. Load classes</b>
          <span>Composer autoload finds PHP classes when code asks for them.</span>
        </div>
        <div class="php-request-scene__step php-request-scene__step--bootstrap">
          <b>3. Bootstrap Magento</b>
          <span>Magento loads config, DI, routing, areas, and modules.</span>
        </div>
        <div class="php-request-scene__step php-request-scene__step--run">
          <b>4. Run page logic</b>
          <span>Controllers, services, blocks, templates, and plugins do work.</span>
        </div>
      </div>
      <div class="php-request-scene__side">
        <div class="php-request-scene__mini php-request-scene__mini--cache">
          <strong>Fast data</strong>
          <span>cache/session</span>
        </div>
        <div class="php-request-scene__mini php-request-scene__mini--db">
          <strong>Database</strong>
          <span>products/orders/config</span>
        </div>
        <div class="php-request-scene__mini php-request-scene__mini--output">
          <strong>Output</strong>
          <span>HTML, JSON, redirect, or error</span>
        </div>
      </div>
    </div>
  </div>
</div>

## Watch the visual first

Follow one page load as a temporary job.

1. The browser asks for `/product`.
2. The web server sends the PHP work to one PHP-FPM worker.
3. That worker starts one PHP execution for this request.
4. PHP loads classes only when the running code needs them.
5. Magento bootstraps, finds the right code, reads data, and builds a response.
6. The worker returns the response and becomes available for another request.

What changed from the earlier PHP lesson: PHP is no longer just "the server-side language." It is a short-lived execution that runs inside a worker for one web request.

## The short story

PHP handles web requests as separate executions.

For a Magento product page, a PHP-FPM worker receives request information from nginx, runs Magento, builds the response, and then drops the request-specific memory. The next request starts fresh, unless data was saved somewhere outside PHP memory, such as MySQL, Redis, files, or the user's session.

## What actually happens

The exact internals are large, but the useful shape is stable:

- **Request data enters PHP**: method, URL, headers, cookies, and body data are made available to PHP.
- **Composer autoload finds classes**: PHP does not load every class at once; it loads classes when code references them.
- **Magento bootstraps**: Magento loads configuration, dependency injection, modules, area context, routing, and generated code.
- **Business code runs**: controllers, services, repositories, plugins, blocks, and templates do the page work.
- **Data is read or written**: Magento may touch cache, session storage, MySQL, Elasticsearch/OpenSearch, files, or external APIs.
- **A response returns**: the result is usually HTML, JSON, a redirect, a file, or an error.

## What you should notice

<div class="conversation-scene__notes">
  <div class="conversation-scene__note">
    <strong>Request memory is temporary</strong>
    <span>A variable created during one page load does not automatically exist in the next page load.</span>
  </div>
  <div class="conversation-scene__note">
    <strong>Magento is code running inside PHP</strong>
    <span>Magento is not a separate server process for each page. PHP-FPM runs the Magento PHP code.</span>
  </div>
  <div class="conversation-scene__note">
    <strong>Saved state lives outside the request</strong>
    <span>If something must survive, it belongs in database, cache, session, files, queue, or another service.</span>
  </div>
</div>

## Common confusion

Do not imagine PHP as one always-running object that remembers every page load.

Some things do stay alive between requests, such as PHP-FPM worker processes, OPcache, Redis, MySQL, and files. But the normal variables created while handling a request are temporary.

## Check yourself

- If Magento creates a local PHP variable while building a page, will that variable automatically exist on the next page load?
- Why does Magento need MySQL or Redis if PHP can store variables?
- What layer runs Magento code: browser, nginx, PHP-FPM worker, or MySQL?

You should now understand that one Magento page is built by a temporary PHP execution running inside a PHP-FPM worker.

## Use this in real work

Use this model when an error only happens during one request. Ask: did the failure happen while PHP started, while classes loaded, while Magento bootstrapped, while data was read, or while the response was built?

[Field guide: find PHP version and errors](../field-guide/find-php-version-and-errors.md){ .lesson-link }
[Field guide: check PHP-FPM pool and slow log](../field-guide/check-php-fpm-pool-and-slow-log.md){ .lesson-link }
[Field guide: product page shows 500](../field-guide/product-page-shows-500.md){ .lesson-link }

[Next: How PHP-FPM workers handle Magento](how-php-fpm-workers-handle-magento.md){ .next-lesson }
