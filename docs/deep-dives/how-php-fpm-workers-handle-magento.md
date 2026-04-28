# How PHP-FPM Workers Handle Magento

<div class="worker-pool-scene">
  <div class="worker-pool-scene__nginx">
    <div class="worker-pool-scene__label">nginx</div>
    <strong>Dynamic page request</strong>
    <span>nginx receives the browser request, then sends PHP work through FastCGI.</span>
    <code>fastcgi_pass unix:/run/php/php8.2-fpm.sock</code>
  </div>

  <div class="worker-pool-scene__traffic">
    <div class="worker-pool-scene__rail"></div>
    <div class="worker-pool-scene__chip worker-pool-scene__chip--one">GET /product</div>
    <div class="worker-pool-scene__chip worker-pool-scene__chip--two">GET /cart</div>
    <div class="worker-pool-scene__chip worker-pool-scene__chip--wait">waits if pool is full</div>
  </div>

  <div class="worker-pool-scene__pool">
    <div class="worker-pool-scene__master">
      <strong>PHP-FPM master</strong>
      <span>Starts and supervises a pool of PHP workers.</span>
    </div>
    <div class="worker-pool-scene__workers">
      <div class="worker-pool-scene__worker worker-pool-scene__worker--busy">
        <b>Worker 1</b>
        <span>running Magento</span>
        <i></i>
      </div>
      <div class="worker-pool-scene__worker worker-pool-scene__worker--active">
        <b>Worker 2</b>
        <span>takes next request</span>
        <i></i>
      </div>
      <div class="worker-pool-scene__worker worker-pool-scene__worker--idle">
        <b>Worker 3</b>
        <span>idle, ready</span>
        <i></i>
      </div>
    </div>
    <div class="worker-pool-scene__signals">
      <span>slow log shows long requests</span>
      <span><code>pm.max_children</code> limits workers</span>
      <span>socket/port must match nginx</span>
    </div>
  </div>
</div>

## Watch the visual first

Watch what happens when several dynamic requests arrive.

1. nginx receives browser requests.
2. For PHP pages, nginx forwards each request to PHP-FPM using FastCGI.
3. PHP-FPM gives each request to an available worker.
4. A worker usually handles one request at a time.
5. If all workers are busy, new requests wait until a worker becomes free.
6. If the wait is too long or the socket is broken, users may see slow pages, `502`, or `504` errors.

What changed from the short PHP-FPM lesson: PHP-FPM is not one worker. It is a manager plus a pool of workers, and pool pressure changes how the site behaves.

## The short story

PHP-FPM keeps PHP workers ready for nginx.

The master process manages the pool. The worker processes run Magento requests. The pool has limits, so a busy store can run out of available workers. When that happens, requests do not magically run faster; they wait, time out, or fail depending on configuration and load.

## What actually matters

- **Pool name**: a server may have separate pools per site, per PHP version, or per user.
- **Listen target**: nginx must send requests to the same socket or TCP port that PHP-FPM is listening on.
- **Worker count**: `pm.max_children` limits how many PHP requests can run at the same time in that pool.
- **Request duration**: slow Magento code keeps a worker busy longer, which reduces available capacity.
- **Logs**: PHP-FPM service logs show process problems; PHP error logs show PHP errors; slow logs show long-running request paths when enabled.

## What you should notice

<div class="conversation-scene__notes">
  <div class="conversation-scene__note">
    <strong>A busy worker is not broken</strong>
    <span>It may simply be spending too long inside Magento, database calls, cache calls, or external APIs.</span>
  </div>
  <div class="conversation-scene__note">
    <strong>More workers are not always safer</strong>
    <span>Increasing worker count can overload CPU, memory, MySQL, Redis, or Elasticsearch/OpenSearch.</span>
  </div>
  <div class="conversation-scene__note">
    <strong>The socket is the handoff point</strong>
    <span>If nginx points to the wrong socket or PHP-FPM is down, dynamic pages fail before Magento can help.</span>
  </div>
</div>

## Common confusion

Do not treat every `502` as a Magento exception.

A `500` often means Magento or PHP code returned an application error. A `502` often means nginx could not get a valid response from the upstream PHP-FPM target. You still verify with logs, but the starting layer is different.

## Check yourself

- What receives the browser request first: nginx or PHP-FPM?
- What does `pm.max_children` limit?
- If every PHP-FPM worker is busy for 30 seconds, what happens to the next PHP request?

You should now understand that PHP-FPM is a worker pool, and Magento performance depends on how quickly those workers finish requests.

## Use this in real work

Use this when a Magento site is slow, intermittently returns `502`, or behaves differently under traffic. First prove whether PHP-FPM is alive, which pool the site uses, whether nginx points to the right socket, and whether slow requests are tying up workers.

[Field guide: check PHP-FPM pool and slow log](../field-guide/check-php-fpm-pool-and-slow-log.md){ .lesson-link }
[Field guide: 502 Bad Gateway](../field-guide/502-bad-gateway.md){ .lesson-link }
[Field guide: find site config](../field-guide/find-site-config.md){ .lesson-link }

[Back to all lessons](../index.md){ .next-lesson }
