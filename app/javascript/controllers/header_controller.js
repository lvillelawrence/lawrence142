import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["menu", "menuButton"];

  connect() {
    this.onKeydown = this.onKeydown.bind(this);
    window.addEventListener("keydown", this.onKeydown);
  }

  disconnect() {
    window.removeEventListener("keydown", this.onKeydown);
  }

  onKeydown(event) {
    if (event.key === "Escape") this.closeMenu();
  }

  toggleMenu() {
    if (this.menuTarget.classList.contains("is-open")) this.closeMenu();
    else this.openMenu();
  }

  openMenu() {
    if (!this.hasMenuTarget) return;
    this.menuTarget.classList.add("is-open");
    this.menuTarget.setAttribute("aria-hidden", "false");
    if (this.hasMenuButtonTarget) {
      this.menuButtonTarget.classList.add("is-active");
      this.menuButtonTarget.setAttribute("aria-expanded", "true");
      const label = this.menuButtonTarget.querySelector(".site-header__menu-label");
      if (label) label.textContent = "Close";
    }
  }

  closeMenu() {
    if (!this.hasMenuTarget) return;
    this.menuTarget.classList.remove("is-open");
    this.menuTarget.setAttribute("aria-hidden", "true");
    if (this.hasMenuButtonTarget) {
      this.menuButtonTarget.classList.remove("is-active");
      this.menuButtonTarget.setAttribute("aria-expanded", "false");
      const label = this.menuButtonTarget.querySelector(".site-header__menu-label");
      if (label) label.textContent = "Menu";
    }
  }
}
