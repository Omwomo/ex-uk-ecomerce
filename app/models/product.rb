class Product < ApplicationRecord
  belongs_to :category
  has_many :reviews
  has_many :order_items
  has_one_attached :image

  scope :active, -> { where(active: true) }

  after_update :sync_cart_quantities, if: :saved_change_to_inventory?

  def image_url
    Rails.application.routes.url_helpers.url_for(image) if image.attached?
  end

  private

  def sync_cart_quantities
    order_items.each do |item|
      if item.quantity > inventory
        item.update(quantity: inventory, subtotal_price: inventory * price)
        item.order.update_total_price
        item.order.save
      end
    end
  end
end
