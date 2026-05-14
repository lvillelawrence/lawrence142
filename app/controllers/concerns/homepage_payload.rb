# frozen_string_literal: true

module HomepagePayload
  extend ActiveSupport::Concern

  include Rails.application.routes.url_helpers

  private

  def homepage_json_payload
    {
      meta: homepage_meta,
      editorial: article_node(@editorial),
      featured: article_node(@news.first),
      heroRail: hero_rail_articles,
      sections: [
        homepage_section("News", "news", @news.drop(1)),
        homepage_section("Opinion", "opinions", @opinions),
        homepage_section("Features", "features", @features),
        homepage_section("Arts", "arts", @arts),
        homepage_section("Sports", "sports", @sports),
      ].compact,
    }
  end

  def hero_rail_articles
    nodes = [
      article_node(@news.drop(1).first),
      article_node(@features.first),
      article_node(@arts.first),
    ].compact
    nodes.uniq! { |n| n[:id] }
    nodes.first(3)
  end

  def homepage_meta
    {
      dateLine: Time.zone.now.strftime("%A, %B %-d"),
      logoPath: ActionController::Base.helpers.image_path("lawrence.svg"),
      tagline: "The Lawrenceville School's weekly newspaper.",
      instagramUrl: "https://www.instagram.com/thelawrence1881/",
    }
  end

  def homepage_section(title, slug, collection)
    articles = Array(collection).compact
    return nil if articles.empty?

    {
      title: title,
      viewAllPath: "/sections/#{slug}",
      slug: slug,
      articles: articles.filter_map { |a| article_node(a) },
    }
  end

  def article_node(article)
    return nil if article.blank?
    return nil unless article_visible?(article)

    {
      id: article.id,
      title: article.title,
      section: article.section,
      href: article_path(article),
      dek: excerpt_plain(article, 46),
      image: article_image_src(article),
      published: article.published&.iso8601,
      authors: article.authors.map { |author| author_node(author) },
    }
  end

  def author_node(author)
    {
      name: author.fullname,
      href: author_path(author),
      classYear: author.gradyear.present? ? author.gradyear.to_s[-2..] : nil,
    }
  end

  def article_visible?(article)
    return false if article.archived?
    return false if article.status == "Private" && !admin_signed_in?

    true
  end

  def excerpt_plain(article, word_limit)
    text = article.body.to_plain_text.to_s.split(/\s+/)
    return "" if text.empty?

    snippet = text.first([word_limit, text.length].min).join(" ")
    snippet += "…" if text.length > word_limit
    snippet
  end

  def article_image_src(article)
    return nil unless article.image.attached?

    url_for(article.image)
  rescue StandardError
    nil
  end
end
