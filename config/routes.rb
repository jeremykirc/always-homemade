Rails.application.routes.draw do
  # Set static page paths.
  root to: 'static_pages#home'

  # Set paths for signups.
  get '/signup',    to: 'users#new'

  # Set paths for sessions.
  get '/login',     to: 'sessions#new'
  post '/login',    to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  # Set paths for images.
  resources :images, only: %i[new]
  post '/upload', to: 'images#upload'
end
