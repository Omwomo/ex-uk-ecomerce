class AddUniqueIdentifierToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :unique_identifier, :string
  end
end
