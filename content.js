// Fetch the stored language and translate the page
chrome.storage.local.get("language", (data) => {
  const targetLanguage = data.language || "Arabic"; // Default to Arabic
  translatePage(targetLanguage);
});

const translations = {
  Hello: { Arabic: "مرحبا", Hebrew: "שלום" },
  Welcome: { Arabic: "أهلا بك", Hebrew: "ברוך הבא" },
  "Media Storage": { Arabic: "تخزين الوسائط", Hebrew: "אחסון מדיה" },
  "User Profile": { Arabic: "ملف المستخدم", Hebrew: "פרופיל משתמש" },
  // Add more translations here
};

const cache = new Map(); // Cache for translated text

function translatePage(targetLanguage) {
  const elements = document.querySelectorAll("*:not(script):not(style)");

  elements.forEach((el) => {
    if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
      // Text node
      const originalText = el.innerText.trim();

      if (cache.has(originalText)) {
        // Use cached translation
        el.innerText = cache.get(originalText);
      } else if (
        translations[originalText] &&
        translations[originalText][targetLanguage]
      ) {
        // Apply translation and cache it
        const translatedText = translations[originalText][targetLanguage];
        el.innerText = translatedText;
        cache.set(originalText, translatedText);
      }
    }
  });
}
