# Check MySQL

## When to use this

Use this when Magento cannot read saved store data, pages are slow, or logs mention database connection errors.

## Safety level

Mostly read-only.

`systemctl status`, `SHOW DATABASES`, and config checks are read-only. Be careful once you are inside the MySQL prompt: commands like `UPDATE`, `DELETE`, `DROP`, and `TRUNCATE` change data.

## Check service status

```bash
systemctl status mysql
```

Some servers use MariaDB:

```bash
systemctl status mariadb
```

Command anatomy:

- `systemctl` talks to the Linux service manager.
- `status mysql` asks whether the MySQL service is running locally.
- Some servers use `mariadb` as the service name even though Magento still treats it as the database.

Example output:

```text
Active: active (running) since Sun 2026-04-26 15:44:10 UTC
```

How to read it:

- If MySQL is remote, this local service may not exist.
- A missing local service does not prove the database is down.
- Check Magento's `env.php` to find the configured database host.

## Try connecting

```bash
mysql -u USERNAME -p
```

Command anatomy:

- `mysql` opens the MySQL command-line client.
- `-u USERNAME` sets the database user.
- `-p` asks for a password without showing it on screen.

## Show databases after connecting

```sql
SHOW DATABASES;
```

Example output:

```text
+--------------------+
| Database           |
+--------------------+
| information_schema |
| magento_prod       |
+--------------------+
```

How to read it:

- `magento_prod` looks like the application database.
- Seeing the database only proves access; it does not prove all Magento tables are healthy.

## Check Magento database config

```bash
grep -n "dbname\\|username\\|host" app/etc/env.php
```

Example output:

```text
42:          'host' => 'db.internal',
43:          'dbname' => 'magento_prod',
44:          'username' => 'magento_user',
```

Do not paste real passwords into notes, chat, or screenshots.

## Common mistake

Assuming a Magento error is a database error without checking logs.

First check `var/log/exception.log` and `var/log/system.log`. Then check database connection details.

## Related lessons

- [Where does page data live?](../where-does-page-data-live.md)
- [What is MySQL?](../what-is-mysql.md)

## Related scenarios

[Product page shows 500](product-page-shows-500.md){ .lesson-link }
[First 30 minutes on a new server](first-30-minutes-new-magento-server.md){ .lesson-link }
