# frozen_string_literal: true

module HomepagePayload
  extend ActiveSupport::Concern

  include Rails.application.routes.url_helpers

  SECTION_GALLERY_SIZE = 7

  def layout_shell_meta
    {
      date_line: Time.zone.now.strftime("%A, %B %-d"),
      logo_path: ActionController::Base.helpers.image_path("lawrence.svg"),
      tagline: "The Lawrenceville School's weekly newspaper.",
      instagram_url: "https://www.instagram.com/thelawrence1881/",
    }
  end

  private

  def homepage_json_payload
    {
      meta: homepage_meta,
      classic: classic_homepage_payload,
    }
  end

  def classic_homepage_payload
    news = Array(@news).compact
    features = Array(@features).compact
    arts = Array(@arts).compact
    opinions = Array(@opinions).compact
    sports = Array(@sports).compact

    featured_ids = []
    lead = news.first
    featured_ids << lead.id if lead

    mid_rail = [features.first, news[1], arts.first].compact
    featured_ids.concat(mid_rail.map(&:id))

    row_two_left = news.drop(2).first(2)
    row_two_right = arts.drop(1).first(2)
    featured_ids.concat((row_two_left + row_two_right).map(&:id))

    editorial = @editorial
    featured_ids << editorial.id if editorial

    opinion_sidebar = opinions.first(4)
    sports_sidebar = sports.first(4)
    featured_ids.concat((opinion_sidebar + sports_sidebar).map(&:id))

    {
      lead: article_node(lead, image_preset: :hero, excerpt_words: 50),
      midRail: mid_rail.filter_map { |a| article_node(a, excerpt_words: 30) },
      rowTwoLeft: row_two_left.filter_map { |a| article_node(a, image_preset: :card, excerpt_words: 30) },
      rowTwoRight: row_two_right.filter_map { |a| article_node(a, image_preset: :card, excerpt_words: 30) },
      editorial: article_node(editorial, excerpt_words: 30),
      opinions: opinion_sidebar.filter_map { |a| article_node(a, excerpt_words: 30) },
      sports: sports_sidebar.filter_map { |a| article_node(a, excerpt_words: 30) },
      sections: homepage_sections_below_fold(featured_ids),
    }
  end

  def homepage_sections_below_fold(exclude_ids)
    [
      homepage_section_block("News", "news", @news, exclude_ids),
      homepage_section_block("Opinion", "opinions", @opinions, exclude_ids),
      homepage_section_block("Features", "features", @features, exclude_ids),
      homepage_section_block("Arts", "arts", @arts, exclude_ids),
      homepage_section_block("Sports", "sports", @sports, exclude_ids),
      homepage_section_block("Editorials", "editorials", Array(@editorials).compact, exclude_ids),
    ].compact
  end

  def homepage_section_block(title, slug, collection, exclude_ids)
    articles = Array(collection).compact.reject { |a| exclude_ids.include?(a.id) }
    picked = articles.first(SECTION_GALLERY_SIZE)
    return nil if picked.empty?

    nodes = picked.filter_map do |article|
      article_node(article, image_preset: :card, excerpt_words: 24)
    end
    return nil if nodes.empty?

    {
      title: title,
      slug: slug,
      viewAllPath: "/sections/#{slug}",
      articles: nodes,
    }
  end

  def homepage_meta
    m = layout_shell_meta
    {
      dateLine: m[:date_line],
      logoPath: m[:logo_path],
      tagline: m[:tagline],
      instagramUrl: m[:instagram_url],
    }
  end

  def article_node(article, image_preset: nil, excerpt_words: 22)
    return nil if article.blank?
    return nil unless article_visible?(article)

    node = {
      id: article.id,
      title: article.title,
      section: article.section,
      href: article_path(article),
      dek: excerpt_plain(article, excerpt_words),
      published: article.published&.iso8601,
      authors: article.authors.map { |author| author_node(author) },
    }

    if image_preset
      src = article_image_src(article, image_preset)
      node[:image] = src if src.present?
    end

    node
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

  def article_image_src(article, preset = :thumb)
    helpers.article_image_variant_url(article, preset: preset) ||
      helpers.legacy_article_image_column_url(article)
  rescue StandardError
    nil
  end
end
