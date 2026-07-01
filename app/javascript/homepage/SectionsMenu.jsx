import React, { useEffect } from "react";
import { PANEL_MORE, PANEL_SECTIONS } from "./navLinks";

export function SiteNavPanel({ open, onClose, meta }) {
  useEffect(() => {
    if (!open) return undefined;

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      id="lawrence-sections-menu"
      className={`site-nav-panel${open ? " is-open" : ""}`}
      aria-hidden={!open}
    >
      <div className="site-nav-panel__accent" aria-hidden />
      <div className="site-nav-panel__inner site-container pb-10 pt-8">
        <div className="site-nav-panel__grid grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <p className="font-ui text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-accent">Sections</p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2 sm:gap-3">
              {PANEL_SECTIONS.map((link, i) => (
                <li key={link.href} className="site-nav-panel__item" style={{ animationDelay: `${0.04 + i * 0.04}s` }}>
                  <a href={link.href} className="site-nav-panel__section-link group block rounded-lg px-3 py-3 transition-colors duration-200 hover:bg-line/25" onClick={onClose}>
                    <span className="font-display text-2xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent">{link.label}</span>
                    <span className="mt-0.5 block font-ui text-xs text-muted">{link.desc}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5 md:border-l md:border-line md:pl-8">
            <p className="font-ui text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-muted">Quick links</p>
            <ul className="mt-5 space-y-1">
              {PANEL_MORE.map((link, i) => (
                <li key={link.href} className="site-nav-panel__item" style={{ animationDelay: `${0.2 + i * 0.035}s` }}>
                  <a
                    href={link.href}
                    className={`site-nav-panel__quick-link block rounded px-3 py-2 font-ui text-sm font-medium tracking-wide transition-colors duration-200 hover:bg-line/25 ${
                      link.accent ? "text-accent hover:text-accentMuted" : "text-ink hover:text-accent"
                    }`}
                    onClick={onClose}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="site-nav-panel__item mt-8 border-t border-line pt-6" style={{ animationDelay: "0.38s" }}>
              <p className="font-body text-sm leading-relaxed text-muted">{meta?.tagline}</p>
              <div className="mt-3 flex flex-wrap gap-4">
                <a href={meta?.instagramUrl} target="_blank" rel="noreferrer" className="font-ui text-xs font-medium uppercase tracking-wider text-ink transition-colors hover:text-accent" onClick={onClose}>
                  Instagram
                </a>
                <a href="/search" className="font-ui text-xs font-medium uppercase tracking-wider text-ink transition-colors hover:text-accent" onClick={onClose}>
                  Search
                </a>
                <a href="/contact" className="font-ui text-xs font-medium uppercase tracking-wider text-muted transition-colors hover:text-accent" onClick={onClose}>
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
