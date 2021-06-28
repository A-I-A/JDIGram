Rails.application.routes.draw do
  root to: 'publications#index'
  devise_for :users
  resources  :users, except: [:new, :index]
  resources  :publications, only: [:index, :show]
  resources  :likes, only: [:create, :destroy]
  resources  :comments, only: [:create]
  post '/users/set_avatar/:id', to: 'users#set_avatar'
  delete '/users/remove_avatar/:id', to: 'users#remove_avatar'
  post '/publications/add_publication', to: 'publications#add_publication'
  get '/publications/:user_id/get_user_publication/:pub_id',  to: 'publications#get_user_publication'
  get '/search_user', to: 'users#search_by_login_or_name'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

