class Collaboration < ApplicationRecord
  belongs_to :author
  belongs_to :article
end
