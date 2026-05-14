Rails.application.routes.draw do
  devise_for :admins, controllers: {
    sessions: "admins/sessions"
  }
  root "articles#index"
  get "/sections/:section", to: "articles#section"
  get "articles/list", to: "articles#list"
  get 'search', to: "search#index"
  get "issues/latest", to: "issues#latest"
  get 'crossword', to: "crossword#show"
  get 'crossword/edit', to: "crossword#edit", as: :edit_crossword
  get 'crossword/edit/:id', to: "crossword#edit", as: :edit_crossword_item
  patch 'crossword', to: "crossword#update"
  delete 'crossword/:id', to: "crossword#destroy", as: :destroy_crossword
  resources :articles
  resources :authors
  resources :issues
  scope "/", controller: :static do
    (StaticController.action_methods.to_a)
      .each do |action_method|
        get action_method
      end
  end 
end
