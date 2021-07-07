class MessageChannel < ApplicationCable::Channel
  def subscribed
    stream_from "message_channel"
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
    #ActionCable.server.broadcast 'message_channel', message: data['message'], chat_id: data['chat_id'], sender_id: current_user.id
  end
end
