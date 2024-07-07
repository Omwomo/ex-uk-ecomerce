class Order < ApplicationRecord
  belongs_to :user
  has_many :order_items
  has_one :checkout

  before_save :update_total_price

  def update_total_price
    self.total_price = order_items.sum(:subtotal_price)
  end
end
