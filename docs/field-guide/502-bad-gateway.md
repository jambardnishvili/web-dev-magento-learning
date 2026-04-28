# 502 Bad Gateway

This scenario starts from a real symptom:

```text
The browser shows "502 Bad Gateway".
```

In an nginx + PHP-FPM setup, 502 usually means:

```text
nginx is alive, but nginx could not get a valid response from PHP-FPM.
```

That is different from a Magento 500.

## Safety rule

Start with read-only checks.

Do not restart PHP-FPM before you know whether the problem is:

- PHP-FPM down
- wrong socket path
- permission problem
- PHP-FPM overloaded
- fatal PHP startup error
- deployment changed config

## Step 1: prove the status

```bash
curl -I https://shop.example.com/
```

Command anatomy:

- `curl` makes an HTTP request from the terminal.
- `-I` asks only for response headers.
- The URL should be the same page that shows `502` in the browser.

Example:

```text
HTTP/2 502
server: nginx
```

Interpretation:

- nginx is responding.
- The failure is probably behind nginx.
- Check nginx error log next.

## Step 2: check nginx error log

```bash
sudo tail -n 120 /var/log/nginx/error.log
```

Command anatomy:

- `sudo` may be needed because nginx logs are often protected.
- `tail` reads the end of the file.
- `-n 120` shows enough recent lines to catch the current failure.
- `error.log` is where nginx explains upstream/PHP-FPM failures.

Common output:

```text
connect() to unix:/run/php/php8.2-fpm.sock failed (2: No such file or directory)
```

Interpretation:

- nginx is configured to use a PHP-FPM socket.
- That socket does not exist.
- PHP-FPM may be stopped, renamed, upgraded, or configured with a different socket path.

Another common output:

```text
connect() to unix:/run/php/php8.2-fpm.sock failed (13: Permission denied)
```

Interpretation:

- PHP-FPM socket exists, but nginx cannot access it.
- This is likely a user/group/permission mismatch between nginx and PHP-FPM.

Another output:

```text
upstream prematurely closed connection while reading response header from upstream
```

Interpretation:

- nginx reached PHP-FPM.
- PHP died or closed the connection before returning a valid response.
- Check PHP-FPM logs and Magento/PHP errors.

## Step 3: find the PHP-FPM target from site config

```bash
sudo nginx -T 2>/dev/null | grep -n -A5 -B5 "fastcgi_pass"
```

Command anatomy:

- `nginx -T` prints the active nginx config, including included files.
- `2>/dev/null` hides warning noise.
- `grep` searches for the PHP-FPM handoff directive.
- `-A5 -B5` shows nearby context around the match.

Example:

```nginx
fastcgi_pass unix:/run/php/php8.2-fpm.sock;
```

This tells you exactly where nginx sends PHP requests.

Do not guess the socket path. Read it from active config.

If `nginx -T` is unavailable:

```bash
grep -R "fastcgi_pass" /etc/nginx 2>/dev/null
```

## Step 4: check whether PHP-FPM is running

```bash
ps aux | grep php-fpm | grep -v grep
```

Example good output:

```text
root      2200 php-fpm: master process (/etc/php/8.2/fpm/php-fpm.conf)
www-data  2201 php-fpm: pool www
www-data  2202 php-fpm: pool www
```

Interpretation:

- PHP-FPM is running.
- The issue may be socket path, permissions, overload, or PHP errors.

Example bad output:

```text
<no output>
```

Interpretation:

- PHP-FPM is not running, or it uses a different process name.
- Check systemd service status.

## Step 5: check service status

```bash
systemctl status php8.2-fpm --no-pager
```

If you do not know the service name:

```bash
systemctl list-units --type=service | grep -i fpm
```

Example:

```text
php8.2-fpm.service loaded failed failed The PHP 8.2 FastCGI Process Manager
```

Interpretation:

- PHP-FPM service failed.
- Read the PHP-FPM journal before restarting.

## Step 6: read PHP-FPM logs

```bash
journalctl -u php8.2-fpm -n 120 --no-pager
```

Common output:

```text
ERROR: unable to bind listening socket for address '/run/php/php8.2-fpm.sock'
ERROR: FPM initialization failed
```

Interpretation:

- PHP-FPM could not start its socket.
- This is an FPM configuration/startup issue.

Another output:

```text
PHP Fatal error:  Cannot load Zend OPcache - it was already loaded
```

Interpretation:

- PHP configuration is broken.
- Restarting without fixing config will likely fail again.

## Step 7: check whether the socket exists

Use the socket path from nginx config.

```bash
ls -la /run/php/php8.2-fpm.sock
```

Good:

```text
srw-rw---- 1 www-data www-data 0 Apr 26 16:20 /run/php/php8.2-fpm.sock
```

Bad:

```text
ls: cannot access '/run/php/php8.2-fpm.sock': No such file or directory
```

Interpretation:

- If missing, PHP-FPM may not be running or may use another socket.
- If present but permission denied appears in nginx logs, compare socket owner/group with nginx user.

## Step 8: only then decide action

Evidence-based next actions:

```text
FPM stopped -> ask whether restarting is acceptable, then restart service
socket path mismatch -> fix nginx or FPM config, then reload/restart carefully
permission denied -> fix FPM listen owner/group or nginx user
PHP startup fatal -> fix PHP config first
FPM overloaded -> inspect traffic, slow log, worker limits, app errors
```

Restarting PHP-FPM is a production-affecting action. It may drop active PHP requests.

## What not to do first

Do not start with:

```bash
sudo systemctl restart php8.2-fpm
```

It might be the right fix, but only after the logs tell you why PHP-FPM is failing.

## Concepts behind this

[What is a request, and what is a response?](../what-is-a-request-and-what-is-a-response.md){ .lesson-link }
[What does the web server do?](../what-does-the-web-server-do.md){ .lesson-link }
[What is nginx?](../what-is-nginx.md){ .lesson-link }
[What is PHP-FPM?](../what-is-php-fpm.md){ .lesson-link }

## Related pages

[Check PHP-FPM](check-php-fpm.md){ .lesson-link }
[Find nginx logs](find-nginx-logs.md){ .lesson-link }
[Find the site config](find-site-config.md){ .lesson-link }
[Product page shows 500](product-page-shows-500.md){ .lesson-link }
