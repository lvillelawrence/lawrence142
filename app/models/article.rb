class Article < ApplicationRecord
  include Visible

  validates :title, presence: true
  validates :body, presence: true
  validates :published, presence: true
  has_rich_text :body

  VALID_SECTIONS = ["News", "Opinions", "Features", "Arts", "Sports", "Editorials"]

  validates :section, inclusion: { in: VALID_SECTIONS }

  has_and_belongs_to_many :authors, join_table: :collaborations
  has_one_attached :image

  def published_at_for_display
    return "" if published.blank?

    published.in_time_zone.strftime("%B %-d, %Y %-l:%M %p %Z")
  rescue StandardError
    ""
  end
end
