# Opensensemap SDK exists test

require "minitest/autorun"
require_relative "../Opensensemap_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = OpensensemapSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
