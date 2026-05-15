-- Opensensemap SDK error

local OpensensemapError = {}
OpensensemapError.__index = OpensensemapError


function OpensensemapError.new(code, msg, ctx)
  local self = setmetatable({}, OpensensemapError)
  self.is_sdk_error = true
  self.sdk = "Opensensemap"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function OpensensemapError:error()
  return self.msg
end


function OpensensemapError:__tostring()
  return self.msg
end


return OpensensemapError
