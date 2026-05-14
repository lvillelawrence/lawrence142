import React from "react";

export function NewsletterSignup() {
  return (
    <section className="border-y border-line bg-white">
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-measure">
            <h2 className="font-display text-2xl font-semibold text-ink">The Morning Lawrence</h2>
            <p className="mt-2 font-body text-sm leading-relaxed text-muted">
              Get our headlines in your inbox. One thoughtful note each week — no clutter.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:max-w-md sm:flex-row sm:items-center">
            <a
              href="/subscribe"
              className="inline-flex items-center justify-center border border-ink bg-ink px-6 py-3 font-ui text-xs font-semibold uppercase tracking-[0.16em] text-paper transition-opacity duration-editorial hover:opacity-90"
            >
              Subscribe
            </a>
            <p className="font-ui text-[0.7rem] uppercase tracking-[0.12em] text-muted">
              Free for students &amp; faculty
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
