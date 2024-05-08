Rails.application.routes.draw do
  devise_for :users
  get 'root/index'
  get 'products/index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root 'root#index'

  namespace :api do
    namespace :v1 do
      resources :users
      resources :products, only: [:show]
      resources :orders
      resources :order_items
      resources :inventories
      resources :reviews
      resources :categories do
        resources :products, only: [:index]
      end
    end
  end

  get '*path', to: 'root#index', constraints: ->(req) { !req.xhr? && req.format.html? }

end
