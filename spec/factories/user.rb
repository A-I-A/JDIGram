FactoryBot.define do
  factory :user do
    sequence(:login) { |i| "Michail#{i}" }
    sequence(:email) { |i| "test#{i}@test.com" }
    password { 'password' }
  end
end
