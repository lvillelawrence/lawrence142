import React from "react";

export function SectionHeader({ title, viewAllPath }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-ink pb-3">
      <h2 className="font-ui text-xs font-semibold uppercase tracking-[0.22em] text-ink">{title}</h2>
      {viewAllPath ? (
        <a
          href={viewAllPath}
          className="editorial-link font-ui text-xs font-medium uppercase tracking-[0.18em] text-accent"
        >
          View All
        </a>
      ) : null}
    </div>
  );
}
