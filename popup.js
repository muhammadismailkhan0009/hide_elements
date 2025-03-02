
// document.addEventListener("DOMContentLoaded", () => {
//   let selectElementBtn = document.getElementById("select-element");

//   selectElementBtn.addEventListener("click", () => {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       chrome.tabs.sendMessage(tabs[0].id, { action: "toggleSelectionMode" });
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  let selectElementBtn = document.getElementById("select-element");
  let clearBtn = document.getElementById("clear");
  let list = document.getElementById("hidden-list");

  // Handle "Select Element" button
  selectElementBtn.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "toggleSelectionMode" });
    });
  });

  // Fetch and display hidden elements for the current domain
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let domain = new URL(tabs[0].url).hostname;

    // chrome.storage.local.get([domain], (data) => {
    //   let hiddenSelectors = data[domain] || [];

    //   hiddenSelectors.forEach(selector => {
    //     let li = document.createElement("li");
    //     li.textContent = selector;
    //     list.appendChild(li);
    //   });
    // });

    // Handle "Clear Hidden Elements" button
    clearBtn.addEventListener("click", () => {
      chrome.storage.local.remove(domain, () => {
        alert(`Hidden elements cleared for ${domain}!`);
        list.innerHTML = "";

        // Reload the page so hidden elements reappear naturally
        chrome.tabs.reload(tabs[0].id);
      });
    });
  });
});
