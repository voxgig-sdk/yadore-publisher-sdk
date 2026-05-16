-- YadorePublisher SDK error

local YadorePublisherError = {}
YadorePublisherError.__index = YadorePublisherError


function YadorePublisherError.new(code, msg, ctx)
  local self = setmetatable({}, YadorePublisherError)
  self.is_sdk_error = true
  self.sdk = "YadorePublisher"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function YadorePublisherError:error()
  return self.msg
end


function YadorePublisherError:__tostring()
  return self.msg
end


return YadorePublisherError
