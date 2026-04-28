# Static File or Made Page?

<div class="response-kind-scene">
  <div class="response-kind-scene__lane response-kind-scene__lane--file">
    <div class="response-kind-scene__endpoint response-kind-scene__endpoint--browser">
      <div class="response-kind-scene__label">Browser asks</div>
      <strong>GET /logo.png</strong>
      <span>"Please send this image."</span>
    </div>

    <div class="response-kind-scene__motion">
      <div class="response-kind-scene__rail"></div>
      <div class="response-kind-scene__chip response-kind-scene__chip--file-request">Request</div>
      <div class="response-kind-scene__chip response-kind-scene__chip--file-response">Response</div>
    </div>

    <div class="response-kind-scene__endpoint response-kind-scene__endpoint--server">
      <div class="response-kind-scene__label">Server answers</div>
      <strong>Existing file</strong>
      <span>The file is already there, so the server sends it back.</span>
      <div class="response-kind-scene__badge">logo.png</div>
    </div>
  </div>

  <div class="response-kind-scene__lane response-kind-scene__lane--made">
    <div class="response-kind-scene__endpoint response-kind-scene__endpoint--browser">
      <div class="response-kind-scene__label">Browser asks</div>
      <strong>GET /product</strong>
      <span>"Please send this product page."</span>
    </div>

    <div class="response-kind-scene__motion">
      <div class="response-kind-scene__rail"></div>
      <div class="response-kind-scene__chip response-kind-scene__chip--page-request">Request</div>
      <div class="response-kind-scene__chip response-kind-scene__chip--page-response">Response</div>
    </div>

    <div class="response-kind-scene__endpoint response-kind-scene__endpoint--server">
      <div class="response-kind-scene__label">Server answers</div>
      <strong>Made page</strong>
      <span>The server prepares the page first, then sends it back.</span>
      <div class="response-kind-scene__steps">
        <span>Find product</span>
        <span>Build HTML</span>
      </div>
    </div>
  </div>
</div>

## Watch the visual first

There are two lanes because not every response is created the same way.

1. In the top lane, the browser asks for `logo.png`.
2. The server already has that file, so it sends the file back.
3. In the bottom lane, the browser asks for `/product`.
4. The server cannot just grab one finished file, so something must prepare the page first.
5. The browser still receives a response at the end of both lanes.

What changed on screen: one response is an existing file, the other response is made before it is returned.

## The short story

The browser can ask for different kinds of things.

Sometimes it asks for a file that already exists, like an image or a stylesheet. The server can send that file back directly.

Sometimes it asks for a page that does not already exist as one finished file. The server has to build the answer first, then send the finished page back.

## What you should notice

<div class="conversation-scene__notes">
  <div class="conversation-scene__note">
    <strong>Files are already there</strong>
    <span>An image, CSS file, or JavaScript file can be returned as-is.</span>
  </div>
  <div class="conversation-scene__note">
    <strong>Pages may be built</strong>
    <span>A product page can depend on product data, layout rules, and current settings.</span>
  </div>
  <div class="conversation-scene__note">
    <strong>The browser still receives a response</strong>
    <span>Whether it was a file or a built page, the browser gets something back.</span>
  </div>
</div>

## Common confusion

It is easy to imagine every page as a file waiting somewhere on the server. Some pages are like that, but Magento product pages usually are not. Magento prepares the page when the browser asks for it.

## What we are still leaving out

We are not naming PHP, Magento routing, cache, or databases yet. For now, the only distinction is: some responses are existing files, and some responses are made before they are sent back.

## Check yourself

- Is `/logo.png` more likely an existing file or a made page?
- Is `/checkout/cart` more likely an existing file or a made page?
- If an image is missing, should you start with Magento code or with whether the file can be served?

You should now understand that some responses are existing files and some responses must be built first.

## Use this in real work

Use this when a CSS, image, or JavaScript file is missing, or when you need to decide whether nginx should serve a file directly or pass the request into Magento.

[Field guide: find the site config](field-guide/find-site-config.md){ .lesson-link }
[Field guide: find nginx logs](field-guide/find-nginx-logs.md){ .lesson-link }
[Field guide: clear Magento cache](field-guide/clear-magento-cache.md){ .lesson-link }

[Next: What does the web server do?](what-does-the-web-server-do.md){ .next-lesson }
