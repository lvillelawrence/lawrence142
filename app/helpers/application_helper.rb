module ApplicationHelper
  ARTICLE_IMAGE_PRESETS = {
    thumb: [224, 168],
    card: [640, 400],
    hero: [960, 600],
    full: [1280, 800],
  }.freeze

  # Active Storage URL resized for display (homepage cards, sidebar thumbs, etc.).
  # Uses the pre-processed variant blob directly when ready; otherwise the original.
  def article_image_variant_url(article, preset: :card)
    if article.image.attached?
      ready_url = article_variant_blob_url(article, preset)
      return ready_url if ready_url.present?

      return article_attached_image_url(article)
    end

    legacy_article_image_column_url(article)
  rescue StandardError => e
    Rails.logger.warn("[article #{article.id} image #{preset}] #{e.class}: #{e.message}")
    article_attached_image_url(article) if article.image.attached?
    legacy_article_image_column_url(article)
  end

  def article_variant_blob_url(article, preset)
    return nil unless article.image.attached?
    return nil unless image_variants_available?

    blob = article.image.blob
    return nil if blob.nil?

    digest = article_image_variant(article, preset).variation.digest
    record = ActiveStorage::VariantRecord.find_by(blob_id: blob.id, variation_digest: digest)
    return nil unless record&.image&.attached?

    url_for(record.image)
  rescue StandardError => e
    Rails.logger.warn("[article #{article.id} variant blob #{preset}] #{e.class}: #{e.message}")
    nil
  end

  def article_image_variant(article, preset)
    width, height = ARTICLE_IMAGE_PRESETS.fetch(preset, ARTICLE_IMAGE_PRESETS[:card])
    article.image.variant(
      resize_to_limit: [width, height],
      saver: { quality: 82, strip: true },
    )
  end

  def image_variants_available?
    return @image_variants_available if defined?(@image_variants_available)

    processor = Rails.application.config.active_storage.variant_processor
    @image_variants_available =
      case processor
      when :vips
        require "vips"
        true
      when :mini_magick
        require "mini_magick"
        true
      else
        false
      end
  rescue LoadError
    @image_variants_available = false
  end

  def article_attached_image_url(article)
    url_for(article.image)
  rescue StandardError => e
    Rails.logger.warn("[article #{article.id} attached image] #{e.class}: #{e.message}")
    legacy_article_image_column_url(article)
  end

  # Active Storage hero only (used where legacy is not needed).
  def article_image_url(article)
    article_image_variant_url(article, preset: :card)
  end

  # Hero for article show: prefer direct blob URL for reliability.
  def article_hero_image_url(article, preset: :full)
    if article.image.attached?
      variant_url = article_variant_blob_url(article, preset)
      return variant_url if variant_url.present?

      return article_attached_image_url(article)
    end

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
  def article_excerpt(article, words: 30)
    text = article.body.to_plain_text.to_s.split(/\s+/)
    return "" if text.empty?

    "#{text.first(words).join(' ')}…"
  rescue StandardError
    ""
  end

  def related_articles_for_sidebar
    return [] unless @related && @article.present?

    Article.where(section: @article.section)
      .where.not(id: @article.id)
      .where("published IS NOT NULL AND published <= ?", Time.current)
      .order(published: :desc)
      .limit(5)
      .includes(:authors, image_attachment: :blob)
      .to_a
  rescue StandardError => e
    Rails.logger.error("[sidebar related] #{e.class}: #{e.message}\n#{e.backtrace&.first(25)&.join("\n")}")
    []
  end

  def recent_articles_for_sidebar
    Article.where("published IS NOT NULL AND published <= ?", Time.current)
      .order(published: :desc)
      .limit(5)
      .includes(:authors, image_attachment: :blob)
      .to_a
  rescue StandardError => e
    Rails.logger.error("[sidebar recent] #{e.class}: #{e.message}\n#{e.backtrace&.first(25)&.join("\n")}")
    []
  end

end
