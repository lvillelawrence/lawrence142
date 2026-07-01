import React from "react";

export function Byline({ authors, section, className = "" }) {
  if (!authors?.length && !section) return null;

  return (
    <p className={`my-2 font-body text-sm text-muted ${className}`}>
      {authors?.map((a, i) => (
        <span key={`${a.href}-${i}`}>
          {i > 0 && (i === authors.length - 1 ? " and " : ", ")}
          <a href={a.href} className="author-link font-medium text-accent underline decoration-accent/30 underline-offset-2 transition-colors duration-editorial hover:text-accentMuted hover:decoration-accent">
            {a.name}
            {a.classYear ? ` ’${a.classYear}` : ""}
          </a>
        </span>
      ))}
      {section ? (
        <>
          {" "}
          | <span className="font-semibold text-ink">{section}</span>
        </>
      ) : null}
    </p>
  );
}

export function ClassicArticleTeaser({
  article,
  size = "medium",
  showImage = false,
  showExcerpt = true,
  className = "",
}) {
  if (!article) return null;

  const titleClass =
    size === "lead"
      ? "font-display text-[1.75rem] font-semibold leading-tight text-ink sm:text-[2rem]"
      : size === "large"
        ? "font-display text-xl font-semibold leading-snug text-ink"
        : "font-display text-lg font-semibold leading-snug text-ink";

  return (
    <article className={`classic-teaser group ${className}`}>
      <a href={article.href} className="classic-teaser__title-link block">
        <h2 className={`${titleClass} transition-colors duration-editorial group-hover:text-accent`}>
          {article.title}
        </h2>
      </a>
      <Byline authors={article.authors} section={article.section} />
      <a href={article.href} className="classic-teaser__body-link mt-1 block">
        {showImage && article.image ? (
          <div className="classic-teaser__image-wrap mb-2 overflow-hidden">
            <img
              src={article.image}
              alt=""
              className="w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              loading="lazy"
              decoding="async"
            />
          </div>
        ) : null}
        {showExcerpt && article.dek ? (
          <p className="font-body text-sm leading-relaxed text-muted transition-colors duration-editorial group-hover:text-ink/80">
            {article.dek}
          </p>
        ) : null}
      </a>
    </article>
  );
}

export function SidebarSection({ title, badge, articles, showExcerptOnMobile = true }) {
  if (!articles?.length && !title) return null;

  return (
    <div className="sidebar-section">
      {badge ? (
        <span className="mb-2 inline-block bg-accent px-2 py-0.5 font-ui text-[0.6rem] font-bold uppercase tracking-wider text-paper">
          {badge}
        </span>
      ) : null}
      <h2 className="font-display text-2xl font-semibold text-ink">{title}</h2>
      <div className="mt-3 space-y-0">
        {articles.map((article, i) => (
          <div key={article.id} className={i > 0 ? "border-t border-line pt-4 mt-4" : ""}>
            <ClassicArticleTeaser
              article={article}
              size="large"
              showExcerpt={showExcerptOnMobile}
              className="sidebar-teaser"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
