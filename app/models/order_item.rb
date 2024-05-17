class OrderItem < ApplicationRecord
  belongs_to :order
  belongs_to :product

  before_save :set_subtotal_price

  def set_subtotal_price
    self.subtotal_price = quantity * product.price
  end
end
