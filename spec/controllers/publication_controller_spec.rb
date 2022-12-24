require 'rails_helper'
require 'json'

include Rails.application.routes.url_helpers
Rails.application.routes.default_url_options[:host] = :test

RSpec.describe PublicationsController, type: :controller do
  describe 'when user signed in' do
    let(:user) { create(:user) }
    before { sign_in user }

    describe "when publication doesn't exist" do
      it 'gives status 404' do
        get :show, params: { id: -1 }
        expect(response.status).to eq(404)
      end

      it 'renders 404 page' do
        get :show, params: { id: -1 }
        expect(response).to render_template(file: "#{Rails.root}/public/404.html")
      end
    end

    describe 'when publication exists' do
      let(:user1) { create(:user) }
      before { sign_in user1 }
      let(:file) { fixture_file_upload('cockroach.jpg', 'img/jpeg') }
      let(:publication) { create(:publication, user_id: user1.id, photos: file) }

      it 'gives status 200' do
        get :show, params: { id: publication.id }, xhr: true
        expect(response.status).to eq(200)
      end
    end
  end
end
