require 'rails_helper'

RSpec.describe Publication, type: :model do
  describe 'when creating' do
    let(:user) { create(:user) }

    it 'is not valid without description' do
      expect(build(:publication, user_id: user.id, description: nil)).not_to be_valid
    end

    it 'is valid with description' do
      expect(build(:publication, user_id: user.id)).to be_valid
    end
  end
end
