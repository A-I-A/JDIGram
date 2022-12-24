class CreateNotifications < ActiveRecord::Migration[5.2]
  def change
    create_table :notifications do |t|
      t.integer :user_id
      t.integer :sender_id, null: false
      t.string  :status
      t.timestamps
    end
  end
end
