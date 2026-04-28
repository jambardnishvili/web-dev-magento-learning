# Check PHP-FPM

## When to use this

Use this when nginx can receive the request but dynamic Magento pages fail, often with `502 Bad Gateway` or slow PHP responses.

## Safety level

Read-only.

These commands check PHP-FPM status, logs, and config. Do not restart PHP-FPM until you have captured the error you need.

## Check service status

Service names differ by server.

```bash
systemctl status php-fpm
```

Common versioned names:

```bash
systemctl status php8.2-fpm
systemctl status php8.3-fpm
```

Command anatomy:

- `systemctl` talks to the Linux service manager.
- `status` asks whether a service is running.
- `php8.2-fpm` is a common versioned PHP-FPM service name.

Example good output:

```text
Active: active (running) since Sun 2026-04-26 16:05:11 UTC
```

Example bad output:

```text
Active: failed (Result: exit-code) since Sun 2026-04-26 16:29:03 UTC
```

How to read it:

- `active (running)` means PHP-FPM is alive.
- `failed` means nginx may return `502` for PHP pages.
- If the service name is not found, try the versioned names or inspect nginx `fastcgi_pass`.

## Read recent service logs

```bash
journalctl -u php-fpm -n 100 --no-pager
```

Command anatomy:

- `journalctl` reads service logs managed by systemd.
- `-u php-fpm` selects the service.
- `-n 100` shows the last 100 lines.
- `--no-pager` prints directly instead of opening an interactive viewer.

Versioned examples:

```bash
journalctl -u php8.2-fpm -n 100 --no-pager
journalctl -u php8.3-fpm -n 100 --no-pager
```

## Find PHP-FPM config

```bash
php-fpm -tt
```

If that command is not available, try the versioned binary:

```bash
php-fpm8.2 -tt
php-fpm8.3 -tt
```

## Common mistake

Restarting PHP-FPM before reading the error.

Restarting can remove the immediate symptom from memory. Read logs first, then restart if needed.

## Related lessons

- [Where does PHP fit?](../where-does-php-fit.md)
- [What is PHP-FPM?](../what-is-php-fpm.md)
- [What is nginx?](../what-is-nginx.md)

## Related scenarios

[502 Bad Gateway](502-bad-gateway.md){ .lesson-link }
[Product page shows 500](product-page-shows-500.md){ .lesson-link }
