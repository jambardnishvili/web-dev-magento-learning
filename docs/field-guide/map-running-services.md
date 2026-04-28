# Map Running Services

This page helps you answer: "What parts of the stack are on this server?"

Magento may use one server, or it may be split across web, database, cache, search, and queue machines.

## Start with process names

```bash
ps aux | egrep 'nginx|apache|httpd|php-fpm|mysql|mariadb|redis|varnish|opensearch|elasticsearch|rabbitmq' | grep -v egrep
```

How to read it:

- `nginx`, `apache`, or `httpd`: web server is running here.
- `php-fpm`: PHP workers are running here.
- `mysql` or `mariadb`: database may be local.
- `redis-server`: Redis may be local.
- `varnish`: full-page cache may be in front of Magento.
- `opensearch` or `elasticsearch`: search may be local.
- `rabbitmq`: message queue may be local.

## Check systemd service names

```bash
systemctl --type=service --state=running | egrep 'nginx|apache|php|mysql|mariadb|redis|varnish|opensearch|elasticsearch|rabbitmq'
```

This is cleaner than `ps` when systemd is available.

If the command says `systemctl: command not found`, the server may use a different init system or a container image.

## Check listening ports

```bash
sudo ss -lntp
```

Useful ports:

```text
80    HTTP
443   HTTPS
3306  MySQL or MariaDB
6379  Redis
6081  Varnish
9200  Elasticsearch or OpenSearch
5672  RabbitMQ
```

If `sudo` is unavailable:

```bash
ss -lnt
```

You will lose process names, but ports are still useful.

## Compare services with Magento config

From Magento root:

```bash
php -r '$c = include "app/etc/env.php"; print_r($c["db"]["connection"]["default"] ?? []);'
php -r '$c = include "app/etc/env.php"; print_r($c["cache"]["frontend"]["default"]["backend_options"] ?? []);'
php -r '$c = include "app/etc/env.php"; print_r($c["session"] ?? []);'
```

What to look for:

- Database `host`
- Redis `server`
- Session storage
- Cache backend

Example:

```text
[host] => db.internal
[dbname] => magento_prod
```

That means MySQL is probably not local, even if the web server is.

## Draw a quick map

Write a rough note like this:

```text
web:     prod-web-01, nginx + php-fpm
db:      db.internal:3306
cache:   redis.internal:6379
search:  opensearch.internal:9200
logs:    var/log + /var/log/nginx
root:    /home/magento/current
```

This is often more useful than a perfect architecture diagram.

## Common mistake

Do not assume "not running locally" means "not used".

The database, Redis, and search service are often remote.

## Related pages

[Onboard a new Magento server](onboard-new-magento-server.md){ .lesson-link }
[Find the Magento root](find-magento-root.md){ .lesson-link }
[Check MySQL](check-mysql.md){ .lesson-link }
[Check Redis](check-redis.md){ .lesson-link }

## Concepts behind this

[What does the web server do?](../what-does-the-web-server-do.md){ .lesson-link }
[What is PHP-FPM?](../what-is-php-fpm.md){ .lesson-link }
[What is MySQL?](../what-is-mysql.md){ .lesson-link }
[What is Redis?](../what-is-redis.md){ .lesson-link }
