Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'api/v1/users/sessions',
    registrations: 'api/v1/users/registrations'
  }

  # Active Storage routes
  # draw :active_storage

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check


  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :show, :create, :update, :destroy]
      resources :products, only: [:index, :show, :create, :update, :destroy]
      resources :orders do
        resources :order_items, only: [:create]
      end
      resources :order_items, only: [:update, :destroy]
      resources :inventories
      resources :reviews
      resources :categories do
        resources :products, only: [:index, :show, :create, :update, :destroy]
      end
  
      get 'current_user', to: 'users#current'
    end
  end

  # Defines the root path route ("/")
  root 'root#index'

  get '*path', to: 'root#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end
