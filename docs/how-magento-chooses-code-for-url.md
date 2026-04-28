# How Magento Chooses What Code Handles a URL

<div class="message-scene">
  <div class="message-scene__panel message-scene__panel--browser">
    <div class="message-scene__label">Request path</div>
    <div class="message-scene__card">
      <strong>Magento receives a path</strong>
      <span>The browser asked for a URL, and Magento now has to decide what that path means.</span>
      <span class="message-scene__route">GET /customer/account/login</span>
      <div class="message-scene__subtext">"Which code owns this URL?"</div>
    </div>
  </div>

  <div class="message-scene__track">
    <div class="message-scene__rail"></div>
    <div class="message-scene__chip message-scene__chip--request">Match route</div>
    <div class="message-scene__chip message-scene__chip--response">Run action</div>
  </div>

  <div class="message-scene__panel message-scene__panel--server">
    <div class="message-scene__label">Magento router</div>
    <div class="message-scene__card message-scene__card--response">
      <strong>Chooses controller code</strong>
      <span>Magento matches the URL to a route, controller, and action class.</span>
      <span class="message-scene__route">customer / account / login</span>
      <div class="message-scene__subtext">"Run the login page action."</div>
    </div>
  </div>
</div>

## Watch the visual first

This visual zooms into the moment after Magento starts running.

1. Magento receives a request path such as `/customer/account/login`.
2. Magento looks for the route name, usually the first useful URL segment.
3. The route points to one or more Magento modules.
4. Magento maps the next URL parts to a controller and action.
5. The chosen action runs and returns page output, JSON, a redirect, or an error.

What changed on screen: "Magento builds the page" became "Magento first chooses which code should run."

## The short story

Magento does not run every module for every URL.

It uses routing. A route is a rule that connects a URL pattern to module code. For many frontend URLs, the first segment is the route front name. In `/customer/account/login`, `customer` is the front name, `account` points to a controller folder, and `login` points to an action class.

That means this URL usually leads toward code shaped like:

```text
Magento_Customer/Controller/Account/Login.php
```

Product and category URLs are trickier. A pretty URL like `/juno-jacket.html` often goes through Magento URL rewrites first. The rewrite may point to an internal route such as:

```text
catalog/product/view/id/42
```

Then Magento handles it like a normal route: `catalog` route, `product` controller, `view` action.

## What you should notice

<div class="conversation-scene__notes">
  <div class="conversation-scene__note">
    <strong>URL parts have jobs</strong>
    <span>A path can point to route, controller, and action pieces.</span>
  </div>
  <div class="conversation-scene__note">
    <strong>Modules declare routes</strong>
    <span>A module tells Magento which front name it wants to handle.</span>
  </div>
  <div class="conversation-scene__note">
    <strong>Pretty URLs may be rewrites</strong>
    <span>Product and category URLs often hide the internal route.</span>
  </div>
</div>

## Common confusion

It is common to search the codebase for the full browser URL and find nothing. That does not mean the URL is magic. It usually means Magento translated the visible URL into an internal route first.

Another common confusion is thinking there is only one possible module behind a route. Multiple modules can participate in the same route area, and Magento decides the final matching class from route configuration and module order.

## What we are still leaving out

We are not explaining layout XML, blocks, templates, plugins, observers, or dependency injection yet. This lesson only answers the first ownership question: "Which controller/action does this URL reach?"

## Check yourself

- In `/customer/account/login`, which part looks like the route front name?
- Why might `/juno-jacket.html` not match a controller file directly?
- If a product URL fails, why is `catalog/product/view` a useful internal clue?

You should now understand that Magento chooses code by matching the request path to routes, controllers, actions, and sometimes URL rewrites.

## Use this in real work

Use this when a page fails and you need to find which module or controller owns the request before changing code.

[Field guide: find which Magento code handles a URL](field-guide/find-which-magento-code-handles-url.md){ .lesson-link }
[Field guide: product page shows 500](field-guide/product-page-shows-500.md){ .lesson-link }
[Field guide: search files on a server](field-guide/search-files-on-server.md){ .lesson-link }

[Next: How Magento turns layout into page HTML](how-magento-turns-layout-into-html.md){ .next-lesson }
