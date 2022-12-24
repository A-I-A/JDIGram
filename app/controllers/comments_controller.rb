# frozen_string_literal: true

class CommentsController < ApplicationController
  before_action :authenticate_user!

  def create
    @publication = Publication.find_by(id: params[:pub_id])
    @comment = @publication.comments.create(user_id: current_user.id, text: params[:text])

    respond_to do |format|
      format.js
      format.html { render_404 }
    end
  end
end
