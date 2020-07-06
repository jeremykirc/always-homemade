
module Api
  module V1
    class UsersController < ParentController
      # POST /users
      # Create a user (sign up).
      def create
        user = User.create!(user_params)
        render json: nil, status: :created
      rescue ActiveRecord::RecordInvalid => e
        render json: { message: e.message }, status: :internal_server_error
      end

      private

      def user_params
        params.require(:user).permit(:email, :first_name, :last_name, :password, :password_confirmation)
      end
    end
  end
end
