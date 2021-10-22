Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get '/buzzer', to: 'home#buzzer'
  get '/screen', to: 'home#screen'
  get '/results', to: 'home#results'

  post '/vote_green', to: 'home#vote_green'
  post '/vote_red', to: 'home#vote_red'
  post '/reset', to: 'home#reset'
end
