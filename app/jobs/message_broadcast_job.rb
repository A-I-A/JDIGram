class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    chat = message.chat
    MessageChannel.broadcast_to chat, message: render_message(message)
  end

  def render_message(message)
    ChatsController.render partial: 'partial/chat_message', locals: { message: message }
  end
end
