
module Api
  module V1
    class RecipesController < ParentController

      # POST /recipes
      # Create a recipe.
      def create
        recipe = Recipe.new(
          title: params[:title],
          description: params[:description],
          user: current_user
        )
        recipe.image.attach(params[:image]) if params[:image].present?
        recipe.save!
        render json: '', status: :ok
      rescue ActiveRecord::RecordInvalid => e
        render json: e.message, status: :internal_server_error
      end

      # GET /recipes
      # Return a list of recipes.
      def index
        render json: recipes
      end

      private

      def recipes
        Recipe.all.includes(:user).map do |recipe|
          recipe.as_json.merge({ author: recipe.author.full_name,
                                 image_url: recipe.image_url })
        end
      end

      def test_recipe_grid_data
        [
          {
            title: 'Egg on Waffle',
            description: 'Test1',
            url: 'EggOnWaffle.jpg'
          },
          {
            title: 'Roasted Carrots with Lentils',
            description: 'Test2',
            url: 'RoastedCarrotsAndLentils.jpg'
          },
          {
            title: 'Mole Taco',
            description: 'Test3',
            url: 'MoleTaco.jpg'
          },
          {
            title: 'Burrata and Orange',
            description: 'Test4',
            url: 'OttelenghiBurrataOrange.jpg'
          },
          {
            title: 'Apricot Lavender Cake',
            description: 'Test5',
            url: 'ApricotLavenderCake.jpg'
          }
        ]
      end 
    end
  end
end
