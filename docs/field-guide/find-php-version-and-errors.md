# Find PHP Version and Errors

Use this when you need to know which PHP is running, where PHP reads config from, and where request errors are being written.

## Safety level

Read-only.

These checks do not restart services or change code. They only inspect binaries, config, and logs.

## Start from the Magento root

First move to the folder that contains `bin/magento`:

```bash
pwd
ls -la bin/magento app/etc/env.php
```

If those files are not present, find the Magento root first.

[Find the Magento root](find-magento-root.md){ .lesson-link }

## Check CLI PHP

```bash
which php
php -v
php -i | grep -E "Loaded Configuration File|Scan this dir"
```

Command anatomy:

- `which php` shows the PHP binary your shell will run.
- `php -v` shows the CLI PHP version.
- `php -i` prints PHP configuration.
- `grep -E` filters the long config output down to useful lines.

Example:

```text
/usr/bin/php
PHP 8.2.18 (cli)
Loaded Configuration File => /etc/php/8.2/cli/php.ini
Scan this dir for additional .ini files => /etc/php/8.2/cli/conf.d
```

This proves CLI PHP. It does not always prove the web PHP version.

## Check Magento can run with that PHP

```bash
php bin/magento --version
```

If memory is too low for CLI commands:

```bash
php -d memory_limit=-1 bin/magento --version
```

How to read it:

- If this works, CLI PHP can at least bootstrap Magento.
- If this fails with a PHP fatal error, read the exact error before changing anything.
- If this works but the browser fails, web PHP-FPM may be using different PHP config or a different user.

## Prove the web PHP target

Find the active nginx config for the domain and look for `fastcgi_pass`:

```bash
sudo nginx -T 2>/dev/null | grep -n -E "server_name|root |fastcgi_pass"
```

Examples:

```nginx
fastcgi_pass unix:/run/php/php8.2-fpm.sock;
fastcgi_pass 127.0.0.1:9000;
```

What this tells you:

- A socket path like `/run/php/php8.2-fpm.sock` usually points to a PHP-FPM pool and version.
- A TCP port like `127.0.0.1:9000` means you need to find which PHP-FPM process listens on that port.
- The PHP used by nginx can differ from the PHP used by your shell.

## Find PHP errors in Magento first

From Magento root:

```bash
tail -n 80 var/log/system.log
tail -n 80 var/log/exception.log
find var/report -type f -mtime -2 -maxdepth 1 -print
```

How to read it:

- `system.log` often contains warnings and application-level errors.
- `exception.log` usually contains stack traces.
- `var/report` contains report files for some frontend error pages.

If `var/report` has files:

```bash
sed -n '1,180p' var/report/REPORT_ID
```

Replace `REPORT_ID` with the real filename.

## Find PHP-FPM logs

Service logs:

```bash
journalctl -u php-fpm -n 100 --no-pager
journalctl -u php8.2-fpm -n 100 --no-pager
journalctl -u php8.3-fpm -n 100 --no-pager
```

Common file log searches:

```bash
sudo find /var/log -iname "*php*fpm*" -o -iname "*php*error*"
```

If you find a likely log:

```bash
sudo tail -n 100 /path/to/php-fpm.log
```

## Be careful with phpinfo

`phpinfo()` can prove the web PHP version and loaded config, but it exposes sensitive server details.

Use it only on a safe local/staging environment, or briefly on production behind access control. Delete it immediately after checking.

```php
<?php phpinfo();
```

Do not leave this file public.

## Common mistake

Do not assume `php -v` is the same PHP that handles browser requests.

CLI PHP and PHP-FPM can use different binaries, different `php.ini` files, different extensions, and different users.

## Related lessons

[How PHP runs one request](../deep-dives/how-php-runs-one-request.md){ .lesson-link }
[Where does PHP fit?](../where-does-php-fit.md){ .lesson-link }
[What is PHP-FPM?](../what-is-php-fpm.md){ .lesson-link }

## Related scenarios

[Check PHP-FPM pool and slow log](check-php-fpm-pool-and-slow-log.md){ .lesson-link }
[Product page shows 500](product-page-shows-500.md){ .lesson-link }
[Find the site config](find-site-config.md){ .lesson-link }
