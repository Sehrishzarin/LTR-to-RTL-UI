chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ language: "Arabic" }); // Default language
});
