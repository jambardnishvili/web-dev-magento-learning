# Check Redis

## When to use this

Use this when cache, sessions, or Magento performance look suspicious.

## Safety level

Read-only for the commands shown here.

Do not run Redis commands such as `FLUSHALL`, `FLUSHDB`, or broad key deletion unless you understand exactly which Redis database and environment you are touching.

## Check service status

```bash
systemctl status redis
```

Some servers use:

```bash
systemctl status redis-server
```

Command anatomy:

- `systemctl` checks local Linux services.
- `status redis` asks whether Redis is running on this machine.
- Some servers call the service `redis-server`.

Example output:

```text
Active: active (running) since Sun 2026-04-26 15:51:02 UTC
```

How to read it:

- Running locally means Redis may be on this server.
- If the service is missing, Redis may still be remote.
- Check Magento's `env.php` to confirm the real Redis host.

## Ping Redis

```bash
redis-cli ping
```

Expected answer:

```text
PONG
```

Command anatomy:

- `redis-cli` opens the Redis command-line client.
- `ping` asks Redis to prove it can answer.
- `PONG` means the client reached a Redis server.

Remote example:

```bash
redis-cli -h redis.internal -p 6379 ping
```

Example failure:

```text
Could not connect to Redis at 127.0.0.1:6379: Connection refused
```

How to read it:

- Redis may be down.
- Or Redis may not be running on `127.0.0.1`.
- Check `app/etc/env.php` before assuming the service is broken.

## Check Magento Redis config

```bash
grep -n "redis\\|cache\\|session" app/etc/env.php
```

## See Redis memory summary

```bash
redis-cli info memory
```

## Common mistake

Treating Redis as the source of truth.

Redis often stores cache or temporary session data. Products, orders, and customers should still live in MySQL.

## Related lessons

- [Why does cache exist?](../why-does-cache-exist.md)
- [What is Redis?](../what-is-redis.md)

## Related scenarios

[First 30 minutes on a new server](first-30-minutes-new-magento-server.md){ .lesson-link }
