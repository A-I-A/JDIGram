class FriendshipsController < ApplicationController

  def create
    @user = User.find_by(id: friend_params[:friend_id])
    @friendship = current_user.friendships.create(friend_id: @user.id)
    if current_user.followed_by?(@user)
      @user.notifications.create(text: "#{current_user.login} accepted your friend invitation")
    else 
      @user.notifications.create(text: "#{current_user.login} invited you as a friend")
    end
  end

  def destroy
    @friendship = Friendship.find_by(id: params[:id])
    @user = @friendship.user
    @friendship.destroy
    if @user.followed_by?(current_user)
      @user.inverse_friends.destroy(current_user)
      @user.notifications.create(text: "#{current_user.login} cancel your friendship")
    else
      @user.notifications.create(text: "#{current_user.login} discard your invitation")
    end
  end

  private

  def friend_params
    params.permit(:friend_id)
  end
end
