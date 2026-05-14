class CrosswordSetting < ApplicationRecord
  serialize :puzzle_data, JSON
end
