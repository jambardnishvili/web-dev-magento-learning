# What Are Product Attributes?

<div class="attribute-scene">
  <div class="attribute-scene__panel attribute-scene__panel--admin">
    <div class="attribute-scene__label">Admin product edit</div>
    <strong>Juno Jacket</strong>
    <span>Someone edits named product facts.</span>
    <div class="attribute-scene__rows">
      <div class="attribute-scene__row attribute-scene__row--name"><b>Name</b><em>Juno Jacket</em></div>
      <div class="attribute-scene__row attribute-scene__row--price"><b>Price</b><em>77.00</em></div>
      <div class="attribute-scene__row attribute-scene__row--color"><b>Color</b><em>Blue</em></div>
    </div>
  </div>

  <div class="attribute-scene__bridge">
    <div class="attribute-scene__rail"></div>
    <div class="attribute-scene__chip attribute-scene__chip--save">Save values</div>
  </div>

  <div class="attribute-scene__panel attribute-scene__panel--storage">
    <div class="attribute-scene__label">Magento storage</div>
    <strong>Attribute + value rows</strong>
    <span>The field definition and the product value are separate ideas.</span>
    <div class="attribute-scene__tables">
      <div><b>attribute</b><code>color</code><small>dropdown</small></div>
      <div><b>product 42</b><code>color = 50</code><small>option id</small></div>
      <div><b>option label</b><code>50 = Blue</code><small>store label</small></div>
    </div>
  </div>

  <div class="attribute-scene__bridge">
    <div class="attribute-scene__rail"></div>
    <div class="attribute-scene__chip attribute-scene__chip--read">Read values</div>
  </div>

  <div class="attribute-scene__panel attribute-scene__panel--page">
    <div class="attribute-scene__label">Storefront page</div>
    <strong>Visible product facts</strong>
    <span>Magento turns saved values into page output.</span>
    <div class="attribute-scene__product">
      <div class="attribute-scene__image"></div>
      <div>
        <b>Juno Jacket</b>
        <small>Price: 77.00</small>
        <small>Color: Blue</small>
      </div>
    </div>
  </div>
</div>

## Watch the visual first

The key idea is that a product fact has two parts: the field name and the saved value.

1. The admin product form shows named fields such as `name`, `price`, and `color`.
2. Magento stores the field definition as an attribute.
3. Magento stores the product-specific value separately.
4. Some values are direct text or numbers.
5. Some values point to option labels, such as a color option.
6. The storefront page shows the final readable value.

What changed on screen: "Magento reads page data" became "Magento reads specific product attributes."

## The short story

A product attribute is a named product field.

Examples:

```text
name
price
description
color
size
is_salable
```

The attribute says what kind of fact this is. The product value says what this specific product saved for that fact.

In a small custom app, you might expect one product table with columns like this:

```text
products
id | name | price | color | size
```

Magento has to support many stores where merchants can add custom product fields. So Magento uses an attribute model: the product exists once, and many named values can be attached to it.

This is the idea behind EAV: entity, attribute, value.

```text
entity:    product 42
attribute: color
value:     Blue
```

## What you should notice

<div class="conversation-scene__notes">
  <div class="conversation-scene__note">
    <strong>The label is not always the code</strong>
    <span>The admin may show "Color", while code and database queries use `color`.</span>
  </div>
  <div class="conversation-scene__note">
    <strong>Dropdowns often store option IDs</strong>
    <span>The database may store `50`, while the storefront displays `Blue`.</span>
  </div>
  <div class="conversation-scene__note">
    <strong>Store views can override values</strong>
    <span>A default value and a store-specific value can both exist.</span>
  </div>
</div>

## Common confusion

It is common to search the codebase for the visible word on the page and find nothing useful.

If the page says `Blue`, that word might be a product attribute option label from the database, not text written in a template.

It is also common to think "database value" always means the final displayed value. For dropdown attributes, Magento may store an option ID. Magento then resolves that ID into a label for the current store view.

## What we are still leaving out

We are not going deep into every Magento EAV table yet.

We are also not covering index tables, flat catalog history, GraphQL resolvers, Elasticsearch/OpenSearch, or how Hyva renders attribute values.

For now, the useful model is:

```text
visible product fact -> attribute code -> product value -> option/config/store label
```

## Check yourself

- If the storefront says `Blue`, why might searching templates for `Blue` fail?
- What is the difference between an attribute code and an attribute label?
- Why can store view scope make the same product show different text on different storefronts?

You should now understand that Magento product pages often display attribute values, not hardcoded template text.

## Use this in real work

Use this when a product page shows the wrong name, price, color, size, badge, custom field, or store-specific value.

[Field guide: trace a storefront value to its source](field-guide/trace-storefront-value-to-source.md){ .lesson-link }
[Field guide: check MySQL](field-guide/check-mysql.md){ .lesson-link }
[Field guide: find which template renders a page part](field-guide/find-which-template-renders-page-part.md){ .lesson-link }

[Next: Why does cache exist?](why-does-cache-exist.md){ .next-lesson }
