class NotificationsController < ApplicationController

  def destroy
    @notification = Notification.find_by(id: params[:id])
    @notification.destroy
    respond_to do |format|
      format.js
      format.html{ render_404 }
    end
  end
end

