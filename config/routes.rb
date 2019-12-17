Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: "static_pages#root"
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :update, :destroy] do
      get 'posts', to: 'posts#by_user'
    end
    get '/username_available/:username', to: 'users#username_available?'

    resource  :session, only: [:create, :destroy]

    resources :posts, only: [:index, :create, :show, :update, :destroy] do
      resources :comments, only: [:index, :create]
    end
    resources :comments, only: [:show, :destroy] do
      get 'children', only: :children
    end
    resources :tags, only: [:index, :show] do
      get 'posts', to: 'posts#by_tag'
    end

  end
end
