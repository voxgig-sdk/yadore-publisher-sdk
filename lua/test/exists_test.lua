-- YadorePublisher SDK exists test

local sdk = require("yadore-publisher_sdk")

describe("YadorePublisherSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
