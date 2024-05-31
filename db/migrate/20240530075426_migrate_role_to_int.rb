class MigrateRoleToInt < ActiveRecord::Migration[7.1]
  def change
    execute <<-SQL
      UPDATE users
      SET role_int = 
        CASE WHEN role ~ E'^\\d+$' THEN CAST(role AS INTEGER) ELSE 0 END;
    SQL
  end
end
