class HomeController < ApplicationController
  def buzzer
  end

  def screen
  end

  def results
    render json: {
      red: $redis.get('red_count').to_i,
      green: $redis.get('green_count').to_i
    }
  end

  def vote_red
    $redis.incr('red_count')
  end

  def vote_green
    $redis.incr('green_count')
  end

  def reset
    $redis.set('red_count', 0)
    $redis.set('green_count', 0)
  end
end