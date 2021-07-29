class Message < ApplicationRecord
  belongs_to :sender, class_name: 'User'
  belongs_to :chat

  after_create_commit { MessageBroadcastJob.perform_later self }
end
