module ApplicationHelper
  # Returns a URL for the article hero image, or nil if missing or storage is inconsistent.
  def article_image_url(article)
    return unless article.image.attached?

    blob = article.image.blob
    return if blob.nil?

    url_for(article.image)
  rescue StandardError => e
    Rails.logger.warn("[article #{article.id} image] #{e.class}: #{e.message}")
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
