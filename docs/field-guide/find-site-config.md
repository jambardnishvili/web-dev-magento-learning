# Find the Site Config

This page helps you trace a public domain to the code folder and PHP-FPM service that handles it.

For a Magento site behind nginx, the important chain is usually:

```text
domain -> nginx server block -> root .../pub -> PHP-FPM socket or port -> Magento root
```

## Safety level

Read-only.

These commands inspect nginx config and process lists. They do not reload nginx, restart PHP-FPM, or change code.

## Find nginx server names

```bash
grep -R "server_name" /etc/nginx 2>/dev/null
```

Command anatomy:

- `grep` searches text.
- `-R` searches folders recursively.
- `"server_name"` is the nginx directive that lists domains.
- `/etc/nginx` is the common nginx config folder.
- `2>/dev/null` hides permission errors.

Example:

```text
/etc/nginx/sites-enabled/shop.conf:    server_name shop.example.com www.shop.example.com;
```

This tells you which config file probably owns the domain.

## Open the matching config

```bash
sed -n '1,220p' /etc/nginx/sites-enabled/shop.conf
```

Look for:

```nginx
server_name shop.example.com;
root /srv/clients/acme/current/pub;
fastcgi_pass unix:/run/php/php8.2-fpm.sock;
```

What this means:

- `server_name` says which domain this block answers for.
- `root` should point at Magento's `pub` folder.
- `fastcgi_pass` says where nginx sends PHP requests.

Magento root is the `root` value without `/pub`:

```text
/srv/clients/acme/current
```

## If config is split into includes

nginx files often include other files:

```nginx
include /etc/nginx/snippets/fastcgi-php.conf;
include /srv/clients/acme/current/nginx.conf.sample;
```

Read included files too:

```bash
sed -n '1,220p' /etc/nginx/snippets/fastcgi-php.conf
sed -n '1,220p' /srv/clients/acme/current/nginx.conf.sample
```

This is where PHP routing rules may live.

## Check active nginx config

```bash
sudo nginx -T | less
```

Then search inside `less`:

```text
/shop.example.com
/root
/fastcgi_pass
```

`nginx -T` prints the full loaded config, including included files.

Use it when `sites-enabled` does not tell the whole story.

## If you only know the domain

Search all nginx config:

```bash
grep -R "shop.example.com" /etc/nginx 2>/dev/null
```

Then inspect the matching file.

## If nginx is not on this server

If `/etc/nginx` does not exist and no nginx process is running, this may not be the web server.

Check:

```bash
hostname
ps aux | egrep 'nginx|apache|httpd|php-fpm' | grep -v egrep
```

You may be on a database, queue, build, or admin server instead.

## Mini exercise

You find this:

```nginx
server_name shop.example.com;
root /srv/shop/current/pub;
fastcgi_pass unix:/run/php/php8.2-fpm.sock;
```

What do you know?

```text
domain: shop.example.com
document root: /srv/shop/current/pub
Magento root: /srv/shop/current
PHP-FPM target: /run/php/php8.2-fpm.sock
```

The key is not the folder name. The key is the active config.

## Common mistake

Do not assume `/var/www/html` is live.

The live path is the one referenced by the active web server config.

## Related pages

[Find the Magento root](find-magento-root.md){ .lesson-link }
[Find nginx logs](find-nginx-logs.md){ .lesson-link }
[Map running services](map-running-services.md){ .lesson-link }

## Concepts behind this

[What does the web server do?](../what-does-the-web-server-do.md){ .lesson-link }
[What is nginx?](../what-is-nginx.md){ .lesson-link }
[What is PHP-FPM?](../what-is-php-fpm.md){ .lesson-link }
