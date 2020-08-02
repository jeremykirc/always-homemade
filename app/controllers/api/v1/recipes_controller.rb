
module Api
  module V1
    class RecipesController < ParentController

      # POST /recipes
      # Create a recipe.
      def create
        recipe = Recipe.new(
          title: params[:title],
          description: params[:description],
          link: params[:link],
          instructions: JSON.parse(params[:instructions]),
          user: current_user
        )

        recipe.image.attach(params[:image]) if params[:image].present?

        JSON.parse(params[:ingredients]).each do |ingredient_data|
          ingredient = Ingredient.find_or_create_by!(name: ingredient_data['name'].downcase.strip)
          recipe.ingredient_quantities << IngredientQuantity.new(
            ingredient: ingredient,
            quantity: ingredient_data['quantity'],
            unit: ingredient_data['unit'].downcase.strip
          )
        end

        recipe.save!
        render json: nil, status: :created
      rescue ActiveRecord::RecordInvalid => e
        render json: e.message, status: :internal_server_error
      end

      # GET /recipes
      # Return a list of recipes.
      def index
        render json: recipes
      end

      private

      # Return a list of recipes to display to the user.
      def recipes
        Recipe.all.includes(:user).map do |recipe|
          recipe.as_json.merge({
            author: {
              id: recipe.user_id,
              display_name: "Chef #{recipe.author.full_name}",
            },
            image_url: recipe.image_url
          })
        end
      end
    end
  end
end
