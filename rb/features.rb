# YadorePublisher SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module YadorePublisherFeatures
  def self.make_feature(name)
    case name
    when "base"
      YadorePublisherBaseFeature.new
    when "ratelimit"
      YadorePublisherRatelimitFeature.new
    when "retry"
      YadorePublisherRetryFeature.new
    when "test"
      YadorePublisherTestFeature.new
    when "timeout"
      YadorePublisherTimeoutFeature.new
    else
      YadorePublisherBaseFeature.new
    end
  end
end
