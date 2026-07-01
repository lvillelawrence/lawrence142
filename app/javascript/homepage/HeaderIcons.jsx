import React from "react";

export function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function GamesIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M8 10h.01M8 14h.01M12 12h.01M16 10h.01M16 14h.01" strokeLinecap="round" strokeWidth="2.5" />
    </svg>
  );
}

export function HeaderIcons({ instagramUrl }) {
  return (
    <>
      {instagramUrl ? (
        <a
          href={instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="site-header__icon-btn hidden md:inline-flex"
          aria-label="Instagram"
        >
          <InstagramIcon />
        </a>
      ) : null}
      <a href="/crossword" className="site-header__icon-btn hidden md:inline-flex" aria-label="Crossword">
        <GamesIcon />
      </a>
    </>
  );
}
