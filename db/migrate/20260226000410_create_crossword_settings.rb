class CreateCrosswordSettings < ActiveRecord::Migration[7.0]
  def change
    create_table :crossword_settings do |t|
      t.text :puzzle_data

      t.timestamps
    end
  end
end
