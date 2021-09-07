class LikesController < ApplicationController

  before_action :authenticate_user!

  def create
    if like_params[:likeable_type] == 'Publication'
      @publication = Publication.find_by(id: like_params[:likeable_id])
      @like = @publication.likes.create(user_id: current_user.id)
    end
    respond_to do |format|
      format.js
      format.html { render_404 }
    end
  end

  def destroy
    @like = Like.find_by(id: params[:id])
    if @like.likeable_type == 'Publication'
      @publication = Publication.find_by(id: @like.likeable_id)
      @publication.likes.destroy(@like)
    end
    respond_to do |format|
      format.js
      format.html { render_404 }
    end
  end

  private

  def like_params
    params.permit(:likeable_id, :likeable_type)
  end
end
