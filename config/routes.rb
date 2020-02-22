Rails.application.routes.draw do
  # Set static page paths.
  root to: 'static_pages#home'

  # Set signup paths.
  get '/signup',    to: 'users#new'

  # Set session paths.
  get '/login',     to: 'sessions#new'
  post '/login',    to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  # Set users paths.
  resources :users
end
