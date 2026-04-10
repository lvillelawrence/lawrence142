class ChangeArticlesPublishedToDatetime < ActiveRecord::Migration[7.0]
  def up
    change_column :articles, :published, :datetime
  end

  def down
    change_column :articles, :published, :date
  end
end
