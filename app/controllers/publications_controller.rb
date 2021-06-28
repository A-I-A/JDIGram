class PublicationsController < ApplicationController

  before_action :authenticate_user!
  before_action :find_publication, only: [:show, :like, :add_comment]

  def index
    @publications = Publication.all.order(created_at: :desc).with_attached_photos
  end

  def show
    @user = @publication.user
    respond_to do |format|
      format.js
      format.html { render_404 }
    end
  end

  def add_publication
    @publication = current_user.publications.new(description: params[:description])

    params[:photo].each do |photo|
      @publication.photos.attach(photo)
    end if params[:photo]

    @publication.save
  end

  def get_user_publication
    @user = User.find(params[:user_id])
    @publication = @user.publications.find(params[:pub_id])
    @next_pub = next_publication(@user, @publication)
    @previous_pub = previous_publication(@user, @publication)

    respond_to do |format|
      format.js
      format.html { render_404 }
    end
  end

  private

  def find_publication
    @publication = Publication.find_by(id: params[:id])
    render_404 unless @publication
  end

  def previous_publication(user, publication)
    user.publications.where("id > ?", publication.id).first
  end

  def next_publication(user, publication)
    user.publications.where("id < ?", publication.id).last
  end

end
