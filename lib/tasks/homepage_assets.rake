# frozen_string_literal: true

namespace :homepage do
  BUILT_ASSETS = %w[homepage.js homepage.css].freeze

  def self.committed_builds_present?
    BUILT_ASSETS.all? { |file| File.exist?(Rails.root.join("app/assets/builds", file)) }
  end

  def self.npm_available?
    system("command -v npm > /dev/null 2>&1")
  end

  desc "Build React homepage (esbuild + Tailwind)"
  task :build do
    next if ENV["SKIP_HOMEPAGE_BUILD"].present?

    unless npm_available?
      if committed_builds_present?
        warn "[homepage:build] npm not found; using committed app/assets/builds/*"
        next
      end

      raise "homepage build failed: npm not found and no committed builds in app/assets/builds/"
    end

    ok = system("npm install && npm run build")
    raise "homepage build failed" unless ok
  end
end

Rake::Task["assets:precompile"].enhance(["homepage:build"])
