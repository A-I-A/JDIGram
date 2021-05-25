class AddWebPageAboutMePhoneGenderColumnsToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :web_page, :string, default: nil
    add_column :users, :about_me, :string, default: nil
    add_column :users, :phone,    :string, default: nil
    add_column :users, :gender,   :string, default: nil
  end
end
