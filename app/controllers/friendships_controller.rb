class FriendshipsController < ApplicationController

  def create
    @user = User.find_by(id: friend_params[:friend_id])
    @friendship = current_user.friendships.create(friend_id: @user.id)
  end

  def destroy
    @friendship = Friendship.find_by(id: params[:id])
    @user = User.find_by(id: @friendship.friend.id)
    @friendship.destroy
    puts '===================='
    puts params.inspect
    puts '===================='
  end

  private

  def friend_params
    params.permit(:friend_id)
  end
end
