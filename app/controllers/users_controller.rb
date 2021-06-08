class UsersController < ApplicationController

  include Rails.application.routes.url_helpers

  before_action :authenticate_user!, only: [:index, :edit, :update, :destroy, :set_avatar, :remove_avatar]
  before_action :find_user, only: [:show, :edit, :update, :destroy, :set_avatar, :remove_avatar, :add_publication]
  before_action :permit_only_current_user, only: [:edit, :destroy, :set_avatar, :remove_avatar]

  def index
    puts "\n\n ACTION: #{params[:action]} #{params[:controller]}"
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

  def set_avatar
    @user.avatar.attach(params[:avatar])
    render json: { avatar_url: rails_blob_path(@user.avatar, disposition: "attachment", only_path: true) }
  end

  def remove_avatar
    @user.avatar.purge
  end

  def add_publication
    @publication = Publication.new
    @publication.description = params[:description]
    if params[:photo]
      params[:photo].each do |photo|
        @publication.photos.attach(photo) 
      end
    end
    @user.publications << @publication
    @publication.save
  end

  def remove_publication

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
