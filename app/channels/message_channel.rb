class MessageChannel < ApplicationCable::Channel
  def subscribed
    stream_for chat
    puts '===================='
    puts 'S U B S C R I B E D'
    puts '===================='
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    puts '===================='
    puts 'S  E  N  D'
    puts '===================='
    current_user.messages.create(chat_id: data['chat_id'], text: data['text'])
  end

  private

  def chat
    Chat.find(params[:chat_id])
  end
end
