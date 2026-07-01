import React, { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { HeaderIcons } from "./HeaderIcons";
import { SiteNavPanel } from "./SectionsMenu";
import { PRIMARY_NAV } from "./navLinks";

export function Navbar({ meta }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((v) => !v);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="site-container">
        <div className="site-header__bar flex items-end justify-between gap-4">
          <div className="flex min-w-[5.5rem] items-center gap-2 md:min-w-[7rem]">
            <button
              type="button"
              className={`site-header__menu-btn${menuOpen ? " is-active" : ""}`}
              aria-expanded={menuOpen}
              aria-controls="lawrence-sections-menu"
              onClick={toggleMenu}
            >
              <span className="site-header__menu-icon" aria-hidden>
                <span />
                <span />
                <span />
              </span>
              <span className="hidden font-ui text-[0.65rem] font-semibold uppercase tracking-[0.14em] sm:inline">
                {menuOpen ? "Close" : "Menu"}
              </span>
            </button>
            <div className="site-header__meta hidden flex-col md:flex">
              <span className="font-ui text-[0.65rem] font-medium text-muted">{meta?.dateLine}</span>
              <a href="/issues/latest" className="editorial-link mt-0.5 font-ui text-[0.65rem] font-medium text-ink transition-colors hover:text-accent">
                Latest Issue
              </a>
            </div>
          </div>

          <a href="/" className="site-header__brand flex flex-1 flex-col items-center md:flex-initial">
            {meta?.logoPath ? (
              <span className="site-header__logo-wrap">
                <img src={meta.logoPath} alt="The Lawrence" className="site-logo site-header__logo transition-opacity hover:opacity-85" />
              </span>
            ) : (
              <span className="site-header__wordmark font-display font-semibold tracking-tight">The Lawrence</span>
            )}
            <span className="site-header__tagline-wrap">
              <span className="site-header__tagline">{meta?.tagline}</span>
            </span>
          </a>

          <div className="flex min-w-[5.5rem] items-center justify-end gap-2 md:min-w-[7rem] md:gap-2">
            <HeaderIcons instagramUrl={meta?.instagramUrl} />
            <ThemeToggle />
            <a href="/subscribe" className="hidden font-ui text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-accent transition-colors hover:text-accentMuted md:inline">
              Subscribe
            </a>
            <a href="/search" className="text-ink transition-colors hover:text-accent md:hidden" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </a>
          </div>
        </div>

        <nav className="site-header__nav hidden border-t border-line md:block" aria-label="Main">
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 py-2.5">
            {PRIMARY_NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`nav-link editorial-link px-1 py-1 font-ui text-[0.68rem] font-medium uppercase tracking-[0.14em] transition-colors hover:text-accent ${
                    item.muted ? "text-muted" : "text-ink"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <SiteNavPanel open={menuOpen} onClose={closeMenu} meta={meta} />
    </header>
  );
}
