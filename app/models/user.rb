require 'elasticsearch/model'

class User < ApplicationRecord
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
         
  has_many :publications
  
  has_one_attached :avatar
  
  validates :email, uniqueness: true
  validates :login, uniqueness: true

  has_many :likes

  has_many :comments

  has_many :friendships
  has_many :friends, through: :friendships
  has_many :inverse_friendships, class_name: 'Friendship', foreign_key: :friend_id
  has_many :inverse_friends, through: :inverse_friendships, source: :user

  has_many :notifications
  
  def follows?(id)
    if self.friends.find_by(id: id)
      return true
    else 
      return false 
    end
  end

  def followed_by?(id)
    if self.inverse_friends.find_by(id: id)
      return true
    else
      return false
    end
  end

end

User.__elasticsearch__.create_index!
User.import
