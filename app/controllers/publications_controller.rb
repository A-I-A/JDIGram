class PublicationsController < ApplicationController

  before_action :authenticate_user!
  before_action :find_publication, only: [:show, :like]

  def index
    @publications = Publication.all.order(created_at: :desc)
  end

  def show
    author = @publication.user

    author_credentials = {}
    if author.avatar.attached?
      author_credentials[:avatar] = rails_blob_path(
        author.avatar, 
        disposition: "attachment", 
        only_path: true
      )  
    else 
      author_credentials[:avatar] = false 
    end

    if !author.login.nil? && !author.login.empty?
      author_credentials[:login] =  author.login
    else
      author_credentials[:login] =  false
    end

    photos = []
    @publication.photos.each do |photo|
      photos.append({ 
        photo_url: rails_blob_path(
          photo, 
          disposition: "attachment",
          only_path: true
        ) 
      })
    end 

    respond_to do |format|
      format.json { 
        render json: { 
          photos: photos, 
          description: @publication.description, 
          author_credentials: author_credentials 
        } 
      } 
      format.js
      format.html { render_404 }
    end

    
  end

  def add_publication
    @user = User.find_by(id: params[:user_id] )
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


  def get_user_publication
    @user = User.find(params[:user_id])
    @publication = @user.publications.find(params[:pub_id])
    next_pub = next_publication(@user, @publication)
    previous_pub = previous_publication(@user, @publication)

    author_credentials = {}
    if @user.avatar.attached?
      author_credentials[:avatar] = rails_blob_path(
        @user.avatar, 
        disposition: "attachment", 
        only_path: true
      )  
    else 
      author_credentials[:avatar] = false 
    end

    if !@user.login.nil? && !@user.login.empty?
      author_credentials[:login] =  @user.login
    else
      author_credentials[:login] =  false
    end

    photos = []
    @publication.photos.each do |photo|
      photos.append({ 
        photo_url: rails_blob_path(
          photo, 
          disposition: "attachment", 
          only_path: true
        ) 
      })
    end

    render json: { 
      photos: photos, 
      description: @publication.description, 
      next: next_pub, 
      previous: previous_pub,
      author_credentials: author_credentials 
    }

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

  private

  def find_publication
    @publication = Publication.find_by(id: params[:id])
    render_404 unless @publication
  end 

  def next_publication(user, publication)
    next_pub = user.publications.where("id > ?", publication.id).first
    if next_pub
      return next_pub.id
    else 
      return false
    end
  end

  def previous_publication(user, publication)
    previous_pub = user.publications.where("id < ?", publication.id).last
    if previous_pub
      return previous_pub.id
    else 
      return false
    end
  end

end
