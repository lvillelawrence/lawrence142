# frozen_string_literal: true

namespace :images do
  desc "Pre-generate Active Storage image variants for all articles with images"
  task preprocess_variants: :environment do
    unless ApplicationController.helpers.image_variants_available?
      abort "No image processor available (install libvips or ImageMagick)."
    end

    scope = Article.joins(:image_attachment)
    total = scope.count
    puts "Preprocessing variants for #{total} articles…"

    scope.find_each.with_index do |article, i|
      PreprocessArticleImageVariantsJob.perform_now(article.id)
      puts "[#{i + 1}/#{total}] article #{article.id}" if ((i + 1) % 10).zero? || i + 1 == total
    end

    puts "Done."
  end
end
