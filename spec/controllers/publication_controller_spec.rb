require 'rails_helper'
require 'json'

include Rails.application.routes.url_helpers
Rails.application.routes.default_url_options[:host] = :test

RSpec.describe PublicationsController, type: :controller do

  describe "when publication doesn't exist" do

    it "gives status 404" do
     get :show, params: { id: -1 }
     expect(response.status).to eq(404)
    end

    it "renders 404 page" do
     get :show, params: { id: -1 }
     expect(response).to render_template(file: "#{Rails.root}/public/404.html")
    end

  end

  describe "when publication exists" do 
    let (:user) { create(:user) }
    let (:file) { fixture_file_upload('cockroach.jpg', 'img/jpeg') }
    let (:publication) { create(:publication, user_id: user.id, photos: file) }

    it "gives status 200" do
      get :show, params: { id: publication.id}
      expect(response.status).to eq(200)
    end

    it "sends test description" do 
      get :show, params: { id: publication.id}
      description = JSON.parse(response.body)["description"]
      expect(description).to eq("test description")
    end 

    it "keeps image file" do 
      get :show, params: { id: publication.id}
      photo_url = JSON.parse(response.body)['photos'][0]['photo_url']
      expect(photo_url).to eq(rails_blob_path(publication.photos[0], disposition: "attachment"))
    end
    
  end

end
