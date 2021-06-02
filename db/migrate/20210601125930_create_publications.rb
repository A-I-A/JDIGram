class CreatePublications < ActiveRecord::Migration[5.2]
  def change
    create_table :publications do |t|
      t.integer :user_id
      t.string  :description, default: nil
      t.timestamps
    end
  end
end
