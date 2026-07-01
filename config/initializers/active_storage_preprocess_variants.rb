# frozen_string_literal: true

Rails.application.config.to_prepare do
  ActiveStorage::Attachment.class_eval do
    after_commit :preprocess_article_image_variants, on: :create

    private

    def preprocess_article_image_variants
      return unless record.is_a?(Article) && name == "image"

      PreprocessArticleImageVariantsJob.perform_later(record.id)
    end
  end
end
