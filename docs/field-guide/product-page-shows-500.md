# Product Page Shows 500

This scenario starts from a real symptom:

```text
Opening a product page returns "500 Internal Server Error".
```

A 500 means the server accepted the request, but something failed while building the response.

In Magento, that failure is often in PHP code, layout XML, dependency injection, a template, database access, or a third-party module.

## Safety rule

Start with read-only checks.

Do not clear cache, restart services, disable modules, or deploy code until you know which layer failed.

## Step 1: prove the failure

From your own machine:

```bash
curl -I https://shop.example.com/product-url.html
```

Command anatomy:

- `curl` makes an HTTP request from the terminal.
- `-I` asks only for response headers, not the full page body.
- The URL should be the same product URL that fails in the browser.

Example:

```text
HTTP/2 500
server: nginx
content-type: text/html; charset=UTF-8
```

What this tells you:

- The web server answered.
- The status is really `500`.
- This is not just your browser cache.

If the status is `404`, use nginx/Magento routing checks instead.

If the status is `502`, use this page:

[502 Bad Gateway](502-bad-gateway.md){ .lesson-link }

## Step 2: find the live Magento root

Do not guess the project folder.

Use the web server config to prove the root:

```text
domain -> active web server config -> document root -> Magento marker files
```

If you have not done that yet, use:

[Find the Magento root](find-magento-root.md){ .lesson-link }

Then go to Magento root:

```bash
cd /srv/clients/acme/current
```

Command anatomy:

- `cd` changes your current folder.
- Use the proven Magento root, not a guessed common path.
- From this folder, `bin/magento` and `var/log` should exist.

## Step 3: check Magento exception log

```bash
tail -n 120 var/log/exception.log
```

Command anatomy:

- `tail` reads the end of a file.
- `-n 120` shows the last 120 lines.
- `var/log/exception.log` is where Magento often writes exception stack traces.

Example:

```text
main.CRITICAL: Error: Call to a member function getSku() on null
in /srv/clients/acme/current/app/code/Acme/Catalog/ViewModel/ProductLabel.php:42
```

Interpretation:

- Magento reached PHP code.
- A custom module or theme file failed.
- The useful clue is the first project-owned file in the stack trace.

In this example, investigate:

```text
app/code/Acme/Catalog/ViewModel/ProductLabel.php
```

## Step 4: check Magento system log

```bash
tail -n 120 var/log/system.log
```

Example:

```text
main.ERROR: SQLSTATE[42S02]: Base table or view not found: 1146 Table 'catalog_product_custom' doesn't exist
```

Interpretation:

- This is probably database/schema related.
- The product page fails because code expects a table that is missing.
- Next checks are module setup, migrations, deployment state, and database.

## Step 5: check nginx error log

```bash
sudo tail -n 120 /var/log/nginx/error.log
```

Example:

```text
upstream sent too big header while reading response header from upstream
```

Interpretation:

- Magento/PHP responded, but nginx could not accept the response headers.
- This can involve cookies, sessions, redirects, or nginx buffer settings.
- It is not the same as a PHP fatal error.

Another example:

```text
FastCGI sent in stderr: "PHP message: PHP Fatal error: Uncaught Error..."
```

Interpretation:

- nginx captured a PHP fatal error.
- The deeper Magento clue is usually still in `var/log/exception.log` or PHP-FPM logs.

## Step 6: check whether only one product fails

Try:

```bash
curl -I https://shop.example.com/another-product.html
curl -I https://shop.example.com/category.html
curl -I https://shop.example.com/
```

Interpretation:

- One product fails: likely product data, product-specific layout, URL rewrite, option, media, or custom product logic.
- All product pages fail: likely product view layout, module code, theme code, or catalog dependency.
- Whole site fails: likely broader Magento, PHP, DB, cache, or infrastructure issue.

## Step 7: connect the stack trace to the code owner

In a stack trace, prioritize files in this order:

```text
app/code/
app/design/
vendor/company/
generated/
vendor/magento/
```

Why:

- `app/code` is custom project code.
- `app/design` is theme code.
- `vendor/company` may be third-party extension code.
- `generated` is usually generated Magento code around the real class.
- `vendor/magento` is often framework code called by the real failing code.

Do not blame the last line of the stack trace. The useful line is usually the first project-owned file near the top.

## Step 8: decide the layer

Use the evidence:

```text
500 + Magento exception log -> Magento/PHP code problem
500 + SQL error -> database/schema/data problem
500 + nginx buffer error -> web server response handling problem
500 only one product -> product data or product-specific code
500 whole site -> shared dependency, deployment, cache, or infrastructure
```

## What not to do first

Do not start with:

```bash
bin/magento cache:flush
rm -rf generated/*
rm -rf pub/static/*
sudo service php-fpm restart
```

Those commands may hide clues, affect production, or make the issue worse.

Use them only after the logs tell you why they are relevant.

## Concepts behind this

[What is a request, and what is a response?](../what-is-a-request-and-what-is-a-response.md){ .lesson-link }
[Where does PHP fit?](../where-does-php-fit.md){ .lesson-link }
[Where does Magento fit?](../where-does-magento-fit.md){ .lesson-link }
[Where does page data live?](../where-does-page-data-live.md){ .lesson-link }

## Related pages

[Find Magento logs](find-magento-logs.md){ .lesson-link }
[Find nginx logs](find-nginx-logs.md){ .lesson-link }
[Find the Magento root](find-magento-root.md){ .lesson-link }
[Check MySQL](check-mysql.md){ .lesson-link }
[502 Bad Gateway](502-bad-gateway.md){ .lesson-link }
