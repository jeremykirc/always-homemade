class AddRecipesTable < ActiveRecord::Migration[6.0]
  def change
    create_table :recipes do |t|
      t.string :title
      t.string :link
      t.text :description
      t.json :instructions
      t.references :user, foreign_key: true, index: true

      t.timestamps
    end
  end
end
