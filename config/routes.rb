Rails.application.routes.draw do
  root to: 'publications#index'
  devise_for :users
  resources  :users, except: %i[new index]
  resources  :publications, only: %i[index show new create]
  resources  :likes, only: %i[create destroy]
  resources  :comments, only: [:create]
  resources  :friendships, only: %i[create destroy]
  resources  :notifications, only: [:destroy]
  resources  :messages, only: %i[new create]
  resources  :chats, only: %i[index show]
  post '/users/:id/set_avatar', to: 'users#set_avatar'
  delete '/users/:id/remove_avatar', to: 'users#remove_avatar'
  post '/publications/add_publication', to: 'publications#add_publication'
  get '/publications/:user_id/get_user_publication/:pub_id', to: 'publications#get_user_publication'
  get '/search_user', to: 'users#search_by_login_or_name'
  mount ActionCable.server => '/cable'
end
