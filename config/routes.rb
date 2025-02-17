Rails.application.routes.draw do
  # Set static page paths.
  root to: 'static_pages#index'

  # Forward all non-Ajax/non-API requests with HTML Mime type to index page.
  get '*page', to: 'static_pages#index', constraints: ->(req) do
    req.format.html? &&
      req.path.exclude?('/api/') &&
      req.path.exclude?('/rails/active_storage')
  end

  # Set paths for the API.
  namespace :api do
    namespace :v1 do
      # Set paths for sessions.
      get    '/login',                to: 'sessions#new'
      post   '/login',                to: 'sessions#create'
      get    '/authenticate_session', to: 'sessions#authenticate'
      delete '/logout',               to: 'sessions#destroy'

      # Set paths for recipes.
      get  '/recipes', to: 'recipes#index'
      post '/recipes', to: 'recipes#create'

      # Set paths for users.
      post '/users', to: 'users#create'
    end
  end
end
