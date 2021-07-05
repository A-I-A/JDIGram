class CreateChats < ActiveRecord::Migration[5.2]
  def change
    create_table :chats do |t|
      t.integer  :starter_id
      t.integer  :interlocutor_id
      t.timestamps
    end
  end
end
