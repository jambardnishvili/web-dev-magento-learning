# First 30 Minutes on a New Magento Server

This is a realistic first walkthrough after you receive SSH access to an unfamiliar Magento server.

The aim is to leave with a working map, not to fix something immediately.

## Safety rule

For the first 30 minutes, use read-only commands.

Do not:

- restart services
- clear cache
- edit files
- run deployments
- change permissions
- delete generated files

First understand the machine.

## Minute 0-5: identify the server

```bash
whoami
hostname
pwd
date
uname -a
```

Example output:

```text
deploy
prod-web-02
/home/deploy
Sun Apr 26 16:20:10 UTC 2026
Linux prod-web-02 6.1.0 ...
```

Interpretation:

- user is `deploy`, so this may be a deployment user
- hostname suggests production web server number 2
- timezone is UTC, important for reading logs

Write this down:

```text
ssh user: deploy
host: prod-web-02
timezone: UTC
starting folder: /home/deploy
```

## Minute 5-10: find what web server is active

```bash
ps aux | egrep 'nginx|apache|httpd|php-fpm' | grep -v egrep
```

Example:

```text
root      1010  nginx: master process /usr/sbin/nginx
www-data  1011  nginx: worker process
root      2200  php-fpm: master process
www-data  2201  php-fpm: pool www
```

Interpretation:

- nginx receives web requests
- PHP-FPM runs PHP code
- this is probably a web node

If you see no web server process, you may be on a database, queue, build, or admin server.

## Minute 10-15: prove the live Magento root

If you know the domain, search active web config for it.

nginx:

```bash
sudo nginx -T 2>/dev/null | grep -n -A20 -B5 "server_name .*shop.example.com"
```

Without sudo:

```bash
grep -R "shop.example.com" /etc/nginx 2>/dev/null
```

Apache:

```bash
sudo apachectl -S
grep -R "shop.example.com" /etc/apache2 /etc/httpd 2>/dev/null
```

Example nginx config:

```nginx
server_name shop.example.com;
root /srv/clients/acme/current/pub;
fastcgi_pass unix:/run/php/php8.2-fpm.sock;
```

Interpretation:

- live document root is `/srv/clients/acme/current/pub`
- Magento root is `/srv/clients/acme/current`
- PHP requests go to `/run/php/php8.2-fpm.sock`

Confirm marker files:

```bash
cd /srv/clients/acme/current
ls -la bin/magento app/etc/env.php pub vendor 2>/dev/null
bin/magento --version
```

This is proof-based. It does not depend on guessing common folders.

If you cannot read web config, use this page:

[Find the Magento root](find-magento-root.md){ .lesson-link }

## Minute 15-20: identify database, Redis, and session storage

From Magento root:

```bash
php -r '$c = include "app/etc/env.php"; print_r($c["db"]["connection"]["default"] ?? []);'
php -r '$c = include "app/etc/env.php"; print_r($c["cache"]["frontend"]["default"]["backend_options"] ?? []);'
php -r '$c = include "app/etc/env.php"; print_r($c["session"] ?? []);'
```

Example:

```text
[host] => db.internal
[dbname] => magento_prod
[server] => redis.internal
[port] => 6379
```

Interpretation:

- database is probably remote
- Redis is probably remote
- this web server may only run nginx and PHP-FPM

Do not copy real passwords into notes or screenshots.

Record only safe facts:

```text
db host: db.internal
db name: magento_prod
redis host: redis.internal:6379
```

## Minute 20-25: find logs

Magento logs:

```bash
tail -n 80 var/log/system.log
tail -n 80 var/log/exception.log
tail -n 80 var/log/debug.log
```

nginx logs:

```bash
sudo tail -n 80 /var/log/nginx/error.log
sudo tail -n 80 /var/log/nginx/access.log
```

If permission is denied, record that:

```text
cannot read nginx logs as deploy user
needs sudo or hosting panel access
```

This is not a failure. It is part of the server map.

## Minute 25-30: create the handover map

Write a short map like this:

```text
host: prod-web-02
role: web node
ssh user: deploy
web server: nginx
php runner: php-fpm via /run/php/php8.2-fpm.sock
live domain: shop.example.com
document root: /srv/clients/acme/current/pub
magento root: /srv/clients/acme/current
deploy style: current symlink to releases folder
database: db.internal / magento_prod
redis: redis.internal:6379
magento logs: /srv/clients/acme/current/var/log
nginx logs: /var/log/nginx, needs sudo
unknowns: search service, queue service, deployment command
```

This is the useful outcome of the first session.

## Concepts behind this

[When you open a website, who is talking?](../when-you-open-a-website-who-is-talking.md){ .lesson-link }
[What does the web server do?](../what-does-the-web-server-do.md){ .lesson-link }
[Where does PHP fit?](../where-does-php-fit.md){ .lesson-link }
[Where does Magento fit?](../where-does-magento-fit.md){ .lesson-link }

## What to do next

After you have the map, choose the next page based on the problem:

- stale page or config: [Clear Magento cache](clear-magento-cache.md){ .lesson-link }
- Magento exception: [Find Magento logs](find-magento-logs.md){ .lesson-link }
- 404, 502, or 504: [Find nginx logs](find-nginx-logs.md){ .lesson-link }
- PHP worker problem: [Check PHP-FPM](check-php-fpm.md){ .lesson-link }
- database problem: [Check MySQL](check-mysql.md){ .lesson-link }
- cache/session problem: [Check Redis](check-redis.md){ .lesson-link }

## Common mistake

Do not start by running the command you remember.

Start by proving which server, which root, which service, and which logs are relevant.

## Related pages

[Find the Magento root](find-magento-root.md){ .lesson-link }
[Find the site config](find-site-config.md){ .lesson-link }
[Map running services](map-running-services.md){ .lesson-link }
