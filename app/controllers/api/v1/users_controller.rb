module Api
  module V1
    class UsersController < ParentController
      wrap_parameters :user, include: %i[email first_name last_name password password_confirmation]

      # POST /users
      # Create a user (sign up).
      def create
        user = User.create!(user_params)
        log_in(user)
        render json: nil, status: :created
      rescue ActiveRecord::RecordInvalid => e
        render json: e.message, status: :internal_server_error
      end

      private

      def user_params
        permitted_params =
          %i[email first_name last_name password password_confirmation]
        params.require(:user).permit(permitted_params)
      end
    end
  end
end
