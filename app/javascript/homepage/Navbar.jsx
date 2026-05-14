import React, { useState } from "react";

const SECTIONS = [
  { label: "News", href: "/sections/news" },
  { label: "Opinion", href: "/sections/opinions" },
  { label: "Features", href: "/sections/features" },
  { label: "Arts", href: "/sections/arts" },
  { label: "Sports", href: "/sections/sports" },
  { label: "Editorials", href: "/sections/editorials" },
];

export function Navbar({ meta }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/80">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-3 md:py-4">
          <div className="hidden min-w-[7rem] flex-col md:flex">
            <span className="font-ui text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted">
              {meta?.dateLine}
            </span>
            <a href="/issues/latest" className="editorial-link mt-1 w-fit font-ui text-[0.65rem] font-medium text-ink">
              Latest Issue
            </a>
          </div>

          <a href="/" className="flex flex-1 flex-col items-center md:flex-initial">
            {meta?.logoPath ? (
              <img src={meta.logoPath} alt="The Lawrence" className="h-8 w-auto md:h-9" />
            ) : (
              <span className="font-display text-2xl font-semibold tracking-tight">The Lawrence</span>
            )}
            <span className="mt-1 hidden text-center font-ui text-[0.7rem] text-muted sm:block">{meta?.tagline}</span>
          </a>

          <div className="flex items-center gap-3 md:min-w-[7rem] md:justify-end">
            <a
              href={meta?.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden font-ui text-[0.65rem] font-medium uppercase tracking-[0.14em] text-ink md:inline editorial-link"
            >
              Instagram
            </a>
            <a
              href="/subscribe"
              className="hidden font-ui text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-accent md:inline editorial-link"
            >
              Subscribe
            </a>
            <a href="/search" className="text-ink" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center border border-line md:hidden"
              aria-expanded={open}
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        <nav className="hidden border-t border-line md:block">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-3">
            <li>
              <a href="/masthead" className="editorial-link font-ui text-[0.7rem] font-medium uppercase tracking-[0.16em] text-muted">
                Masthead
              </a>
            </li>
            {SECTIONS.map((s) => (
              <li key={s.href}>
                <a href={s.href} className="editorial-link font-ui text-[0.7rem] font-medium uppercase tracking-[0.16em] text-ink">
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <a href="/issues" className="editorial-link font-ui text-[0.7rem] font-medium uppercase tracking-[0.16em] text-ink">
                Issues
              </a>
            </li>
            <li>
              <a href="/crossword" className="editorial-link font-ui text-[0.7rem] font-medium uppercase tracking-[0.16em] text-ink">
                Crossword
              </a>
            </li>
            <li>
              <a href="/contact" className="editorial-link font-ui text-[0.7rem] font-medium uppercase tracking-[0.16em] text-muted">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {open ? (
          <nav className="border-t border-line py-4 md:hidden">
            <ul className="flex flex-col gap-3">
              {SECTIONS.map((s) => (
                <li key={s.href}>
                  <a href={s.href} className="font-ui text-sm font-medium uppercase tracking-[0.12em] text-ink">
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="/issues" className="font-ui text-sm font-medium uppercase tracking-[0.12em] text-ink">
                  Issues
                </a>
              </li>
              <li>
                <a href="/masthead" className="font-ui text-sm text-muted">
                  Masthead
                </a>
              </li>
              <li>
                <a href="/crossword" className="font-ui text-sm text-muted">
                  Crossword
                </a>
              </li>
              <li>
                <a href="/subscribe" className="font-ui text-sm font-semibold text-accent">
                  Subscribe
                </a>
              </li>
            </ul>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
