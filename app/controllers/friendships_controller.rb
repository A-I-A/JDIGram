# frozen_string_literal: true

class FriendshipsController < ApplicationController
  def create
    @user = User.find_by(id: friend_params[:friend_id])
    @friendship = current_user.friendships.create(friend_id: @user.id)
    @user.notifications.create(friendship_notification('Subscribed'))

    respond_to do |format|
      format.js
      format.html { render_404 }
    end
  end

  def destroy
    @friendship = Friendship.find_by(id: params[:id])
    @user = @friendship.friend
    @user.notifications.create(friendship_notification('Unsubscribed'))
    @friendship.destroy

    respond_to do |format|
      format.js
      format.html { render_404 }
    end
  end

  private

  def friendship_notification(status)
    {
      status: status,
      sender_id: current_user.id
    }
  end

  def friend_params
    params.permit(:friend_id)
  end
end
