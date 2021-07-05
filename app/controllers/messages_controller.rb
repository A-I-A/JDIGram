class MessagesController < ApplicationController

  before_action :authenticate_user!
  before_action :find_recipient

  def new
    respond_to do |format|
      format.js
      format.html{ render_404 }
    end
  end

  def create
    chat = current_user.inbox_chats.find_by(starter_id: @recipient.id) || current_user.outbox_chats.find_by(interlocutor_id: @recipient.id)
    if chat 
      chat.messages.create(
        sender_id: current_user.id,
        text: params[:text]
        )
    else 
      chat = current_user.outbox_chats.create(interlocutor_id: @recipient.id)
      chat.messages.create(
        sender_id: current_user.id,
        text: params[:text]
        )
    end
    respond_to do |format|
      format.js
      format.html{ render_404 }
    end
  end

  private

  def find_recipient
    @recipient = User.find_by(id: params[:recipient_id])
  end 

end
