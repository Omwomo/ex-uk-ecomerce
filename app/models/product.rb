class Product < ApplicationRecord
  belongs_to :category
  has_many :reviews
  has_many :order_items
  has_one_attached :image
end
