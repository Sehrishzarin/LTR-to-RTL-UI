document.getElementById("apply").addEventListener("click", () => {
  const selectedLanguage = document.getElementById("language").value;

  // Store the selected language in storage
  chrome.storage.local.set({ language: selectedLanguage }, () => {
    // Send a message to the content script to apply translations
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["content.js"],
      });
    });
  });
});
