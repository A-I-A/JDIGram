class UsersController < ApplicationController

  before_action :authenticate_user!, only: [:index, :edit, :update, :destroy]
  before_action :find_user, only: [:show, :edit, :update, :destroy]
  before_action :permit_only_current_user, only: [:edit, :destroy]

  def index
    @users = User.all
  end

  def show
  end

  def edit
  end

  def update
   #render plain: params.inspect
   @user.update(user_params)
    if @user.errors.empty?
      redirect_to user_path
      flash[:success] = "your profile settings have been updated"
    else
      redirect_to edit_user_path
    end
  end

  def destroy
  end

  private

  def find_user
    @user = User.find_by(id: params[:id])
    render_404 unless @user
  end

  def permit_only_current_user
    render_403 unless @user.id == current_user.id
  end

  def user_params
    params.require(:user).permit(:name, :login, :email, :web_page, :about_me, :phone, :gender)
  end
end
