# YadorePublisher SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module YadorePublisherFeatures
  def self.make_feature(name)
    case name
    when "base"
      YadorePublisherBaseFeature.new
    when "test"
      YadorePublisherTestFeature.new
    else
      YadorePublisherBaseFeature.new
    end
  end
end
