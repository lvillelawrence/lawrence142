# Fixes legacy rows that violate Article / Visible validations or leave
# fields NULL—common source of 500s in views (e.g. section.downcase, queries
# comparing published, or Action Text / sidebar assumptions).
class BackfillArticleRequiredColumns < ActiveRecord::Migration[7.0]
  # Keep in sync with Article::VALID_SECTIONS
  SECTIONS = %w[News Opinions Features Arts Sports Editorials].freeze
  DEFAULT_SECTION = "News"
  DEFAULT_STATUS = "Public"

  def up
    say_with_time "backfilling articles.published" do
      Article.where(published: nil).find_each do |article|
        Article.where(id: article.id).update_all(
          published: article.created_at || Time.current
        )
      end
    end

    say_with_time "backfilling articles.status" do
      Article.where(status: [nil, ""]).update_all(status: DEFAULT_STATUS)
    end

    say_with_time "backfilling articles.section (null/blank)" do
      Article.where(section: [nil, ""]).update_all(section: DEFAULT_SECTION)
    end

    say_with_time "normalizing articles.section (invalid or wrong case)" do
      Article.reset_column_information
      Article.find_each do |article|
        next if SECTIONS.include?(article.section)

        fixed = SECTIONS.find { |s| s.casecmp?(article.section.to_s) }
        Article.where(id: article.id).update_all(section: fixed || DEFAULT_SECTION)
      end
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
