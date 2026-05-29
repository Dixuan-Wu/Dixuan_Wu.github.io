(function () {
  const STORAGE_KEY = "homepage-language";

  function getInitialLanguage() {
    const params = new URLSearchParams(window.location.search);
    const queryLang = params.get("lang");

    if (queryLang === "zh" || queryLang === "en") {
      return queryLang;
    }

    return localStorage.getItem(STORAGE_KEY) || "en";
  }

  function applyLanguage(lang) {
    const root = document.documentElement;

    root.classList.remove("lang-en", "lang-zh");
    root.classList.add("lang-" + lang);
    root.setAttribute("lang", lang === "zh" ? "zh-CN" : "en");

    localStorage.setItem(STORAGE_KEY, lang);

    document.querySelectorAll("[data-lang-toggle]").forEach(function (el) {
      el.textContent = lang === "zh" ? "English" : "中文";
      el.setAttribute(
        "aria-label",
        lang === "zh" ? "Switch to English" : "切换到中文"
      );
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyLanguage(getInitialLanguage());

    document.querySelectorAll("[data-lang-toggle]").forEach(function (el) {
      el.addEventListener("click", function (event) {
        event.preventDefault();

        const currentLang = document.documentElement.classList.contains("lang-zh")
          ? "zh"
          : "en";

        applyLanguage(currentLang === "zh" ? "en" : "zh");
      });
    });
  });
})();
