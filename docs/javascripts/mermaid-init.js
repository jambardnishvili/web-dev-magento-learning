document.addEventListener("DOMContentLoaded", function () {
  if (window.mermaid) {
    window.mermaid.initialize({
      startOnLoad: true,
      theme: "neutral",
      securityLevel: "loose",
      flowchart: {
        curve: "basis"
      }
    });
  }
});

