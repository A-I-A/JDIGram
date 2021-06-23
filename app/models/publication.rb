class Publication < ApplicationRecord

  belongs_to :user
  
  has_many_attached :photos
  
  has_many :likes, as: :likeable 
end
