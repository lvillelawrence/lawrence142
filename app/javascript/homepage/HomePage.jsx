import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FeaturedHero } from "./FeaturedHero";
import { SectionHeader } from "./SectionHeader";
import { ArticleCard } from "./ArticleCard";
import { NewsletterSignup } from "./NewsletterSignup";

function EditorialBand({ article }) {
  if (!article) return null;
  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto max-w-content px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-10">
          <div>
            <p className="font-ui text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-accentMuted">Editorial</p>
            <a href={article.href} className="mt-2 block">
              <h2 className="font-display text-2xl font-semibold leading-tight text-ink transition-colors duration-editorial hover:text-accent md:text-3xl">
                {article.title}
              </h2>
            </a>
          </div>
          {article.dek ? (
            <a href={article.href} className="max-w-measure md:pt-6">
              <p className="font-body text-sm leading-relaxed text-muted md:text-[0.95rem]">{article.dek}</p>
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function NewsModule({ section }) {
  const items = section.articles;
  if (!items.length) return null;
  const [a, b, c, ...rest] = items;

  return (
    <section className="border-b border-line py-12 md:py-16">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <SectionHeader title={section.title} viewAllPath={section.viewAllPath} />
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            {a ? <ArticleCard article={a} variant="standard" /> : null}
          </div>
          <div className="space-y-8 lg:col-span-5 lg:border-l lg:border-line lg:pl-8">
            {[b, c].filter(Boolean).map((art) => (
              <ArticleCard key={art.id} article={art} variant="compact" />
            ))}
          </div>
        </div>
        {rest.length ? (
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((art) => (
              <ArticleCard key={art.id} article={art} variant="compact" />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function OpinionModule({ section }) {
  const items = section.articles;
  if (!items.length) return null;

  return (
    <section className="border-b border-line py-12 md:py-16">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <SectionHeader title={section.title} viewAllPath={section.viewAllPath} />
        <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory md:gap-6 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:bg-line">
          {items.map((art) => (
            <div
              key={art.id}
              className="w-[min(100%,22rem)] flex-shrink-0 snap-start border-t border-line pt-4 md:w-[26rem]"
            >
              <ArticleCard article={art} variant="compact" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesModule({ section }) {
  const items = section.articles;
  if (!items.length) return null;
  const [lead, ...others] = items;

  return (
    <section className="border-b border-line py-12 md:py-16">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <SectionHeader title={section.title} viewAllPath={section.viewAllPath} />
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">{lead ? <ArticleCard article={lead} variant="standard" /> : null}</div>
          <div className="space-y-10 lg:col-span-4 lg:border-l lg:border-line lg:pl-8">
            {others.slice(0, 3).map((art) => (
              <ArticleCard key={art.id} article={art} variant="compact" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ArtsModule({ section }) {
  const items = section.articles;
  if (!items.length) return null;

  return (
    <section className="border-b border-line py-12 md:py-16">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <SectionHeader title={section.title} viewAllPath={section.viewAllPath} />
        <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((art, i) => (
            <div key={art.id} className={i === 0 ? "sm:col-span-2 xl:col-span-2" : ""}>
              <ArticleCard article={art} variant={i === 0 ? "standard" : "compact"} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SportsModule({ section }) {
  return <OpinionModule section={section} />;
}

function SectionRenderer({ section }) {
  switch (section.slug) {
    case "news":
      return <NewsModule section={section} />;
    case "opinions":
      return <OpinionModule section={section} />;
    case "features":
      return <FeaturesModule section={section} />;
    case "arts":
      return <ArtsModule section={section} />;
    case "sports":
      return <SportsModule section={section} />;
    default:
      return null;
  }
}

export function HomePage({ data }) {
  const meta = data?.meta || {};
  const sections = data?.sections || [];

  return (
    <div className="min-h-screen">
      <Navbar meta={meta} />
      <main>
        <FeaturedHero featured={data?.featured} railArticles={data?.heroRail} />
        <EditorialBand article={data?.editorial} />
        {sections.map((section) => (
          <SectionRenderer key={section.slug} section={section} />
        ))}
        <NewsletterSignup />
      </main>
      <Footer meta={meta} />
    </div>
  );
}
