import React from "react";
import { createRoot } from "react-dom/client";
import { HomePage } from "./homepage/HomePage";

function readPayload() {
  const el = document.getElementById("homepage-props");
  if (!el?.textContent) return {};
  try {
    return JSON.parse(el.textContent);
  } catch {
    return {};
  }
}

let homeRoot = null;

function mountHomepage() {
  const mount = document.getElementById("lawrence-home-mount");
  if (!mount) return;

  const payload = readPayload();
  let shell = document.getElementById("lawrence-home-root");
  if (!shell) {
    shell = document.createElement("div");
    shell.id = "lawrence-home-root";
    shell.className = "min-h-screen";
    mount.appendChild(shell);
  }

  // Turbo cache can restore the shell DOM while JS state was cleared on unmount.
  if (!homeRoot) {
    homeRoot = createRoot(shell);
  }

  homeRoot.render(<HomePage data={payload} />);
}

function unmountHomepage() {
  if (homeRoot) {
    homeRoot.unmount();
    homeRoot = null;
  }
  document.getElementById("lawrence-home-root")?.remove();
}

document.addEventListener("turbo:load", mountHomepage);
document.addEventListener("turbo:before-cache", unmountHomepage);

if (document.readyState !== "loading") mountHomepage();
else document.addEventListener("DOMContentLoaded", mountHomepage);
