import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ClassicArticleTeaser, SidebarSection } from "./ClassicLayout";
import { SectionGallery } from "./SectionGallery";

function ColumnDivider({ className = "" }) {
  return <div className={`hidden border-l border-line md:block ${className}`} aria-hidden />;
}

function HorizontalRule({ className = "" }) {
  return <hr className={`border-line ${className}`} />;
}

export function HomePage({ data }) {
  const meta = data?.meta || {};
  const c = data?.classic || {};
  const sections = c.sections || [];

  return (
    <div className="min-h-screen">
      <Navbar meta={meta} />
      <main className="site-container pb-16 pt-6">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
          {/* Main content — 9 cols */}
          <div className="lg:col-span-9">
            {/* Row 1: lead + mid rail */}
            <div className="grid gap-8 md:grid-cols-12 md:gap-6">
              <div className="md:col-span-7">
                <ClassicArticleTeaser article={c.lead} size="lead" showImage showExcerpt />
              </div>
              <div className="flex gap-4 md:col-span-5">
                <ColumnDivider />
                <div className="min-w-0 flex-1 space-y-6">
                  {c.midRail?.map((article) => (
                    <ClassicArticleTeaser key={article.id} article={article} showExcerpt />
                  ))}
                </div>
              </div>
            </div>

            <HorizontalRule className="my-8" />

            {/* Row 2: two columns with images */}
            <div className="grid gap-8 md:grid-cols-12 md:gap-6">
              <div className="space-y-8 md:col-span-5">
                {c.rowTwoLeft?.map((article, i) => (
                  <React.Fragment key={article.id}>
                    {i > 0 ? <HorizontalRule /> : null}
                    <ClassicArticleTeaser article={article} showImage showExcerpt />
                  </React.Fragment>
                ))}
              </div>
              <div className="flex gap-4 md:col-span-7">
                <ColumnDivider />
                <div className="min-w-0 flex-1 space-y-8">
                  {c.rowTwoRight?.map((article, i) => (
                    <React.Fragment key={article.id}>
                      {i > 0 ? <HorizontalRule /> : null}
                      <ClassicArticleTeaser article={article} showImage showExcerpt />
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar — 3 cols */}
          <aside className="lg:col-span-3">
            <div className="flex gap-4 lg:sticky lg:top-24">
              <ColumnDivider className="hidden lg:block" />
              <div className="min-w-0 flex-1 space-y-8">
                {c.editorial ? (
                  <SidebarSection title="Editorial" badge="New!" articles={[c.editorial]} showExcerptOnMobile={false} />
                ) : null}
                {c.opinions?.length ? (
                  <>
                    <HorizontalRule />
                    <SidebarSection title="Opinions" articles={c.opinions} showExcerptOnMobile={false} />
                  </>
                ) : null}
                {c.sports?.length ? (
                  <>
                    <HorizontalRule />
                    <SidebarSection title="Sports" articles={c.sports} showExcerptOnMobile={false} />
                  </>
                ) : null}
              </div>
            </div>
          </aside>
        </div>

        {/* Section blocks below the fold */}
        {sections.length ? (
          <div className="section-galleries mt-10 border-t border-line pt-10">
            {sections.map((section) => (
              <SectionGallery key={section.slug} section={section} />
            ))}
          </div>
        ) : null}
      </main>
      <Footer meta={meta} />
    </div>
  );
}
