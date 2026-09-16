# Opensensemap SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module OpensensemapFeatures
  def self.make_feature(name)
    case name
    when "base"
      OpensensemapBaseFeature.new
    when "ratelimit"
      OpensensemapRatelimitFeature.new
    when "retry"
      OpensensemapRetryFeature.new
    when "test"
      OpensensemapTestFeature.new
    when "timeout"
      OpensensemapTimeoutFeature.new
    else
      OpensensemapBaseFeature.new
    end
  end
end
