# What Does the Web Server Do?

<div class="web-server-scene">
  <div class="web-server-scene__browser">
    <div class="web-server-scene__bar">
      <span></span>
      <span></span>
      <span></span>
      <strong>browser</strong>
    </div>
    <div class="web-server-scene__screen">
      <strong>Customer opens a URL</strong>
      <span>The browser sends the request to the front door first.</span>
      <code>GET /product</code>
    </div>
  </div>

  <div class="web-server-scene__path">
    <div class="web-server-scene__rail web-server-scene__rail--in"></div>
    <div class="web-server-scene__rail web-server-scene__rail--file"></div>
    <div class="web-server-scene__rail web-server-scene__rail--php"></div>
    <div class="web-server-scene__chip web-server-scene__chip--request">Request enters</div>
    <div class="web-server-scene__chip web-server-scene__chip--file">File response</div>
    <div class="web-server-scene__chip web-server-scene__chip--php">Forward to PHP</div>
  </div>

  <div class="web-server-scene__server">
    <div class="web-server-scene__label">Web server</div>
    <strong>Front door decision</strong>
    <span>It receives the request, checks what kind of thing was asked for, then chooses the next step.</span>
    <div class="web-server-scene__decision">
      <div>
        <b>Real file?</b>
        <span>send it back</span>
      </div>
      <div>
        <b>Needs code?</b>
        <span>pass to PHP</span>
      </div>
    </div>
  </div>

  <div class="web-server-scene__targets">
    <div class="web-server-scene__target web-server-scene__target--file">
      <strong>Static files</strong>
      <span>Images, CSS, JavaScript</span>
    </div>
    <div class="web-server-scene__target web-server-scene__target--php">
      <strong>PHP application</strong>
      <span>Magento pages, cart, checkout</span>
    </div>
  </div>
</div>

## Watch the visual first

The web server is the decision point in the middle.

1. The browser sends `GET /product`.
2. The web server receives the request first.
3. If the request is for a real file, the web server can send it back directly.
4. If the request needs application code, the web server forwards it to PHP.
5. Magento pages are usually in the "needs code" path.

What changed on screen: the web server chooses whether to answer directly or pass the work deeper.

## The short story

The web server is the front door. The browser talks to it first.

If the browser asks for a file that already exists, the web server can send that file back.

If the browser asks for a page that must be made, the web server passes the work to PHP.

## What you should notice

<div class="conversation-scene__notes">
  <div class="conversation-scene__note">
    <strong>It receives first</strong>
    <span>The browser does not start by talking directly to Magento.</span>
  </div>
  <div class="conversation-scene__note">
    <strong>It can answer simple requests</strong>
    <span>Images, CSS, and JavaScript files can often be sent directly.</span>
  </div>
  <div class="conversation-scene__note">
    <strong>It forwards app work</strong>
    <span>Product pages and checkout pages need backend code, so the request moves on.</span>
  </div>
</div>

## Common confusion

The web server is not the whole website. It is the entry point. For a Magento page, it usually passes the request deeper into the application.

## What we are still leaving out

We are not naming nginx yet. For now, "web server" is enough: the front-door program that receives browser requests.

## Check yourself

- Does the browser talk to Magento first, or the web server first?
- If `/media/logo.png` exists on disk, who may be able to serve it directly?
- If `/product` needs Magento code, what should the web server do next?

You should now understand that the web server is the front door that either serves a simple file or forwards application work.

## Use this in real work

Use this when a site shows `404`, `502`, a missing static file, or a domain points to the wrong code. The web server is the first server-side component that can route the request correctly or incorrectly.

[Field guide: find the site config](field-guide/find-site-config.md){ .lesson-link }
[Field guide: find nginx logs](field-guide/find-nginx-logs.md){ .lesson-link }
[Field guide: 502 Bad Gateway](field-guide/502-bad-gateway.md){ .lesson-link }

[Next: Where does PHP fit?](where-does-php-fit.md){ .next-lesson }
