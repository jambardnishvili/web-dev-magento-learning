# Check PHP-FPM Pool and Slow Log

Use this when PHP-FPM is running, but you need to know which pool handles the site, whether nginx points to it, and whether slow requests are tying up workers.

## Safety level

Read-only.

Do not change pool settings until you have proved which pool is live and captured current symptoms.

## Find the nginx handoff

Start with the domain's active nginx config:

```bash
sudo nginx -T 2>/dev/null | grep -n -E "server_name|root |fastcgi_pass"
```

Look for:

```nginx
root /srv/shop/current/pub;
fastcgi_pass unix:/run/php/php8.2-fpm.sock;
```

This tells you:

- Magento root is probably `/srv/shop/current`.
- nginx sends PHP work to `/run/php/php8.2-fpm.sock`.
- The PHP-FPM pool must listen on that same socket.

## Find PHP-FPM processes

```bash
ps aux | grep '[p]hp-fpm'
```

Example:

```text
root      1201  php-fpm: master process (/etc/php/8.2/fpm/php-fpm.conf)
www-data  1220  php-fpm: pool www
www-data  1221  php-fpm: pool www
```

How to read it:

- `master process` manages workers.
- `pool www` means those worker processes belong to the `www` pool.
- The user column tells you which Linux user runs the PHP code.

## Find pool config files

Common locations:

```bash
sudo find /etc -path "*php*fpm*pool*" -type f 2>/dev/null
sudo find /etc -path "*php*fpm*" -name "*.conf" 2>/dev/null
```

Then search for the socket or port from nginx:

```bash
sudo grep -R "/run/php/php8.2-fpm.sock" /etc 2>/dev/null
sudo grep -R "listen = 127.0.0.1:9000" /etc 2>/dev/null
```

If the paths differ on the server, search for `listen =`:

```bash
sudo grep -R "^[[:space:]]*listen[[:space:]]*=" /etc 2>/dev/null
```

## Read the pool settings that affect capacity

Once you find the pool file:

```bash
sudo grep -n -E "^\[|listen =|user =|group =|pm =|pm.max_children|pm.start_servers|pm.min_spare_servers|pm.max_spare_servers|request_slowlog_timeout|slowlog|php_admin_value\[error_log\]" /path/to/pool.conf
```

Important lines:

- `listen` must match nginx `fastcgi_pass`.
- `user` and `group` tell you who runs Magento PHP code.
- `pm.max_children` is the maximum number of simultaneous PHP requests for this pool.
- `request_slowlog_timeout` controls when PHP-FPM writes slow request traces.
- `slowlog` tells you where those traces are written.
- `php_admin_value[error_log]` can point to PHP error logs.

## Check whether the socket exists

For a Unix socket:

```bash
ls -la /run/php/php8.2-fpm.sock
```

If available:

```bash
sudo ss -lxp | grep php
```

Fallback:

```bash
sudo lsof -U | grep php-fpm
```

How to read it:

- If nginx points to a socket that does not exist, dynamic pages can return `502`.
- If permissions block nginx from using the socket, dynamic pages can return `502`.
- If the socket exists, the failure may be inside PHP, Magento, or a timeout.

## Read slow logs when enabled

If the pool config contains:

```text
request_slowlog_timeout = 10s
slowlog = /var/log/php8.2-fpm/www-slow.log
```

Read recent entries:

```bash
sudo tail -n 120 /var/log/php8.2-fpm/www-slow.log
```

Slow log entries often show which PHP file and call stack was running too long. This helps separate "PHP-FPM is broken" from "Magento code is slow inside a worker."

## Common mistake

Do not increase `pm.max_children` as the first move.

If each Magento request uses a lot of memory, more workers can make the server run out of memory. First prove whether workers are saturated, why requests are slow, and whether MySQL/Redis/search/external APIs are the real bottleneck.

## Related lessons

[How PHP-FPM workers handle Magento](../deep-dives/how-php-fpm-workers-handle-magento.md){ .lesson-link }
[What is PHP-FPM?](../what-is-php-fpm.md){ .lesson-link }
[What is nginx?](../what-is-nginx.md){ .lesson-link }

## Related scenarios

[Check PHP-FPM](check-php-fpm.md){ .lesson-link }
[502 Bad Gateway](502-bad-gateway.md){ .lesson-link }
[Find the site config](find-site-config.md){ .lesson-link }
