# Find nginx Logs

## When to use this

Use this when the browser cannot reach the site, gets a `404`, `403`, `502`, `503`, or static files do not load.

## Safety level

Read-only.

These commands read nginx logs or print nginx config. `sudo` may be required because web server logs are often protected.

## Common log locations

```bash
ls -lah /var/log/nginx
```

Command anatomy:

- `ls` lists files.
- `-lah` shows details, hidden files, and human-readable sizes.
- `/var/log/nginx` is the common nginx log folder.

Example output:

```text
-rw-r----- 1 www-data adm 2.4M Apr 26 16:30 access.log
-rw-r----- 1 www-data adm  85K Apr 26 16:30 error.log
```

How to read it:

- `access.log` records requests nginx handled.
- `error.log` records nginx problems, such as missing files, permission errors, or PHP-FPM handoff failures.

## Watch nginx errors

```bash
sudo tail -f /var/log/nginx/error.log
```

Command anatomy:

- `sudo` runs the command with higher permission.
- `tail -f` watches new lines as they appear.
- `error.log` is usually where nginx explains why it could not serve a request.

Example output:

```text
connect() to unix:/run/php/php8.2-fpm.sock failed (111: Connection refused) while connecting to upstream
```

How to read it:

- nginx received the browser request.
- nginx tried to pass PHP work to PHP-FPM.
- PHP-FPM did not accept the connection, so the next check is PHP-FPM.

## Watch nginx requests

```bash
sudo tail -f /var/log/nginx/access.log
```

## Find configured log paths

```bash
sudo nginx -T | grep -i "access_log\\|error_log"
```

## Check nginx config syntax

```bash
sudo nginx -t
```

## Common mistake

Only checking Magento logs for a problem that never reached Magento.

If nginx returns `502`, the issue may be the nginx-to-PHP-FPM handoff.

## Related lessons

- [What does the web server do?](../what-does-the-web-server-do.md)
- [What is nginx?](../what-is-nginx.md)

## Related scenarios

[502 Bad Gateway](502-bad-gateway.md){ .lesson-link }
[Product page shows 500](product-page-shows-500.md){ .lesson-link }
