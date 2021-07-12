Rails.application.routes.draw do
  root to: 'publications#index'
  devise_for :users
  resources  :users, except: [:new, :index]
  resources  :publications, only: [:index, :show]
  resources  :likes, only: [:create, :destroy]
  resources  :comments, only: [:create]
  resources  :friendships, only: [:create, :destroy]
  resources  :notifications, only: [:destroy]
  resources  :messages, only: [:new, :create]
  resources  :chats, only: [:index, :show]
  post '/users/:id/set_avatar', to: 'users#set_avatar'
  delete '/users/:id/remove_avatar', to: 'users#remove_avatar'
  post '/publications/add_publication', to: 'publications#add_publication'
  get '/publications/:user_id/get_user_publication/:pub_id',  to: 'publications#get_user_publication'
  get '/search_user', to: 'users#search_by_login_or_name'
  mount ActionCable.server => '/cable'
end

