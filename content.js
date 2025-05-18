let selectedElement = null;
let selectionMode = false;

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "toggleSelectionMode") {
    selectionMode = !selectionMode;
  }
});


// Function to generate a unique CSS selector for an element
function getUniqueSelector(element) {
  if (!element) return null;
  let path = [];
  while (element.parentElement) {
    let index = Array.from(element.parentElement.children).indexOf(element) + 1;
    path.unshift(`${element.tagName}:nth-child(${index})`);
    element = element.parentElement;
  }
  return path.join(" > ");
}

document.addEventListener("mouseover", (event) => {
  if (!selectionMode) return;
  if (selectedElement) return;
  event.target.style.outline = "2px dashed red";
}, true);

document.addEventListener("mouseout", (event) => {
  if (!selectionMode) return;
  if (selectedElement) return;
  event.target.style.outline = "";
}, true);


document.addEventListener("click", (event) => {
  if (!selectionMode) return;

  if (selectedElement) {
    selectedElement.style.outline = "";
  }

  selectedElement = event.target;
  selectedElement.style.outline = "3px solid blue";

  let selector = getUniqueSelector(selectedElement);
  let domain = window.location.hostname;

  if (confirm("Hide this element permanently?")) {
    chrome.storage.local.get(null, (data) => {
      let domainData = data[domain] || [];
      if (!domainData.includes(selector)) {
        domainData.push(selector);
        let update = {};
        update[domain] = domainData;
        chrome.storage.local.set(update, () => {
          selectedElement.style.display = "none";
          selectedElement = null;
        });
      } else {
        selectedElement.style.outline = "";
        selectedElement = null;
      }
    });
  } else {
    selectedElement.style.outline = "";
    selectedElement = null;
  }

  selectionMode = false;
}, true);


function hideStoredElements() {
  let domain = window.location.hostname;
  chrome.storage.local.get(null, (data) => {
    if (data && data[domain]) {
      let hiddenSelectors = data[domain];
      hiddenSelectors.forEach(selector => {
        let elements = document.querySelectorAll(selector);
        elements.forEach(el => el.style.display = "none");
      });
    }
  });
}

hideStoredElements();
