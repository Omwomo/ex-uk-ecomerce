class AddPickupLocationToOrders < ActiveRecord::Migration[7.1]
  def change
    create_table :pickup_locations, force: :cascade do |t|
      t.string :name
      t.string :address
      t.timestamps null: false
    end

    add_reference :orders, :pickup_location, foreign_key: true
    add_column :orders, :contact_number, :string
    add_column :orders, :delivery_address, :string
    add_column :orders, :payment_method, :string
    add_column :orders, :email, :string
  end
end
