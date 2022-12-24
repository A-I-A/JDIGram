include ActionDispatch::TestProcess

FactoryBot.define do
  factory :publication do
    description { 'test description' }
  end
end
