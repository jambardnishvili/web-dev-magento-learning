# Find Which Template Renders a Page Part

Use this when a Magento page loads, but one visible part is wrong and you need to find the layout XML, block, or template behind it.

Example problems:

```text
The add-to-cart area is missing on product pages.
```

or:

```text
The product price appears in the wrong place.
```

## Safety level

Read-only first.

The commands on this page search files and inspect layout/template references. Do not edit templates, clear cache, or enable template hints on production until you know what page part you are investigating.

## Step 1: start from the page and the visible part

Write down two things:

```text
page: /juno-jacket.html
visible part: Add to Cart button
```

If you do not know the route or layout handle yet, trace the URL first.

For a product page, the useful route clue is often:

```text
catalog/product/view
```

and the layout handle is usually:

```text
catalog_product_view
```

## Step 2: find layout XML for the page

From Magento root:

```bash
find app/design app/code vendor -path "*/layout/catalog_product_view.xml" 2>/dev/null
```

Command anatomy:

- `find` walks the folder tree.
- `app/design` checks theme overrides.
- `app/code` checks project modules.
- `vendor` checks installed modules.
- `-path "*/layout/catalog_product_view.xml"` searches for layout files with that handle name.
- `2>/dev/null` hides permission errors.

Example output:

```text
vendor/magento/module-catalog/view/frontend/layout/catalog_product_view.xml
app/design/frontend/Acme/theme/Magento_Catalog/layout/catalog_product_view.xml
```

How to read it:

- Vendor files show the original module behavior.
- Theme files can override or extend that behavior.
- Start with theme files when the problem is visual.

## Step 3: search for the visible text

Search for a phrase from the page part.

```bash
grep -R "Add to Cart" app/design app/code vendor -n \
  --include='*.phtml' --include='*.xml' --include='*.js' 2>/dev/null | head -50
```

Command anatomy:

- `grep -R` searches recursively.
- `"Add to Cart"` is the visible text you are chasing.
- `--include='*.phtml'` checks templates.
- `--include='*.xml'` checks layout and config.
- `--include='*.js'` checks frontend JavaScript.
- `head -50` keeps the result readable.

Example output:

```text
vendor/magento/module-catalog/view/frontend/templates/product/view/addtocart.phtml:24: <span><?= $block->escapeHtml(__('Add to Cart')) ?></span>
```

How to read it:

- The visible text appears in a template file.
- The module area is `Magento_Catalog`.
- The template path is probably related to the page part.

## Step 4: search for template declarations in layout XML

If you found a template path, search for where layout XML uses it.

```bash
grep -R "addtocart.phtml" app/design app/code vendor -n --include='*.xml' 2>/dev/null
```

Example output:

```text
vendor/magento/module-catalog/view/frontend/layout/catalog_product_view.xml:42: template="Magento_Catalog::product/view/addtocart.phtml"
```

How to read it:

- The layout handle is `catalog_product_view`.
- The template alias is `Magento_Catalog::product/view/addtocart.phtml`.
- The module part before `::` tells you where Magento starts looking.

## Step 5: map a template alias to real files

For:

```text
Magento_Catalog::product/view/addtocart.phtml
```

search likely real paths:

```bash
find app/design app/code vendor -path "*/Magento_Catalog/templates/product/view/addtocart.phtml" 2>/dev/null
find app/code vendor -path "*/view/frontend/templates/product/view/addtocart.phtml" 2>/dev/null
```

Example output:

```text
vendor/magento/module-catalog/view/frontend/templates/product/view/addtocart.phtml
app/design/frontend/Acme/theme/Magento_Catalog/templates/product/view/addtocart.phtml
```

How to read it:

- The theme file can override the vendor template.
- If both exist, the theme file is often what the browser is actually seeing.
- If the project uses Hyva, also expect theme templates under the active Hyva theme.

## Step 6: find the block class when needed

Layout XML may declare a block class:

```xml
<block class="Magento\Catalog\Block\Product\View" name="product.info" template="Magento_Catalog::product/view/form.phtml"/>
```

Search for block references:

```bash
grep -R "product.info" app/design app/code vendor -n --include='*.xml' 2>/dev/null
```

Or search by class:

```bash
grep -R "Magento\\\\Catalog\\\\Block\\\\Product\\\\View" app/design app/code vendor -n --include='*.xml' 2>/dev/null
```

Then find the class file:

```bash
find app/code vendor -path "*/Block/Product/View.php" 2>/dev/null
```

How to read it:

- Layout XML connects a block name to a class and template.
- The block class prepares data or methods.
- The template prints HTML using `$block`.

## Step 7: remember when grep will not find it

If text search fails, the visible part may come from:

- a translation file
- product or category data
- CMS content
- JavaScript-rendered markup
- a view model
- a Hyva Alpine component
- a third-party module that changes the page through plugins or observers

In that case, search for nearby CSS classes, block names, template names, or layout handles instead of only searching visible text.

## Common mistake

Do not edit the first matching vendor file.

Vendor files explain the original behavior, but project-specific changes usually belong in a custom module or theme override. First identify the active theme and whether an override already exists.

## What good notes look like

```text
page: /juno-jacket.html
internal route: catalog/product/view/id/42
layout handle: catalog_product_view
visible part: Add to Cart button
layout file: vendor/magento/module-catalog/view/frontend/layout/catalog_product_view.xml
template alias: Magento_Catalog::product/view/addtocart.phtml
active override: app/design/frontend/Acme/theme/Magento_Catalog/templates/product/view/addtocart.phtml
possible block: Magento\Catalog\Block\Product\View
```

## Concepts behind this

[How Magento turns layout into page HTML](../how-magento-turns-layout-into-html.md){ .lesson-link }
[How Magento chooses what code handles a URL](../how-magento-chooses-code-for-url.md){ .lesson-link }
[Where does Magento fit?](../where-does-magento-fit.md){ .lesson-link }

## Related pages

[Find which Magento code handles a URL](find-which-magento-code-handles-url.md){ .lesson-link }
[Search files on a server](search-files-on-server.md){ .lesson-link }
[Product page shows 500](product-page-shows-500.md){ .lesson-link }
