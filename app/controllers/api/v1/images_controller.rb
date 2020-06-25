
module Api
  module V1
    class ImagesController < ParentController
      # GET /images/test_grid_data
      # Return test image grid data.
      def test_grid_data
        render json: test_image_grid_data
      end

      private

      def test_image_grid_data
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
