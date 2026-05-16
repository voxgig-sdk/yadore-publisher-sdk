# YadorePublisher SDK exists test

require "minitest/autorun"
require_relative "../YadorePublisher_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = YadorePublisherSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
