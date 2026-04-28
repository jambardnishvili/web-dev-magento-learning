# Clear Magento Cache

## When to use this

Use this when a Magento page looks old after code, layout, configuration, or product data changed.

## Safety level

Changes server state, but normally safe when used deliberately.

`cache:clean` and `cache:flush` do not delete products, orders, customers, or code. They remove saved temporary answers so Magento can rebuild them. On a busy production site, this can make the next few requests slower while cache warms again.

## Safer first command

```bash
bin/magento cache:clean
```

Command anatomy:

- `bin/magento` runs Magento's command-line tool from the project root.
- `cache:clean` removes cache entries Magento knows are stale or tagged.
- This is usually the first cache command to try.

## What it does

`cache:clean` removes Magento cache entries that are marked as stale.

It is usually the first command to try because it is narrower than flushing everything.

## Stronger command

```bash
bin/magento cache:flush
```

Command anatomy:

- `cache:flush` clears cache storage more broadly than `cache:clean`.
- If Redis stores Magento cache, this can remove many Magento cache entries from Redis.
- Use it when you understand that stale cache is likely involved.

## What it does

`cache:flush` clears cache storage more broadly.

Use it when `cache:clean` did not fix the problem, or when the cache backend contains entries Magento does not tag cleanly.

## See cache status

```bash
bin/magento cache:status
```

Example output:

```text
Current status:
                        config: 1
                        layout: 1
                    block_html: 1
                    full_page: 1
```

How to read it:

- `1` means that cache type is enabled.
- `0` means that cache type is disabled.
- Disabled cache can make a site slower, but it is not automatically the cause of a bug.

## Common mistake

Running `cache:flush` constantly without knowing which cache layer is involved.

If the browser still shows old content, the stale copy may be browser cache, CDN/full-page cache, Magento cache, Redis, or generated static files.

## Related lessons

- [Why does cache exist?](../why-does-cache-exist.md)
- [What is Redis?](../what-is-redis.md)

## Related scenarios

[Product page shows 500](product-page-shows-500.md){ .lesson-link }
