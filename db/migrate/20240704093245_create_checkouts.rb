class CreateCheckouts < ActiveRecord::Migration[7.1]
  def change
    create_table "checkouts", force: :cascade do |t|
      t.bigint "order_id", null: false
      t.string "customer_address"
      t.string "customer_contact"
      t.string "payment_method"
      t.decimal "total_amount"
      t.string "status", default: "pending"
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
      t.index ["order_id"], name: "index_checkouts_on_order_id"
    end
    
    add_foreign_key "checkouts", "orders"
  end
end
