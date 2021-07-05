class Chat < ApplicationRecord
  belongs_to :starter, class_name: 'User'
  belongs_to :interlocutor, class_name: 'User'
  has_many :messages
end
