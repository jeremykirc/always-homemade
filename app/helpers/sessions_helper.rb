module SessionsHelper
  # Log the user in.
  def log_in(user)
    session[:user_id] = user.id
  end

  # Log the user out.
  def log_out
    session.clear
    cookies.clear
    @current_user = nil
  end

  # Return the current logged in user, if any.
  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  # Return whether or not a user is logged in.
  def logged_in?
    current_user.present?
  end
end
