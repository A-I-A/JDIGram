Rails.application.routes.draw do
  devise_for :users
  resources  :users, except: [:new]
  post '/users/set_avatar/:id', to: 'users#set_avatar'
  delete '/users/remove_avatar/:id', to: 'users#remove_avatar'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
