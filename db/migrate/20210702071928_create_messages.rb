class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.integer  :sender_id
      t.integer  :chat_id
      t.string   :text
      t.timestamps
    end
  end
end
