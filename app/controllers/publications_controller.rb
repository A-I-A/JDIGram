class PublicationsController < ApplicationController

  before_action :authenticate_user!
  before_action :find_publication, only: [:show, :like, :add_comment]

  def index
    @publications = Publication.all.order(created_at: :desc)
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
      format.html{ render_404 }
    end

  end

  def like
    @like = Like.find_by(
      user_id: current_user.id,
      likeable_id: @publication.id,
      likeable_type: 'Publication'
      )
    if @like
      @like.destroy
    else
      @like = @publication.likes.create(user_id: current_user.id)
    end
  end

  def add_comment
    @comment = @publication.comments.create(user_id: current_user.id, text: params[:text])
    respond_to do |format|
      format.js
      format.html{ render_404 }
    end
  end

  private

  def find_publication
    @publication = Publication.find_by(id: params[:id])
    render_404 unless @publication
  end

  def previous_publication(user, publication)
    next_pub = user.publications.where("id > ?", publication.id).first
    if next_pub
      return next_pub
    end
  end

  def next_publication(user, publication)
    previous_pub = user.publications.where("id < ?", publication.id).last
    if previous_pub
      return previous_pub
    end
  end

end
