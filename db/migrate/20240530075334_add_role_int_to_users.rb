class AddRoleIntToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :role_int, :integer
  end
end
