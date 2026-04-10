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

  # Production was deployed before db/migrate/*_add_image_credit_to_articles ran everywhere.
  # Without the column, ActiveRecord does not define #image_credit and views raise NoMethodError.
  def image_credit
    has_attribute?(:image_credit) ? self[:image_credit] : nil
  end

  def image_credit=(value)
    self[:image_credit] = value if has_attribute?(:image_credit)
  end

  def published_at_for_display
    return "" if published.blank?

    published.in_time_zone.strftime("%B %-d, %Y %-l:%M %p %Z")
  rescue StandardError
    ""
  end
end
