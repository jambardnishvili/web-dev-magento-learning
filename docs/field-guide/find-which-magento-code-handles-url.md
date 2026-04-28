# Find Which Magento Code Handles a URL

Use this when you have a Magento URL and need to find the route, module, controller, or action that owns it.

Example problem:

```text
/customer/account/login works differently than expected
```

or:

```text
/juno-jacket.html returns 500
```

## Safety level

Read-only.

The commands on this page inspect files and, for URL rewrites, may read the database. Do not edit route XML, disable modules, clear cache, or deploy code until you know which code path is involved.

## Step 1: start from the visible URL path

Strip the domain and query string.

```text
https://shop.example.com/customer/account/login?foo=bar
```

becomes:

```text
customer/account/login
```

For many Magento frontend routes, read it like this:

```text
front name / controller / action
customer   / account    / login
```

This is a starting hypothesis, not proof.

## Step 2: find the route declaration

From Magento root:

```bash
grep -R 'frontName="customer"' app/code vendor -n --include routes.xml 2>/dev/null
```

Command anatomy:

- `grep -R` searches folders recursively.
- `'frontName="customer"'` searches for the route front name.
- `app/code vendor` checks project code and installed packages.
- `-n` prints line numbers.
- `--include routes.xml` limits the search to route config files.
- `2>/dev/null` hides permission errors.

Example output:

```text
vendor/magento/module-customer/etc/frontend/routes.xml:10: <route id="customer" frontName="customer">
```

How to read it:

- The route front name is `customer`.
- The route is declared by `Magento_Customer`.
- This is frontend route config because the file is under `etc/frontend`.

## Step 3: find the controller action

For:

```text
customer/account/login
```

look for:

```bash
find app/code vendor -path "*/Controller/Account/Login.php" 2>/dev/null
```

Example output:

```text
vendor/magento/module-customer/Controller/Account/Login.php
```

How to read it:

- `Account` comes from the second URL part.
- `Login.php` comes from the third URL part.
- The owning module is probably `Magento_Customer`.

This does not mean the controller is the only code that affects the page. Layout XML, blocks, templates, plugins, observers, and configuration may still change the result.

## Step 4: know when a URL is a rewrite

Product and category URLs often do not look like controller routes.

Example:

```text
juno-jacket.html
```

There may be no controller called:

```text
Controller/Juno/Jacket.php
```

Instead, Magento stores a URL rewrite that points the pretty URL to an internal route.

Typical internal target:

```text
catalog/product/view/id/42
```

That means:

```text
front name: catalog
controller: product
action: view
entity id: 42
```

## Step 5: inspect URL rewrites when needed

First get database access from the normal project process. Do not paste real passwords into notes, chat, or screenshots.

Then run a read-only query:

```sql
SELECT request_path, target_path, entity_type, entity_id
FROM url_rewrite
WHERE request_path = 'juno-jacket.html'
LIMIT 5;
```

Example output:

```text
request_path      target_path                    entity_type  entity_id
juno-jacket.html  catalog/product/view/id/42     product      42
```

How to read it:

- The browser URL is `juno-jacket.html`.
- Magento internally routes it to `catalog/product/view/id/42`.
- The controller path to investigate is the catalog product view action.

Then search for the controller:

```bash
find app/code vendor -path "*/Controller/Product/View.php" 2>/dev/null
```

Example output:

```text
vendor/magento/module-catalog/Controller/Product/View.php
```

## Step 6: connect route to layout handle

The controller action name often becomes a layout handle.

For:

```text
catalog/product/view
```

the full action name is usually:

```text
catalog_product_view
```

Search layout XML:

```bash
find app/design app/code vendor -path "*/layout/catalog_product_view.xml" 2>/dev/null
```

Example output:

```text
vendor/magento/module-catalog/view/frontend/layout/catalog_product_view.xml
app/design/frontend/Acme/theme/Magento_Catalog/layout/catalog_product_view.xml
```

How to read it:

- The controller handles the request.
- Layout XML can add blocks, remove blocks, or choose templates for that request.
- Theme files can override or extend vendor layout.

## Step 7: admin URLs have an extra front door

Admin URLs include a secret admin front name from `app/etc/env.php`.

Example:

```text
admin_abc123/catalog/product/index
```

`admin_abc123` is the admin entry path. The route you investigate after that is usually:

```text
catalog/product/index
```

Do not confuse the secret admin front name with the module route front name.

## Common mistake

Do not search only for the full visible URL.

For catalog pages, the visible URL may be a rewrite. First translate it to the internal target, then trace the internal route.

## What good notes look like

```text
visible URL: /juno-jacket.html
url_rewrite target: catalog/product/view/id/42
route front name: catalog
controller action: Magento_Catalog::Controller/Product/View.php
layout handle: catalog_product_view
theme layout override: app/design/frontend/Acme/theme/Magento_Catalog/layout/catalog_product_view.xml
```

## Concepts behind this

[How Magento chooses what code handles a URL](../how-magento-chooses-code-for-url.md){ .lesson-link }
[Where does Magento fit?](../where-does-magento-fit.md){ .lesson-link }
[What is a request, and what is a response?](../what-is-a-request-and-what-is-a-response.md){ .lesson-link }

## Related pages

[Product page shows 500](product-page-shows-500.md){ .lesson-link }
[Search files on a server](search-files-on-server.md){ .lesson-link }
[Find Magento logs](find-magento-logs.md){ .lesson-link }
