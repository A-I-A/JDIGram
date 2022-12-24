require 'rails_helper'

RSpec.describe Devise::SessionsController, type: :controller do
  describe 'when redirects to new session path' do
    it 'gives status 200' do
      @request.env['devise.mapping'] = Devise.mappings[:user]
      get :new
      expect(response.status).to eq(200)
    end

    it 'shows sign in page' do
      @request.env['devise.mapping'] = Devise.mappings[:user]
      get :new
      expect(response).to render_template('devise/sessions/new')
    end
  end
end
