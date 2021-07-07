class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    ActionCable.server.broadcast 'message_channel', message: render_message(message)
  end

  def render_message(message)
    ChatsController.render partial: 'partial/chat_message', locals: { message: message } 
  end

end
