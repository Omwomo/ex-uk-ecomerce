class RemoveOldRoleAndRenameNew < ActiveRecord::Migration[7.1]
  def change
    remove_column :users, :role
    rename_column :users, :role_int, :role
  end
end
