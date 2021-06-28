require 'elasticsearch/model'

class User < ApplicationRecord
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

  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks
end

User.__elasticsearch__.create_index!
User.import
