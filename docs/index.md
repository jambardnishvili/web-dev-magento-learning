# Web Dev and Magento Learning Site

Small visual lessons for understanding how a Magento page is delivered.

The running story stays the same: someone opens a product page. Each lesson adds one new piece to that picture.

<div class="lesson-map">
  <a class="lesson-card" href="when-you-open-a-website-who-is-talking/">
    <strong>1. Browser and server</strong>
    <span>Two sides talk before a page appears.</span>
  </a>
  <a class="lesson-card" href="what-is-a-request-and-what-is-a-response/">
    <strong>2. Request and response</strong>
    <span>The browser asks. The server answers.</span>
  </a>
  <a class="lesson-card" href="static-file-or-made-page/">
    <strong>3. Static or made</strong>
    <span>Some responses already exist. Some are built.</span>
  </a>
  <a class="lesson-card" href="what-does-the-web-server-do/">
    <strong>4. Web server</strong>
    <span>The front door decides where work goes.</span>
  </a>
  <a class="lesson-card" href="where-does-php-fit/">
    <strong>5. PHP</strong>
    <span>Backend code runs on the server side.</span>
  </a>
  <a class="lesson-card" href="where-does-magento-fit/">
    <strong>6. Magento</strong>
    <span>The PHP store application builds store output.</span>
  </a>
  <a class="lesson-card" href="how-magento-chooses-code-for-url/">
    <strong>7. Magento URL ownership</strong>
    <span>Magento maps a URL to route, controller, and action code.</span>
  </a>
  <a class="lesson-card" href="how-magento-turns-layout-into-html/">
    <strong>8. Layout to HTML</strong>
    <span>Magento combines layout XML, blocks, and templates into visible page parts.</span>
  </a>
  <a class="lesson-card" href="where-does-page-data-live/">
    <strong>9. Page data</strong>
    <span>Magento reads saved facts to build pages.</span>
  </a>
  <a class="lesson-card" href="what-are-product-attributes/">
    <strong>10. Product attributes</strong>
    <span>Magento stores product facts as named attributes and values.</span>
  </a>
  <a class="lesson-card" href="why-does-cache-exist/">
    <strong>11. Cache</strong>
    <span>Safe repeated work can be reused.</span>
  </a>
  <a class="lesson-card" href="what-is-php-fpm/">
    <strong>12. PHP-FPM</strong>
    <span>PHP workers run Magento code.</span>
  </a>
  <a class="lesson-card" href="what-is-nginx/">
    <strong>13. nginx</strong>
    <span>A common web server in Magento setups.</span>
  </a>
  <a class="lesson-card" href="what-is-mysql/">
    <strong>14. MySQL</strong>
    <span>The durable store data lives here.</span>
  </a>
  <a class="lesson-card" href="what-is-redis/">
    <strong>15. Redis</strong>
    <span>Fast cache and session data live here.</span>
  </a>
</div>

[Start with Lesson 1](when-you-open-a-website-who-is-talking.md){ .lesson-link }

[Open the Field Guide](field-guide/index.md){ .lesson-link }

## Runtime deep dives

Use these after the short lessons when a referenced concept needs a real mental model.

<div class="lesson-map">
  <a class="lesson-card" href="deep-dives/how-php-runs-one-request/">
    <strong>How PHP runs one request</strong>
    <span>Follow one Magento page load through PHP execution, autoloading, bootstrap, data reads, and output.</span>
  </a>
  <a class="lesson-card" href="deep-dives/how-php-fpm-workers-handle-magento/">
    <strong>How PHP-FPM workers handle Magento</strong>
    <span>See the worker pool behind nginx and why busy workers cause slow pages or gateway errors.</span>
  </a>
</div>

## On-the-job guides

Use these when you are on a real server and need proof before changing anything.

<div class="lesson-map">
  <a class="lesson-card" href="field-guide/find-php-version-and-errors/">
    <strong>Find PHP version and errors</strong>
    <span>Prove CLI PHP, web PHP, Magento logs, PHP logs, and why they may differ.</span>
  </a>
  <a class="lesson-card" href="field-guide/check-php-fpm-pool-and-slow-log/">
    <strong>Check PHP-FPM pool and slow log</strong>
    <span>Trace nginx to the correct pool, socket, worker limits, error log, and slow log.</span>
  </a>
</div>
