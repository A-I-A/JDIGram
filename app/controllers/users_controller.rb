class UsersController < ApplicationController

  include Rails.application.routes.url_helpers

  before_action :authenticate_user!, only: [:index, :edit, :update, :destroy, :set_avatar, :remove_avatar]
  before_action :find_user, only: [:show, :edit, :update, :destroy, :set_avatar, :remove_avatar]
  before_action :permit_only_current_user, only: [:edit, :destroy, :set_avatar, :remove_avatar]

  def index
    @users = User.all
  end

  def show
    @publications = @user.publications.order(created_at: :desc)
  end

  def edit; end

  def update
   @user.update(user_params)
    if @user.errors.empty?
      redirect_to user_path
      flash[:success] = "your profile settings have been updated"
    else
      redirect_to edit_user_path
    end
  end

  def destroy; end

  def set_avatar
    @user.avatar.attach(params[:avatar])

    render json: {
      avatar_url: rails_blob_path(
        @user.avatar,
        disposition: "attachment",
        only_path: true
      )
    }
  end

  def remove_avatar
    @user.avatar.purge
  end

  def search_by_login_or_name
    @users = User.__elasticsearch__.search(
      query: { 
        multi_match: {
         query: params[:login],
         fields: ['name', 'login']
       }
     }
    ).records.to_a
    respond_to do |format|
      format.js
    end
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
    params.require(:user).permit(:name,
                                 :login,
                                 :email,
                                 :web_page,
                                 :about_me,
                                 :phone,
                                 :gender)
  end
end
