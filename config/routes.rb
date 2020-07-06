Rails.application.routes.draw do
  # Set static page paths.
  root to: 'static_pages#index'

  # Forward all non-Ajax/non-API requests with HTML Mime type to index page.
  get '*page', to: 'static_pages#index', constraints: ->(req) do
    req.format.html? &&
      req.path.exclude?('/api/') &&
      req.path.exclude?('/rails/active_storage')
  end

  # Set paths for signups.
  get '/signup',    to: 'users#new'

  # Set paths for sessions.
  get '/login',     to: 'sessions#new'
  post '/login',    to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  # Set paths for images.
  post '/upload', to: 'images#upload'

  # Set paths for the API.
  namespace :api do
    namespace :v1 do
      get  '/recipes', to: 'recipes#index'
      post '/recipes', to: 'recipes#create'
      post '/users', to: 'users#create'
    end
  end
end
