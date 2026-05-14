# frozen_string_literal: true

namespace :homepage do
  desc "Build React homepage (esbuild + Tailwind)"
  task :build do
    next if ENV["SKIP_HOMEPAGE_BUILD"].present?

    ok = system("npm install && npm run build")
    raise "homepage build failed" unless ok
  end
end

Rake::Task["assets:precompile"].enhance(["homepage:build"])
