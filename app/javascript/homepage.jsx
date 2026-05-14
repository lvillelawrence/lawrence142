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

const mount = document.getElementById("lawrence-home-mount");
if (mount) {
  const shell = document.createElement("div");
  shell.id = "lawrence-home-root";
  mount.appendChild(shell);
  const root = createRoot(shell);
  root.render(<HomePage data={readPayload()} />);
}
