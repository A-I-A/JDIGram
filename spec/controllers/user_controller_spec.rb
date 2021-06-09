require 'rails_helper'

RSpec.describe UsersController, type: :controller do

describe "show action" do
  it "renders 404 when user is not exists" do
    get :show, params: {id: 0}
    expect(response.status).to eq(404)
  end
end

describe "edit action" do
  it "renders 404 when user is not exists" do
    user = create(:user)
    sign_in user
    get :edit, params: {id: 0}
    expect(response.status).to eq(404)
  end
end

end
