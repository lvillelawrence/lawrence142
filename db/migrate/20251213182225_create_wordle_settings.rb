class CreateWordleSettings < ActiveRecord::Migration[7.0]
  def change
    create_table :wordle_settings do |t|
      t.string :word

      t.timestamps
    end
  end
end
