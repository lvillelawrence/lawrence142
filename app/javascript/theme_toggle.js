const STORAGE_KEY = "lawrence-theme";

function isDark() {
  return document.documentElement.classList.contains("dark");
}

function setTheme(dark) {
  if (window.__lawrenceThemeToggle) {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    try {
      localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
    } catch (_) {}
    document.dispatchEvent(new CustomEvent("lawrence-theme-change", { detail: { dark } }));
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      btn.setAttribute("aria-pressed", dark ? "true" : "false");
      btn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    });
    return;
  }

  const root = document.documentElement;
  if (dark) root.classList.add("dark");
  else root.classList.remove("dark");
  try {
    localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
  } catch (_) {}
  document.dispatchEvent(new CustomEvent("lawrence-theme-change", { detail: { dark } }));
  syncAllToggles();
}

function syncAria(btn) {
  const dark = isDark();
  btn.setAttribute("aria-pressed", dark ? "true" : "false");
  btn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
}

function syncAllToggles() {
  document.querySelectorAll("[data-theme-toggle]").forEach(syncAria);
}

function handleToggleClick(event) {
  const btn = event.target.closest("[data-theme-toggle]");
  if (!btn) return;
  event.preventDefault();
  setTheme(!isDark());
}

if (!window.__lawrenceThemeToggle) {
  document.addEventListener("click", handleToggleClick);
  document.addEventListener("turbo:load", syncAllToggles);
  document.addEventListener("turbo:render", syncAllToggles);
  document.addEventListener("lawrence-theme-change", syncAllToggles);

  if (document.readyState !== "loading") syncAllToggles();
  else document.addEventListener("DOMContentLoaded", syncAllToggles);
}

export { STORAGE_KEY, isDark, setTheme };
