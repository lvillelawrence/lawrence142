import React from "react";

function Byline({ authors }) {
  if (!authors?.length) return null;
  return (
    <p className="mt-2 font-ui text-[0.75rem] font-medium uppercase tracking-[0.14em] text-muted">
      {authors.map((a, i) => (
        <span key={`${a.href}-${i}`}>
          {i > 0 && (i === authors.length - 1 ? " and " : ", ")}
          <a href={a.href} className="text-ink">
            {a.name}
            {a.classYear ? ` ’${a.classYear}` : ""}
          </a>
        </span>
      ))}
    </p>
  );
}

export function ArticleCard({ article, variant = "standard" }) {
  if (!article) return null;

  if (variant === "compact") {
    return (
      <article className="group border-t border-line pt-4">
        <a href={article.href} className="block">
          <h3 className="font-display text-lg font-semibold leading-snug text-ink transition-colors duration-editorial group-hover:text-accent">
            {article.title}
          </h3>
        </a>
        <Byline authors={article.authors} />
        {article.dek ? (
          <a href={article.href} className="mt-2 block">
            <p className="font-body text-sm leading-relaxed text-muted line-clamp-3">{article.dek}</p>
          </a>
        ) : null}
      </article>
    );
  }

  if (variant === "featured") {
    return (
      <article className="group">
        <a href={article.href} className="block overflow-hidden">
          {article.image ? (
            <div className="overflow-hidden">
              <img
                src={article.image}
                alt=""
                className="aspect-[16/10] w-full object-cover transition-transform duration-[420ms] ease-out group-hover:scale-[1.02]"
              />
            </div>
          ) : (
            <div className="aspect-[16/10] w-full bg-line/40" aria-hidden />
          )}
        </a>
        <a href={article.href} className="mt-4 block">
          <h2 className="font-display text-display-md font-semibold text-ink transition-colors duration-editorial group-hover:text-accent">
            {article.title}
          </h2>
        </a>
        <Byline authors={article.authors} />
        {article.dek ? (
          <a href={article.href} className="mt-3 block max-w-measure">
            <p className="font-body text-deck text-muted">{article.dek}</p>
          </a>
        ) : null}
      </article>
    );
  }

  /* standard */
  return (
    <article className="group">
      <a href={article.href} className="block overflow-hidden">
        {article.image ? (
          <div className="overflow-hidden">
            <img
              src={article.image}
              alt=""
              className="aspect-[5/3] w-full object-cover transition-transform duration-[420ms] ease-out group-hover:scale-[1.02]"
            />
          </div>
        ) : null}
      </a>
      <a href={article.href} className="mt-3 block">
        <h3 className="font-display text-xl font-semibold leading-snug text-ink transition-colors duration-editorial group-hover:text-accent md:text-2xl">
          {article.title}
        </h3>
      </a>
      <Byline authors={article.authors} />
      {article.dek ? (
        <a href={article.href} className="mt-2 block">
          <p className="font-body text-sm leading-relaxed text-muted line-clamp-3 md:text-[0.95rem]">{article.dek}</p>
        </a>
      ) : null}
    </article>
  );
}
