require 'test_helper'

class IngredientQuantityTest < ActiveSupport::TestCase
  test 'quantity is required and must a number' do
    ingredient_quantity = IngredientQuantity.new(recipe: Recipe.new, ingredient: Ingredient.new)
    refute_predicate ingredient_quantity, :valid?

    ingredient_quantity.quantity = 12.4
    assert_predicate ingredient_quantity, :valid?

    ingredient_quantity.quantity = 1
    assert_predicate ingredient_quantity, :valid?
  end
end
