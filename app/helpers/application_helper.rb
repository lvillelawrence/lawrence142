module ApplicationHelper
  # Active Storage hero only (used where legacy is not needed).
  def article_image_url(article)
    return unless article.image.attached?

    blob = article.image.blob
    return if blob.nil?

    url_for(article.image)
  rescue StandardError => e
    Rails.logger.warn("[article #{article.id} image] #{e.class}: #{e.message}")
    nil
  end

  # Hero for article show: Active Storage first, then legacy `articles.image` string URL (same name as attachment).
  def article_hero_image_url(article)
    u = article_image_url(article)
    return u if u.present?

    legacy_article_image_column_url(article)
  end

  def legacy_article_image_column_url(article)
    return nil unless article.class.column_names.include?("image")

    raw = article.class.where(id: article.id).pick(:image)
    raw = raw.to_s.strip
    return raw if raw.present? && (raw.start_with?("http://", "https://", "//") || raw.start_with?("/"))

    nil
  rescue StandardError => e
    Rails.logger.warn("[article #{article.id} legacy image column] #{e.class}: #{e.message}")
    nil
  end

  # Sidebar used to run Article.where(...) directly in the view; any DB/association error there
  # returned 500 with no useful line in Heroku router logs. Load here with rescue + logging.
  def related_articles_for_sidebar
    return [] unless @related && @article.present?

    Article.where(section: @article.section)
      .where.not(id: @article.id)
      .where("published IS NOT NULL AND published <= ?", Time.current)
      .order(published: :desc)
      .limit(5)
      .includes(:authors)
      .to_a
  rescue StandardError => e
    Rails.logger.error("[sidebar related] #{e.class}: #{e.message}\n#{e.backtrace&.first(25)&.join("\n")}")
    []
  end

  def recent_articles_for_sidebar
    Article.where("published IS NOT NULL AND published <= ?", Time.current)
      .order(published: :desc)
      .limit(5)
      .includes(:authors)
      .to_a
  rescue StandardError => e
    Rails.logger.error("[sidebar recent] #{e.class}: #{e.message}\n#{e.backtrace&.first(25)&.join("\n")}")
    []
  end
end
