# Field Guide

Commands for real debugging work.

Lessons explain the mental model. Field Guide pages answer: "What do I type, what does it mean, and what can go wrong?"

## How this section is organized

Use the Field Guide in three ways:

- **Onboarding**: build a map of an unknown server before changing anything.
- **Tracing**: follow a URL, template, or visible value back to its source.
- **Runtime diagnostics**: prove which PHP, PHP-FPM, database, cache, or web-server layer is active.
- **Troubleshooting**: start from a visible symptom and follow evidence.
- **Command cheatsheets**: learn one command family well enough to adapt it.

## Recommended path on an unknown server

Use this route when you get SSH access and do not know the project yet:

1. [First 30 minutes on a new server](first-30-minutes-new-magento-server.md){ .lesson-link }
2. [Find the Magento root](find-magento-root.md){ .lesson-link }
3. [Find the site config](find-site-config.md){ .lesson-link }
4. [Map running services](map-running-services.md){ .lesson-link }
5. [Find Magento logs](find-magento-logs.md){ .lesson-link }
6. [Find nginx logs](find-nginx-logs.md){ .lesson-link }

The goal is to build a server map before changing anything.

## Onboarding

<div class="lesson-map">
  <a class="lesson-card" href="first-30-minutes-new-magento-server/">
    <strong>First 30 minutes on a new server</strong>
    <span>A realistic first walkthrough from SSH login to server map.</span>
  </a>
  <a class="lesson-card" href="onboard-new-magento-server/">
    <strong>Onboard a new Magento server</strong>
    <span>The first safe pass when you do not know the server yet.</span>
  </a>
  <a class="lesson-card" href="find-magento-root/">
    <strong>Find the Magento root</strong>
    <span>Locate the folder that contains the real application.</span>
  </a>
  <a class="lesson-card" href="map-running-services/">
    <strong>Map running services</strong>
    <span>See whether nginx, PHP-FPM, MySQL, and Redis are local or remote.</span>
  </a>
  <a class="lesson-card" href="find-site-config/">
    <strong>Find the site config</strong>
    <span>Trace a domain to its nginx root and PHP-FPM socket.</span>
  </a>
</div>

## Trace Magento Code

Use these when the page loads, but you need to know which Magento code owns a URL or visible page part.

<div class="lesson-map">
  <a class="lesson-card" href="find-which-magento-code-handles-url/">
    <strong>Find which Magento code handles a URL</strong>
    <span>Trace a visible URL to route, controller, action, and layout handle.</span>
  </a>
  <a class="lesson-card" href="find-which-template-renders-page-part/">
    <strong>Find which template renders a page part</strong>
    <span>Trace visible HTML back to layout XML, block class, and PHTML template.</span>
  </a>
</div>

## Trace Magento Data

Use these when a page displays a value and you need to prove where that value comes from.

<div class="lesson-map">
  <a class="lesson-card" href="trace-storefront-value-to-source/">
    <strong>Trace a storefront value to its source</strong>
    <span>Follow a visible product value back to attribute, database row, option label, or config.</span>
  </a>
</div>

## Runtime Diagnostics

Use these when a lesson mentions PHP, PHP-FPM, nginx, MySQL, or Redis and you need to prove what the real server is doing.

<div class="lesson-map">
  <a class="lesson-card" href="find-php-version-and-errors/">
    <strong>Find PHP version and errors</strong>
    <span>Prove CLI PHP, web PHP-FPM, config files, Magento logs, PHP logs, and report files.</span>
  </a>
  <a class="lesson-card" href="check-php-fpm-pool-and-slow-log/">
    <strong>Check PHP-FPM pool and slow log</strong>
    <span>Trace nginx to the live PHP-FPM pool, socket, worker limits, and slow request evidence.</span>
  </a>
</div>

## Troubleshooting

<div class="lesson-map">
  <a class="lesson-card" href="product-page-shows-500/">
    <strong>Product page shows 500</strong>
    <span>Follow the clues from browser symptom to Magento exception.</span>
  </a>
  <a class="lesson-card" href="502-bad-gateway/">
    <strong>502 Bad Gateway</strong>
    <span>Check the handoff between nginx and PHP-FPM.</span>
  </a>
</div>

## Command Cheatsheets

<div class="lesson-map">
  <a class="lesson-card" href="clear-magento-cache/">
    <strong>Clear Magento cache</strong>
    <span>When a page or config change looks stale.</span>
  </a>
  <a class="lesson-card" href="find-magento-logs/">
    <strong>Find Magento logs</strong>
    <span>Where Magento writes application errors.</span>
  </a>
  <a class="lesson-card" href="find-nginx-logs/">
    <strong>Find nginx logs</strong>
    <span>Where the web server writes request and error clues.</span>
  </a>
  <a class="lesson-card" href="check-php-fpm/">
    <strong>Check PHP-FPM</strong>
    <span>See whether PHP workers are running or failing.</span>
  </a>
  <a class="lesson-card" href="search-files-on-server/">
    <strong>Search files on a server</strong>
    <span>Find config, logs, code, and text quickly.</span>
  </a>
  <a class="lesson-card" href="check-mysql/">
    <strong>Check MySQL</strong>
    <span>Confirm the database can answer.</span>
  </a>
  <a class="lesson-card" href="check-redis/">
    <strong>Check Redis</strong>
    <span>Confirm cache/session storage can answer.</span>
  </a>
</div>

## How to use these pages

Run commands from the project root unless the page says otherwise.

For Magento, project root means the folder that contains `bin/magento`.

Use read-only checks first. Use clearing/restarting commands only when you understand what layer you are touching.

Start with the onboarding pages when you join an existing project and do not yet know the server layout.

When a page gives an example output, read the interpretation before deciding what to run next.
