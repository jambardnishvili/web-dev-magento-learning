# Trace a Storefront Value to Its Source

Use this when the storefront shows a product value and you need to prove where that value comes from.

Example problems:

```text
The product page says Color: Blue, but the expected value is Navy.
```

or:

```text
A custom product badge appears on one store view but not another.
```

## Safety level

Read-only first.

The commands on this page inspect URLs, files, and database rows. Do not update product data, run imports, reindex, or clear production cache until you know which source owns the visible value.

## Step 1: write down the exact visible clue

Capture three facts before touching the server:

```text
page: /juno-jacket.html
visible value: Color: Blue
store view or domain: en.example.com
```

This prevents a common mistake: investigating the right product on the wrong store view.

## Step 2: identify the product

If the URL is a pretty product URL, start with `url_rewrite`.

```sql
SELECT request_path, target_path, entity_type, entity_id
FROM url_rewrite
WHERE request_path = 'juno-jacket.html'
LIMIT 5;
```

Example output:

```text
request_path      target_path                 entity_type  entity_id
juno-jacket.html  catalog/product/view/id/42  product      42
```

How to read it:

- The visible URL points to product entity `42`.
- The internal route is `catalog/product/view/id/42`.
- You can now inspect product data for that entity.

If you already know the SKU, confirm the product row:

```sql
SELECT entity_id, sku
FROM catalog_product_entity
WHERE sku = 'MJ01';
```

Some Magento versions also have `row_id`. If the table has it, keep both IDs in your notes:

```sql
SELECT entity_id, row_id, sku
FROM catalog_product_entity
WHERE sku = 'MJ01';
```

## Step 3: decide whether this is product data, config, CMS, or code

Ask what kind of value you are seeing.

```text
Product name, price, color, size, custom product field -> product attribute
Store phone number, base URL, payment setting             -> core_config_data
Banner text or content block                              -> CMS page/block
Button label or template phrase                           -> template/translation
```

Do not assume every visible value is a product attribute. Magento pages mix several data sources.

## Step 4: find the attribute code

If the visible value is product data, find the attribute code.

Common clues:

```text
admin label: Color
likely attribute code: color
```

Query product attributes:

```sql
SELECT attribute_id, attribute_code, backend_type, frontend_input, source_model
FROM eav_attribute
WHERE entity_type_id = (
  SELECT entity_type_id
  FROM eav_entity_type
  WHERE entity_type_code = 'catalog_product'
)
AND attribute_code = 'color';
```

Example output:

```text
attribute_id  attribute_code  backend_type  frontend_input  source_model
93            color           int           select          Magento\Eav\Model\Entity\Attribute\Source\Table
```

How to read it:

- `attribute_code` is what code and database queries usually use.
- `backend_type` tells you which product value table stores the value.
- `frontend_input` tells you what kind of admin field it is.
- A `select` field often stores an option ID, not the final label.

## Step 5: read the product value table

Use `backend_type` to choose the table.

```text
varchar  -> catalog_product_entity_varchar
int      -> catalog_product_entity_int
decimal  -> catalog_product_entity_decimal
text     -> catalog_product_entity_text
datetime -> catalog_product_entity_datetime
```

For `color` with `backend_type = int`, read the int table.

If your value tables use `entity_id`:

```sql
SELECT store_id, value
FROM catalog_product_entity_int
WHERE attribute_id = 93
AND entity_id = 42;
```

If your value tables use `row_id`:

```sql
SELECT store_id, value
FROM catalog_product_entity_int
WHERE attribute_id = 93
AND row_id = 42;
```

Example output:

```text
store_id  value
0         50
2         51
```

How to read it:

- `store_id = 0` is the default value.
- A specific store view can override the default value.
- For a dropdown, `50` or `51` is usually an option ID.

## Step 6: turn option IDs into labels

For dropdown-like attributes, map the option ID to the label.

```sql
SELECT option_id, store_id, value
FROM eav_attribute_option_value
WHERE option_id IN (50, 51)
ORDER BY option_id, store_id;
```

Example output:

```text
option_id  store_id  value
50         0         Blue
51         0         Navy
51         2         Dark Navy
```

How to read it:

- The database value may be `51`.
- The storefront may display `Navy` or `Dark Navy` depending on store view.
- Store-specific labels can make the same option display differently.

## Step 7: check config when the value is not product data

If the value looks like store configuration, inspect config paths.

```sql
SELECT scope, scope_id, path, value
FROM core_config_data
WHERE path LIKE '%base_url%'
   OR path LIKE '%phone%'
ORDER BY path, scope, scope_id;
```

How to read it:

- `default` applies globally.
- `websites` can override the global value.
- `stores` can override a website value.

Use targeted `LIKE` patterns. Do not dump the whole config table into screenshots or chat.

## Step 8: check files only after data sources

If the value is not in product attributes, options, config, or CMS, search the codebase.

```bash
grep -R "Blue" app/design app/code vendor -n \
  --include='*.phtml' --include='*.xml' --include='*.php' --include='*.csv' 2>/dev/null | head -50
```

How to read it:

- `.phtml` may mean template text.
- `.csv` may mean translation text.
- `.xml` may mean layout/config.
- `.php` may mean business logic.

## Common mistake

Do not stop at the first value row.

Magento can have default values, store-view overrides, option labels, cached output, and indexed copies. Your notes should say which layer you proved and which layer you have not checked yet.

## What good notes look like

```text
page: /juno-jacket.html
product: entity_id 42, sku MJ01
store view: en, store_id 2
visible value: Color: Dark Navy
attribute: color, attribute_id 93, backend_type int, frontend_input select
raw product value: option_id 51 at store_id 2
option label: Dark Navy at store_id 2, Navy at store_id 0
next check if still wrong: cache/index/rendering layer
```

## Concepts behind this

[What are product attributes?](../what-are-product-attributes.md){ .lesson-link }
[Where does page data live?](../where-does-page-data-live.md){ .lesson-link }
[What is MySQL?](../what-is-mysql.md){ .lesson-link }

## Related pages

[Check MySQL](check-mysql.md){ .lesson-link }
[Find which template renders a page part](find-which-template-renders-page-part.md){ .lesson-link }
[Search files on a server](search-files-on-server.md){ .lesson-link }
