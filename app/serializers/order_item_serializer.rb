class OrderItemSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :subtotal_price, :order_id, :product_id

  belongs_to :product, serializer: ProductSerializer
end
