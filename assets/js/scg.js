function linkifyAnchor(element) {
  const href = element.getAttribute("href");
  if (href.startsWith("/")) { return; }
  if (href.startsWith("https://sandersoncollectorsguild.com/")) { return; }
  if (href.startsWith("https://www.sandersoncollectorsguild.com/")) { return; }

  href.setAttribute("target", "_blank");
}

function linkify() {
  const aTags = document.getElementsByClassName("a");
  for (let i = 0; i < aTags.length; i++) {
    linkifyAnchor(aTags[i]);
  }
}

linkify();
