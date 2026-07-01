# Pick an image processor that is actually installed (libvips or ImageMagick).
# Avoids 500s when variant URLs are requested but the configured processor is missing.
Rails.application.config.after_initialize do
  processor =
    begin
      require "vips"
      :vips
    rescue LoadError
      begin
        require "mini_magick"
        :mini_magick
      rescue LoadError
        nil
      end
    end

  Rails.application.config.active_storage.variant_processor = processor if processor
end
