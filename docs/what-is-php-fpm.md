# What Is PHP-FPM?

<div class="message-scene">
  <div class="message-scene__panel message-scene__panel--browser">
    <div class="message-scene__label">Web server</div>
    <div class="message-scene__card">
      <strong>Cannot run PHP itself</strong>
      <span>The web server receives the request, then hands PHP work to a PHP worker.</span>
      <code>GET /product</code>
      <div class="message-scene__subtext">"This page needs backend code."</div>
    </div>
  </div>

  <div class="message-scene__track">
    <div class="message-scene__rail"></div>
    <div class="message-scene__chip message-scene__chip--request">Run PHP</div>
    <div class="message-scene__chip message-scene__chip--response">PHP output</div>
  </div>

  <div class="message-scene__panel message-scene__panel--server">
    <div class="message-scene__label">PHP-FPM</div>
    <div class="message-scene__card message-scene__card--response">
      <strong>Runs PHP workers</strong>
      <span>PHP-FPM keeps PHP processes ready so PHP applications can handle requests.</span>
      <code>worker process</code>
      <div class="message-scene__subtext">"I ran Magento and produced output."</div>
    </div>
  </div>
</div>

## Watch the visual first

Focus on the handoff from the web server to PHP-FPM.

1. The web server receives a request that needs PHP.
2. The web server cannot run Magento PHP code by itself.
3. It sends the PHP work to PHP-FPM.
4. PHP-FPM gives the work to a PHP worker.
5. The PHP worker runs Magento and returns output.

What changed on screen: PHP-FPM appears as the process manager that actually runs PHP workers.

## The short story

PHP-FPM is the program that runs PHP code for the web server.

The browser does not talk to PHP-FPM directly. The web server receives the request first. If the request needs PHP, the web server passes the work to PHP-FPM. PHP-FPM gives the request to a PHP worker process. That worker runs the PHP application, such as Magento.

## What you should notice

<div class="conversation-scene__notes">
  <div class="conversation-scene__note">
    <strong>PHP-FPM is a runner</strong>
    <span>It is not Magento. It is what runs Magento's PHP code.</span>
  </div>
  <div class="conversation-scene__note">
    <strong>Workers can be busy</strong>
    <span>If all workers are occupied, new PHP requests may wait.</span>
  </div>
  <div class="conversation-scene__note">
    <strong>The handoff matters</strong>
    <span>A broken web-server-to-PHP-FPM connection can stop dynamic pages.</span>
  </div>
</div>

## Common confusion

PHP-FPM is not a database, not a web server, and not Magento. It is the PHP process manager sitting between the web server and PHP application code.

## What we are still leaving out

We are not tuning worker counts or configuration yet. For now, remember the role: the web server receives the request, PHP-FPM runs PHP code, and Magento is the PHP application being run.

## Check yourself

- Does the browser talk directly to PHP-FPM?
- Is PHP-FPM the same thing as Magento?
- If nginx cannot connect to the PHP-FPM socket, can dynamic Magento pages run?

You should now understand that PHP-FPM is the runner layer between the web server and Magento's PHP code.

## Use this in real work

Use this when nginx is working but PHP does not answer. `502 Bad Gateway` often means the handoff from nginx to PHP-FPM broke.

[Field guide: check PHP-FPM](field-guide/check-php-fpm.md){ .lesson-link }
[Field guide: 502 Bad Gateway](field-guide/502-bad-gateway.md){ .lesson-link }
[Field guide: find the site config](field-guide/find-site-config.md){ .lesson-link }

[Next: What is nginx?](what-is-nginx.md){ .next-lesson }
