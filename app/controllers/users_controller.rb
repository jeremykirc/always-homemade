class UsersController < ApplicationController
  before_action :logged_in_user, only: [:show, :index, :edit, :update, :destroy]
  before_action :correct_user,   only: [:edit, :update]
  before_action :user_is_admin,  only: :destroy

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      flash[:success] = 'Welcome! Get started by setting up some appointments.'
      log_in @user
      redirect_to @user
    else
      render 'new'
    end
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      flash[:success] = 'Profile updated'
      redirect_to @user
    else
      render 'edit'
    end
  end

  def show
    @user = User.find(params[:id])
    @current_user = current_user
    @upcoming_appointments = @user.appointments
                                  .where('appt_date >= ?', DateTime.now)
                                  .paginate(page: params[:page], per_page: 10)
                                  .order('appt_date ASC')
    @past_appointments = @user.appointments
                              .where('appt_date < ?', DateTime.now)
                              .paginate(page: params[:page], per_page: 10)
                              .order('appt_date DESC')
    @appointment = current_user.appointments.build if logged_in?
    @comment = current_user.comments.build if logged_in?
  end

  def index
    @users = User.paginate(page: params[:page])
  end

  def destroy
    User.find(params[:id]).destroy
    flash[:success] = 'User deleted'
    redirect_to users_url
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

  def user_is_admin
    redirect_to root_url unless current_user.admin?
  end

  def correct_user
    @user = User.find(params[:id])
    redirect_to(root_url) unless current_user?(@user)
  end
end
