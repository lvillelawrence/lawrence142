class AddImageCreditToArticles < ActiveRecord::Migration[7.0]
  def change
    add_column :articles, :image_credit, :string
  end
end
