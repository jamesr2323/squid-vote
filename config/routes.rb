Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get '/buzzer', to: 'home#buzzer'
  get '/screen', to: 'home#screen'

end
