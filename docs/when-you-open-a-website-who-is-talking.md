# When You Open a Website, Who Is Talking?

<div class="conversation-scene">
  <div class="conversation-scene__stage">
    <div class="conversation-scene__card conversation-scene__card--browser">
      <div class="conversation-scene__window-bar">
        <span></span><span></span><span></span>
        <div class="conversation-scene__url">shop.example.com/product</div>
      </div>
      <div class="conversation-scene__panel">
        <div class="conversation-scene__hero">
          <strong>Browser</strong>
          <span>This is where the person clicks a link or types an address.</span>
        </div>
        <div class="conversation-scene__browser-screen">
          <div class="conversation-scene__browser-state conversation-scene__browser-state--idle">
            <div class="conversation-scene__product-preview">
              <div class="conversation-scene__thumb"></div>
              <div class="conversation-scene__copy">
                <strong>Product link</strong>
                <span>Customer clicks to open the page.</span>
              </div>
            </div>
            <div class="conversation-scene__click-target">Open product page</div>
          </div>

          <div class="conversation-scene__browser-state conversation-scene__browser-state--loading">
            <div class="conversation-scene__loading-pill">Waiting for answer...</div>
            <div class="conversation-scene__line"></div>
            <div class="conversation-scene__line conversation-scene__line--mid"></div>
            <div class="conversation-scene__line conversation-scene__line--short"></div>
            <div class="conversation-scene__spinner"></div>
          </div>

          <div class="conversation-scene__browser-state conversation-scene__browser-state--rendered">
            <div class="conversation-scene__render-card">
              <div class="conversation-scene__thumb conversation-scene__thumb--full"></div>
              <div class="conversation-scene__render-copy">
                <strong>Product page appears</strong>
                <span>Name, image, and actions are now visible on screen.</span>
                <div class="conversation-scene__pill">Now the browser can show the page</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="conversation-scene__bridge">
      <div class="conversation-scene__track"></div>
      <div class="conversation-scene__bubble conversation-scene__bubble--request">Can I have this page?</div>
      <div class="conversation-scene__bubble conversation-scene__bubble--response">Here is the page.</div>
    </div>

    <div class="conversation-scene__card conversation-scene__card--server">
      <div class="conversation-scene__window-bar">
        <span></span><span></span><span></span>
        <div class="conversation-scene__url">server</div>
      </div>
      <div class="conversation-scene__panel">
        <div class="conversation-scene__hero">
          <strong>Server</strong>
          <span>This machine receives the ask and sends back a result.</span>
        </div>
        <div class="conversation-scene__server-flow">
          <div class="conversation-scene__server-step conversation-scene__server-step--receive">
            <strong>1. Receives the ask</strong>
            <span>The server notices the incoming request.</span>
          </div>
          <div class="conversation-scene__server-step conversation-scene__server-step--prepare">
            <strong>2. Prepares an answer</strong>
            <span>It decides what should be sent back.</span>
          </div>
          <div class="conversation-scene__server-step conversation-scene__server-step--send">
            <strong>3. Sends the result</strong>
            <span>The answer goes back to the browser.</span>
          </div>
          <div class="conversation-scene__server-light"></div>
        </div>
      </div>
    </div>
  </div>

</div>

## The short story

Someone opens a product page. Their browser sends a message asking for that page. The server receives the message, prepares an answer, and sends it back. The browser then shows that answer as a website.

That is the first mental model to keep: a website starts as a back-and-forth between a browser and a server.

## What you should notice

<div class="conversation-scene__notes">
  <div class="conversation-scene__note">
    <strong>Two sides</strong>
    <span>A browser and a server are talking to each other.</span>
  </div>
  <div class="conversation-scene__note">
    <strong>Ask first</strong>
    <span>The browser starts the conversation. The page does not appear by itself.</span>
  </div>
  <div class="conversation-scene__note">
    <strong>Answer second</strong>
    <span>The server sends something back for the browser to show on screen.</span>
  </div>
</div>

## Common confusion

People often say "the browser opened the page" as if the whole page already lived in the browser. That is not usually true. The browser often has to ask another machine for the page before it can show anything useful.

## Later, we will add more detail

This lesson leaves out many things on purpose. We are not naming web servers, PHP, Magento, databases, or caches yet. Those are real parts of the story, but they belong after this first picture feels natural.
