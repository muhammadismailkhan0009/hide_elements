let selectedElement = null;
window.selectionMode = false;

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "toggleSelectionMode") {
    window.selectionMode = !window.selectionMode;
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
  if (!window.selectionMode) return;
  if (selectedElement) return;
  event.target.style.outline = "2px dashed red";
}, true);

document.addEventListener("mouseout", (event) => {
  if (!window.selectionMode) return;
  if (selectedElement) return;
  event.target.style.outline = "";
}, true);


document.addEventListener("click", (event) => {
  if (!window.selectionMode) return;

  if (selectedElement) {
    selectedElement.style.outline = "";
  }

  selectedElement = event.target;
  selectedElement.style.outline = "3px solid blue";  // Confirm selection

  let selector = getUniqueSelector(selectedElement);
  let domain = window.location.hostname;

  if (confirm("Hide this element permanently?")) {
    chrome.storage.local.get([domain], (data) => {
      let hiddenSelectors = data[domain] || [];
      if (!hiddenSelectors.includes(selector)) {
        hiddenSelectors.push(selector);
        chrome.storage.local.set({ [domain]: hiddenSelectors });
        selectedElement.style.display = "none";
      }
    });
  } else {
    selectedElement.style.outline = "";
  }

  window.selectionMode = false; // Exit selection mode after selection
}, true);


// Function to hide stored elements on page load
function hideStoredElements() {
  console.log("running the hide stored elements");
  let domain = window.location.hostname;
  chrome.storage.local.get([domain], (data) => {
    let hiddenSelectors = data[domain] || [];
    hiddenSelectors.forEach(selector => {
      let elements = document.querySelectorAll(selector);
      elements.forEach(el => el.style.display = "none");
    });
  });
}

// Run the hiding function on page load
hideStoredElements();
