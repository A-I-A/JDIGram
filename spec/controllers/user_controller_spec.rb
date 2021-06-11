require 'rails_helper'

RSpec.describe UsersController, type: :controller do
 
  describe "when user is not signed in" do
     
    let (:user) { create(:user) }

    it "gives 404 status when user is not exists" do
      get :show, params: { id: 0 }
      expect(response.status).to eq(404)
    end

    it "renders user's page when it exists" do 
      get :show, params: { id: user.id }
      expect(response).to render_template("show")
    end

    it "request for users index should return 302" do
      get :index
      expect(response.status).to eq(302)
    end  
  end  

  describe "when user is signed in" do
    let (:user1) { create(:user) }
    let (:user2) { create(:user) }
    before { sign_in user1 }
     
    it_gives_404_when_user_not_exits :show, :edit, :update, :destroy

    it "gives 403 status on another users edit page" do 
      get :edit, params: { id: user2.id }
      expect(response.status).to eq(403)
    end

  end
end
