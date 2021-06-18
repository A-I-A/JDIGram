Rails.application.routes.draw do
  devise_for :users
  resources  :users, except: [:new, :index]
  resources  :publications, only: [:index, :show]
  post '/users/set_avatar/:id', to: 'users#set_avatar'
  delete '/users/remove_avatar/:id', to: 'users#remove_avatar'
  post '/users/add_publication/:id', to: 'users#add_publication'
  get '/users/get_publication_content/:pub_id',  to: 'users#get_publication_content'
  get '/users/:user_id/get_publication/:pub_id',  to: 'users#get_publication'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
