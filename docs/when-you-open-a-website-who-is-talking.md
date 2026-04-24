# When You Open a Website, Who Is Talking?

## One visual first

<div class="conversation-scene">
  <div class="conversation-scene__eyebrow">Lesson 1</div>
  <div class="conversation-scene__title">A website starts as a conversation between two sides.</div>
  <div class="conversation-scene__intro">
    One side is your browser. The other side is a server somewhere else. The browser asks for a page. The server sends something back.
  </div>

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
        <div class="conversation-scene__line"></div>
        <div class="conversation-scene__line conversation-scene__line--mid"></div>
        <div class="conversation-scene__line conversation-scene__line--short"></div>
        <div class="conversation-scene__pill">Customer opens product page</div>
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
        <div class="conversation-scene__note">
          <strong>It listens</strong>
          <span>It waits for browsers to ask for pages, images, or data.</span>
        </div>
        <div class="conversation-scene__note">
          <strong>It answers</strong>
          <span>It sends back HTML, JSON, or files the browser can use.</span>
        </div>
      </div>
    </div>
  </div>

  <div class="conversation-scene__caption">Watch the message move from the browser to the server, then back again.</div>

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
</div>

## The short story

Someone opens a product page. Their browser sends a message asking for that page. The server receives the message, prepares an answer, and sends it back. The browser then shows that answer as a website.

That is the first mental model to keep: a website starts as a back-and-forth between a browser and a server.

## What you should notice

- The browser is on the user's computer or phone.
- The server is the machine that answers.
- The browser asks first.
- The server answers second.

## Common confusion

People often say "the browser opened the page" as if the whole page already lived in the browser. That is not usually true. The browser often has to ask another machine for the page before it can show anything useful.

## Later, we will add more detail

This lesson leaves out many things on purpose. We are not naming web servers, PHP, Magento, databases, or caches yet. Those are real parts of the story, but they belong after this first picture feels natural.
