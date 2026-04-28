# How Magento Turns Layout Into Page HTML

<div class="layout-scene">
  <div class="layout-scene__flow">
    <div class="layout-scene__step layout-scene__step--handle">
      <div class="layout-scene__label">Step 1</div>
      <strong>Layout handle</strong>
      <span>Magento names the page shape from the route.</span>
      <code>catalog_product_view</code>
    </div>

    <div class="layout-scene__step layout-scene__step--xml">
      <div class="layout-scene__label">Step 2</div>
      <strong>Layout XML</strong>
      <span>XML says which page pieces should exist.</span>
      <code>layout/*.xml</code>
    </div>

    <div class="layout-scene__step layout-scene__step--block">
      <div class="layout-scene__label">Step 3</div>
      <strong>Block class</strong>
      <span>PHP prepares data and small decisions for a page part.</span>
      <code>Block/Product/View.php</code>
    </div>

    <div class="layout-scene__step layout-scene__step--template">
      <div class="layout-scene__label">Step 4</div>
      <strong>Template file</strong>
      <span>PHTML prints the final HTML for that part.</span>
      <code>templates/*.phtml</code>
    </div>
  </div>

  <div class="layout-scene__browser">
    <div class="layout-scene__window">
      <div class="layout-scene__bar">
        <span></span>
        <span></span>
        <span></span>
        <strong>Product page</strong>
      </div>
      <div class="layout-scene__screen">
        <div class="layout-scene__piece layout-scene__piece--image">Product image block</div>
        <div class="layout-scene__piece layout-scene__piece--info">Name, price, and stock template</div>
        <div class="layout-scene__piece layout-scene__piece--cart">Add to cart template</div>
      </div>
    </div>
    <div class="layout-scene__caption">Magento is assembling page parts, not opening one giant HTML file.</div>
  </div>
</div>

## Watch the visual first

This visual starts after Magento already knows the route and controller.

1. Magento has a page name such as `catalog_product_view`.
2. Layout XML says which blocks should appear on that page.
3. A block class prepares data or behavior for one part of the page.
4. A template file prints HTML for that part.
5. Magento combines all rendered parts into the response the browser receives.

What changed on screen: "Magento chose the code" became "Magento assembles visible page parts."

## The short story

Magento pages are not usually one PHP file that prints everything.

A page is assembled from smaller parts. The controller starts the page response, layout XML describes the structure, block classes prepare values, and template files print HTML.

For a product page, the route may lead to:

```text
catalog/product/view
```

Magento turns that into a layout handle:

```text
catalog_product_view
```

Then Magento reads matching layout XML files, for example:

```text
view/frontend/layout/catalog_product_view.xml
```

Those XML files can add blocks and choose templates. A template might look like:

```text
Magento_Catalog::product/view/addtocart.phtml
```

That template is one piece of the final page, not the whole page.

## What you should notice

<div class="conversation-scene__notes">
  <div class="conversation-scene__note">
    <strong>Controllers do not draw everything</strong>
    <span>The controller starts the response, but layout and templates usually create the visible page.</span>
  </div>
  <div class="conversation-scene__note">
    <strong>Layout XML is a page plan</strong>
    <span>It can add, move, remove, or configure blocks.</span>
  </div>
  <div class="conversation-scene__note">
    <strong>Templates print HTML</strong>
    <span>When you see markup in the browser, a template is often involved.</span>
  </div>
</div>

## Common confusion

It is common to find the controller and expect the button, price, or menu HTML to be in that controller file. Usually it is not there.

The controller owns the request. The layout and template files often own the visible markup.

Another confusion is thinking every visible string must exist in a `.phtml` file. Some text can come from translations, product data, CMS content, JavaScript, or a third-party module.

## What we are still leaving out

We are not going deep into Magento layout merging, containers, block arguments, view models, plugins, UI components, or Hyva-specific Alpine components yet.

For now, the important model is:

```text
route -> controller -> layout handle -> layout XML -> block -> template -> HTML
```

## Check yourself

- If a product page button is wrong, why might the controller not be the right file?
- What does a layout handle like `catalog_product_view` help you search for?
- What is the difference between a block class and a template file?

You should now understand that Magento builds visible HTML by combining layout XML, blocks, and templates after it chooses the request code.

## Use this in real work

Use this when a page loads, but one visible part of the page is wrong, missing, duplicated, or styled unexpectedly.

[Field guide: find which template renders a page part](field-guide/find-which-template-renders-page-part.md){ .lesson-link }
[Field guide: find which Magento code handles a URL](field-guide/find-which-magento-code-handles-url.md){ .lesson-link }
[Field guide: search files on a server](field-guide/search-files-on-server.md){ .lesson-link }

[Next: Where does page data live?](where-does-page-data-live.md){ .next-lesson }
