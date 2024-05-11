class AddCartIdToOrders < ActiveRecord::Migration[7.1]
  def change
    add_column :orders, :cart_id, :string
    add_index :orders, :cart_id
  end
end
