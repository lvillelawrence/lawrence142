import React, { useCallback, useEffect, useRef, useState } from "react";
import { Byline } from "./ClassicLayout";

function GalleryCard({ article, setCardRef, index }) {
  if (!article) return null;

  return (
    <article
      ref={setCardRef(index)}
      className="section-gallery__card group flex h-full w-[15.5rem] shrink-0 snap-start flex-col sm:w-[17.5rem] lg:w-[18.5rem]"
    >
      <a
        href={article.href}
        className="flex h-full flex-col overflow-hidden rounded border border-line/80 bg-paper transition-all duration-300 hover:border-accent/30 hover:shadow-sm"
      >
        {article.image ? (
          <div className="aspect-[3/2] overflow-hidden bg-line/15">
            <img
              src={article.image}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
          </div>
        ) : null}
        <div className={`flex flex-1 flex-col px-4 py-3.5${article.image ? "" : " pt-4"}`}>
          <h3 className="font-display text-[1.05rem] font-semibold leading-snug text-ink transition-colors group-hover:text-accent line-clamp-3 sm:text-lg">
            {article.title}
          </h3>
          <Byline authors={article.authors} section={null} className="my-1.5 !text-xs" />
          {article.dek ? (
            <p className="mt-auto font-body text-sm leading-relaxed text-muted line-clamp-2">{article.dek}</p>
          ) : null}
        </div>
      </a>
    </article>
  );
}

function pageCountForTrack(el) {
  if (!el) return 1;
  const viewWidth = el.clientWidth;
  const maxScroll = el.scrollWidth - viewWidth;
  if (maxScroll <= 8) return 1;
  return Math.ceil(maxScroll / viewWidth) + 1;
}

function pageIndexForScroll(el) {
  if (!el) return 0;
  const viewWidth = el.clientWidth;
  const maxScroll = el.scrollWidth - viewWidth;
  if (maxScroll <= 8) return 0;
  return Math.min(Math.round(el.scrollLeft / viewWidth), pageCountForTrack(el) - 1);
}

export function SectionGallery({ section }) {
  const articles = section?.articles || [];
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const [pageCount, setPageCount] = useState(1);
  const [activePage, setActivePage] = useState(0);

  const setCardRef = useCallback(
    (index) => (node) => {
      cardRefs.current[index] = node;
    },
    [],
  );

  const syncFromTrack = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setPageCount(pageCountForTrack(el));
    setActivePage(pageIndexForScroll(el));
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return undefined;

    syncFromTrack();
    el.addEventListener("scroll", syncFromTrack, { passive: true });
    window.addEventListener("resize", syncFromTrack);

    return () => {
      el.removeEventListener("scroll", syncFromTrack);
      window.removeEventListener("resize", syncFromTrack);
    };
  }, [syncFromTrack, articles.length]);

  const scrollToPage = (page) => {
    const el = trackRef.current;
    if (!el) return;
    const total = pageCountForTrack(el);
    const clamped = Math.max(0, Math.min(page, total - 1));
    const maxScroll = el.scrollWidth - el.clientWidth;
    const left = total <= 1 ? 0 : (maxScroll * clamped) / (total - 1);

    el.scrollTo({ left, behavior: "smooth" });
    setActivePage(clamped);
  };

  if (!articles.length) return null;

  const canPrev = activePage > 0;
  const canNext = activePage < pageCount - 1;

  return (
    <section className="section-gallery" aria-label={section.title}>
      <div className="section-gallery__header">
        <div className="section-gallery__title-block min-w-0 flex-1">
          <div className="section-gallery__rule" aria-hidden="true" />
          <div className="min-w-0">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-[1.65rem]">{section.title}</h2>
            {pageCount > 1 ? (
              <p className="mt-1 font-ui text-[0.65rem] uppercase tracking-[0.12em] text-muted">
                {activePage + 1} / {pageCount}
              </p>
            ) : null}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 pb-0.5">
          <a
            href={section.viewAllPath}
            className="font-ui text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-accent transition-colors hover:text-accentMuted"
          >
            View all
          </a>
          {pageCount > 1 ? (
            <>
              <button
                type="button"
                className="section-gallery__btn"
                aria-label={`Previous ${section.title} page`}
                disabled={!canPrev}
                onClick={() => scrollToPage(activePage - 1)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                className="section-gallery__btn"
                aria-label={`Next ${section.title} page`}
                disabled={!canNext}
                onClick={() => scrollToPage(activePage + 1)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          ) : null}
        </div>
      </div>

      <div
        ref={trackRef}
        className="section-gallery__track flex snap-x snap-mandatory scroll-smooth"
      >
        {articles.map((article, i) => (
          <GalleryCard key={article.id} article={article} index={i} setCardRef={setCardRef} />
        ))}
      </div>

      {pageCount > 1 ? (
        <div className="section-gallery__dots" role="tablist" aria-label={`${section.title} pages`}>
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              className={`section-gallery__dot${i === activePage ? " is-active" : ""}`}
              aria-label={`Page ${i + 1} of ${pageCount}`}
              aria-selected={i === activePage}
              onClick={() => scrollToPage(i)}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
