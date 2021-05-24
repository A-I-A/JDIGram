class UsersController < ApplicationController

  before_action :authenticate_user!, only: [:index, :edit, :update, :destroy]
  before_action :find_user, only: [:show]

  def index
    @users = User.all
  end

  def show
  end

  def edit
  end

  def udate
  end

  def destroy
  end

  private

  def find_user
    @user = User.find_by(id: params[:id])
    render_404 unless @user
  end

end
