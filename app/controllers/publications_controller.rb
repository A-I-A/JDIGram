class PublicationsController < ApplicationController

before_action :find_publication, only: [:show]

  def index
    @publications = Publication.all
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

    render json: { 
      photos: photos, 
      description: @publication.description, 
      author_credentials: author_credentials }
  end
end

def find_publication
  @publication = Publication.find_by(id: params[:id])
  render_404 unless @publication
end 


