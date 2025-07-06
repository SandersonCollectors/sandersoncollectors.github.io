const extSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" viewBox="0 0 24 24" fill="currentColor" class="size-6">
  <path fill-rule="evenodd" d="M15.75 2.25H21a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V4.81L8.03 17.03a.75.75 0 0 1-1.06-1.06L19.19 3.75h-3.44a.75.75 0 0 1 0-1.5Zm-10.5 4.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V10.5a.75.75 0 0 1 1.5 0v8.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3h8.25a.75.75 0 0 1 0 1.5H5.25Z" clip-rule="evenodd" />
</svg>
`;

function hasAnyTextChild(element) {
  if (element.nodeType === 3) { return true; }
  for (let i = 0; i < element.children.length; i++) {
    if (hasAnyTextChild(element.children[i])) { return true; }
  }
  return false;
}

function linkify(element) {
  const href = element.getAttribute("href");
  if (href.startsWith("/")) { return; }
  if (href.startsWith("https://sandersoncollectorsguild.com/")) { return; }
  if (href.startsWith("https://www.sandersoncollectorsguild.com/")) { return; }

  element.setAttribute("target", "_blank");

  if (hasAnyTextChild(element)) {
    var svgContainer = document.createElement('span');
    svgContainer.setAttribute("style", "padding-left: 0.25em;");
    svgContainer.innerHTML = extSVG;
    element.appendChild(svgContainer);
  }
}

function setup() {
  const aTags = document.getElementsByTagName("a");
  for (let i = 0; i < aTags.length; i++) {
    linkify(aTags[i]);
  }
}
