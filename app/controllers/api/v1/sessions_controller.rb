module Api
  module V1
    class SessionsController < ApplicationController
      skip_before_action :verify_authenticity_token, only: %i[create, destroy]

      # POST /login
      # Sign the user in.
      def create
        user = User.find_by(email: params[:email].downcase)
        if user && user.authenticate(params[:password])
          log_in(user)
          render json: { user: user }
        else
          render json: nil, status: :unauthorized
        end
      end

      # GET /authenticate
      # Check whether the user is logged in.
      def authenticate
        render json: { logged_in: logged_in?, user: current_user }
      end

      # DELETE /logout
      # Sign the user out.
      def destroy
        log_out if logged_in?
        render json: { logged_in: false, user: {} }
      end
    end
  end
end
