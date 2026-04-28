# Onboard a New Magento Server

This is the first safe pass when you get SSH access to a server and nobody has explained the layout yet.

The goal is not to change anything. The goal is to build a quick map:

- which user you are logged in as
- where the Magento project lives
- which services are involved
- where logs and config files are likely to be
- whether this is a single-server setup or part of a larger stack

## Guided scenario

Imagine you have only this:

```text
ssh deploy@prod-web-02
domain: shop.example.com
```

You do not know the folder layout, hosting style, PHP version, database host, Redis host, or log permissions.

Your job is not to fix anything yet. Your job is to answer these questions with evidence:

- Which machine am I on?
- Which web server receives the domain?
- Which folder is the live Magento root?
- Which PHP-FPM target receives PHP requests?
- Are MySQL and Redis local or remote?
- Which logs can I read with this user?

This page is the slower version of the same path:

[First 30 minutes on a new server](first-30-minutes-new-magento-server.md){ .lesson-link }

## Rule for the first pass

Do not restart services, clear cache, edit files, or run deployments yet.

First collect facts.

## 1. Where am I?

```bash
pwd
whoami
hostname
date
```

What this tells you:

- `pwd` shows your current folder.
- `whoami` shows the Linux user you are using.
- `hostname` helps confirm which machine you are on.
- `date` helps spot timezone surprises when reading logs.

Example:

```text
/home/magento
magento
prod-web-01
Sun Apr 26 16:20:10 UTC 2026
```

This suggests you are on a production web server, logged in as a Magento-related user.

## 2. What folders look important?

```bash
ls -la
ls -la /var/www
ls -la /home
```

These locations can be hints:

- `/var/www/html`
- `/var/www/magento`
- `/home/magento/current`
- `/home/deploy/current`
- `/srv/www/site/current`

Do not treat any of them as proof.

If you see a `current` folder, it may mean releases are deployed into timestamped folders and `current` points to the active one. It still might be old, staging, or unused.

Proof comes later from active web server config, container config, hosting panel config, or deployment documentation.

## 3. Can I find Magento?

```bash
find /var/www /home /srv -maxdepth 4 -name bin -type d 2>/dev/null
```

Command anatomy:

- `find` searches folders.
- `/var/www /home /srv` are starting points, not assumptions.
- `-maxdepth 4` avoids an extremely deep search.
- `-name bin -type d` looks for folders named `bin`.
- `2>/dev/null` hides permission errors.

Then check likely matches:

```bash
ls -la /path/from/find/bin/magento
```

You found Magento root when this exists:

```text
bin/magento
app/etc/env.php
vendor/
pub/
generated/
var/
```

Use the dedicated page when this is not obvious:

[Find the Magento root](find-magento-root.md){ .lesson-link }

## 4. What services are running?

```bash
ps aux | egrep 'nginx|php-fpm|mysql|mariadb|redis|varnish|elasticsearch|opensearch' | grep -v egrep
```

What to look for:

- `nginx` means this server probably receives HTTP requests.
- `php-fpm` means PHP work may run locally.
- `mysql` or `mariadb` means the database may be local.
- `redis-server` means cache or sessions may be local.
- `varnish` means full-page cache may sit in front of Magento.
- `opensearch` or `elasticsearch` means search may run locally.

Use the dedicated page for a cleaner checklist:

[Map running services](map-running-services.md){ .lesson-link }

## 5. Which domain points to this code?

```bash
grep -R "server_name" /etc/nginx 2>/dev/null
grep -R "root " /etc/nginx 2>/dev/null
grep -R "fastcgi_pass" /etc/nginx 2>/dev/null
```

You are looking for a connection like:

```text
server_name shop.example.com;
root /home/magento/current/pub;
fastcgi_pass unix:/run/php/php8.2-fpm.sock;
```

This tells you:

- the domain is `shop.example.com`
- the web root is Magento's `pub` folder
- nginx sends PHP requests to PHP-FPM

This is the strongest moment in the onboarding flow: it connects the public domain to a real folder and a real PHP runner.

Use the dedicated page when nginx config is unfamiliar:

[Find the site config](find-site-config.md){ .lesson-link }

## 6. What Magento environment is this?

Run this from Magento root:

```bash
bin/magento deploy:mode:show
bin/magento --version
```

Then read environment config carefully:

```bash
php -r '$c = include "app/etc/env.php"; echo $c["backend"]["frontName"] ?? "no admin frontName", PHP_EOL;'
php -r '$c = include "app/etc/env.php"; print_r($c["db"]["connection"]["default"] ?? []);'
```

What this tells you:

- Magento mode: usually `production` on real servers.
- Magento version.
- Admin URL front name.
- Database host and name.

Do not paste real secrets into chat, tickets, or screenshots.

## 7. Where should I look when something is broken?

Start with:

```bash
tail -n 80 var/log/system.log
tail -n 80 var/log/exception.log
tail -n 80 var/log/debug.log
```

Then check web server logs:

```bash
sudo tail -n 80 /var/log/nginx/error.log
sudo tail -n 80 /var/log/nginx/access.log
```

If `sudo` is not allowed, that is also useful information: you may need the hosting provider, sysadmin, or a higher-privilege user.

## What good onboarding notes look like

Good notes are short and evidence-based:

```text
domain shop.example.com is in /etc/nginx/sites-enabled/shop.conf
nginx root is /srv/clients/acme/current/pub
Magento root is /srv/clients/acme/current
PHP target is unix:/run/php/php8.2-fpm.sock
DB host from env.php is db.internal
Redis host from env.php is redis.internal
deploy user can read Magento logs but not nginx logs
```

Bad notes are guesses:

```text
Magento is probably in /var/www/html
Maybe PHP is 8.2
Looks like Redis is local
```

## Common mistake

Do not assume the first Magento folder you find is the live one.

Servers often contain old releases, backups, staging copies, or failed deployments. Confirm the live root through nginx config or the active deploy symlink.

## Related pages

[First 30 minutes on a new server](first-30-minutes-new-magento-server.md){ .lesson-link }
[Find the Magento root](find-magento-root.md){ .lesson-link }
[Map running services](map-running-services.md){ .lesson-link }
[Find the site config](find-site-config.md){ .lesson-link }
[Find Magento logs](find-magento-logs.md){ .lesson-link }

## Concepts behind this

[When you open a website, who is talking?](../when-you-open-a-website-who-is-talking.md){ .lesson-link }
[What does the web server do?](../what-does-the-web-server-do.md){ .lesson-link }
[Where does Magento fit?](../where-does-magento-fit.md){ .lesson-link }
