class IngredientQuantity < ApplicationRecord
  belongs_to :recipe
  belongs_to :ingredient

  validates :quantity, presence: true, numericality: true
end
