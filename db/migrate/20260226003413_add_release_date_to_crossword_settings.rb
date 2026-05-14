class AddReleaseDateToCrosswordSettings < ActiveRecord::Migration[7.0]
  def change
    add_column :crossword_settings, :release_date, :date
  end
end
