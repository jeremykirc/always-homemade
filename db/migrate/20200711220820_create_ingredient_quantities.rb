class CreateIngredientQuantities < ActiveRecord::Migration[6.0]
  def change
    create_table :ingredient_quantities do |t|
      t.references :recipe, null: false, foreign_key: true
      t.references :ingredient, null: false, foreign_key: true
      t.float :quantity, null: false
      t.string :unit

      t.timestamps
    end
  end
end
