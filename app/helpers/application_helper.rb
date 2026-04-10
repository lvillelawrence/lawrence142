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
end
