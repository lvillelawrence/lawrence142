import React from "react";
import { ArticleCard } from "./ArticleCard";

function RailItem({ article }) {
  if (!article) return null;
  return (
    <article className="group border-t border-line py-4 first:border-t-0 first:pt-0">
      <a href={article.href} className="block">
        <h3 className="font-display text-[1.15rem] font-semibold leading-snug text-ink transition-colors duration-editorial group-hover:text-accent md:text-xl">
          {article.title}
        </h3>
      </a>
      <p className="mt-1 font-ui text-[0.7rem] font-medium uppercase tracking-[0.16em] text-muted">
        {article.section}
      </p>
      {article.dek ? (
        <a href={article.href} className="mt-2 block">
          <p className="font-body text-sm leading-relaxed text-muted line-clamp-3">{article.dek}</p>
        </a>
      ) : null}
    </article>
  );
}

export function FeaturedHero({ featured, railArticles = [] }) {
  if (!featured) {
    return (
      <div className="border-b border-line py-16 text-center">
        <p className="font-body text-muted">No stories published yet.</p>
      </div>
    );
  }

  const rail = railArticles.filter(Boolean).slice(0, 3);

  return (
    <section className="border-b border-line pb-10 pt-6 md:pb-14 md:pt-8">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <ArticleCard article={featured} variant="featured" />
          </div>
          <div className="lg:col-span-5 lg:border-l lg:border-line lg:pl-10">
            <p className="font-ui text-xs font-semibold uppercase tracking-[0.22em] text-muted">The notebook</p>
            <div className="mt-4">
              {rail.length ? (
                rail.map((a) => <RailItem key={a.id} article={a} />)
              ) : (
                <p className="font-body text-sm text-muted">More coverage below.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
