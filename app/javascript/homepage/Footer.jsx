import React from "react";

const SECTION_LINKS = [
  ["News", "/sections/news"],
  ["Opinions", "/sections/opinions"],
  ["Features", "/sections/features"],
  ["Arts", "/sections/arts"],
  ["Sports", "/sections/sports"],
  ["Editorials", "/sections/editorials"],
];

const PAGE_LINKS = [
  ["Masthead", "/masthead"],
  ["About", "/about"],
  ["Contact", "/contact"],
  ["Charter", "/charter"],
  ["Subscribe", "/subscribe"],
  ["Search", "/search"],
];

const OTHER_LINKS = [
  ["Archives", "https://digitalarchives.lawrenceville.org/olive/apa/lawrenceville/"],
  ["Colophon", "/colophon"],
  ["Editor Login", "/admins/sign_in"],
];

export function Footer({ meta }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-content px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <a href="/" className="inline-flex items-center gap-2">
              {meta?.logoPath ? (
                <img src={meta.logoPath} alt="" className="h-7 w-auto" />
              ) : null}
              <span className="font-display text-lg font-semibold">The Lawrence</span>
            </a>
            <p className="mt-4 font-body text-sm leading-relaxed text-muted">
              Independent student journalism from the Lawrenceville School since 1881.
            </p>
            <p className="mt-4 font-ui text-xs text-muted">
              © {year} <em>The Lawrence</em>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h3 className="font-ui text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ink">Sections</h3>
              <ul className="mt-4 space-y-2">
                {SECTION_LINKS.map(([label, href]) => (
                  <li key={href}>
                    <a href={href} className="editorial-link font-body text-sm text-muted">
                      {label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="/issues" className="editorial-link font-body text-sm text-muted">
                    Issues
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-ui text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ink">Pages</h3>
              <ul className="mt-4 space-y-2">
                {PAGE_LINKS.map(([label, href]) => (
                  <li key={href}>
                    <a href={href} className="editorial-link font-body text-sm text-muted">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="font-ui text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ink">Other</h3>
              <ul className="mt-4 space-y-2">
                {OTHER_LINKS.map(([label, href]) => (
                  <li key={href}>
                    <a href={href} className="editorial-link font-body text-sm text-muted">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
