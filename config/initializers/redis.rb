$redis = ConnectionPool::Wrapper.new(size: 5, timeout: 3) { Redis.new(url: ENV['REDIS_URL']) }
