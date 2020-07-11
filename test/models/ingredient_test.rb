require 'test_helper'

class IngredientTest < ActiveSupport::TestCase
  test 'name is required' do
    ingredient = Ingredient.new
    refute_predicate ingredient, :valid?

    ingredient.name = 'Foo'
    assert_predicate ingredient, :valid?
  end
end
