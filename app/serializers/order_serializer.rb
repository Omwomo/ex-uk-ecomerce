class OrderSerializer < ActiveModel::Serializer
  attributes :id, :status, :total_price, :user_id, :created_at, :updated_at

  has_many :order_items, serializer: OrderItemSerializer
end
