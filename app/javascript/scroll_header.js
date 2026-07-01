const COMPACT_AT = 72;
const EXPAND_AT = 24;

let ticking = false;
let bound = false;

function syncHeaderState() {
  ticking = false;
  const header = document.querySelector(".site-header");
  if (!header) return;

  const y = window.scrollY;
  const compact = header.classList.contains("site-header--compact");

  if (!compact && y > COMPACT_AT) {
    header.classList.add("site-header--compact");
  } else if (compact && y < EXPAND_AT) {
    header.classList.remove("site-header--compact");
  }
}

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(syncHeaderState);
}

function bindScrollHeader() {
  if (bound) return;
  bound = true;
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initScrollHeader() {
  bindScrollHeader();
  syncHeaderState();
}

document.addEventListener("turbo:load", initScrollHeader);
document.addEventListener("DOMContentLoaded", initScrollHeader);
