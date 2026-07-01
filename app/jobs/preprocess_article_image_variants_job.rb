class PreprocessArticleImageVariantsJob < ApplicationJob
  queue_as :default

  PRESETS = ApplicationHelper::ARTICLE_IMAGE_PRESETS.keys.freeze

  def perform(article_id)
    article = Article.find_by(id: article_id)
    return unless article&.image&.attached?

    helper = ApplicationController.helpers
    return unless helper.image_variants_available?

    PRESETS.each do |preset|
      preprocess_preset(article, preset)
    end
  rescue StandardError => e
    Rails.logger.warn("[PreprocessArticleImageVariantsJob #{article_id}] #{e.class}: #{e.message}")
  end

  private

  def preprocess_preset(article, preset)
    helper = ApplicationController.helpers
    return if helper.article_variant_blob_url(article, preset).present?

    helper.article_image_variant(article, preset).processed
  end
end
