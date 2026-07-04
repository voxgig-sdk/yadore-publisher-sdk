-- YadorePublisher SDK

local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local YadorePublisherSDK = {}
YadorePublisherSDK.__index = YadorePublisherSDK


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

YadorePublisherSDK._make_feature = _make_feature


function YadorePublisherSDK.new(options)
  local self = setmetatable({}, YadorePublisherSDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features from config.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local feature_items = vs.items(feature_opts)
    if feature_items ~= nil then
      for _, item in ipairs(feature_items) do
        local fname = item[1]
        local fopts = helpers.to_map(item[2])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

  -- #BuildFeatures

  return self
end


function YadorePublisherSDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function YadorePublisherSDK:get_utility()
  return Utility.copy(self._utility)
end


function YadorePublisherSDK:get_root_ctx()
  return self._rootctx
end


function YadorePublisherSDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" then method = "GET" end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


function YadorePublisherSDK:direct(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = fetch_err }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
    end

    return {
      ok = status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end



-- Idiomatic facade: client:conversion_detail():list() / client:conversion_detail():load({ id = ... })
function YadorePublisherSDK:conversion_detail(data)
  local EntityMod = require("entity.conversion_detail_entity")
  if data == nil then
    if self._conversion_detail == nil then
      self._conversion_detail = EntityMod.new(self, nil)
    end
    return self._conversion_detail
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:conversion_detail() instead.
function YadorePublisherSDK:ConversionDetail(data)
  local EntityMod = require("entity.conversion_detail_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:conversion_detail_merchant():list() / client:conversion_detail_merchant():load({ id = ... })
function YadorePublisherSDK:conversion_detail_merchant(data)
  local EntityMod = require("entity.conversion_detail_merchant_entity")
  if data == nil then
    if self._conversion_detail_merchant == nil then
      self._conversion_detail_merchant = EntityMod.new(self, nil)
    end
    return self._conversion_detail_merchant
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:conversion_detail_merchant() instead.
function YadorePublisherSDK:ConversionDetailMerchant(data)
  local EntityMod = require("entity.conversion_detail_merchant_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:conversion_general():list() / client:conversion_general():load({ id = ... })
function YadorePublisherSDK:conversion_general(data)
  local EntityMod = require("entity.conversion_general_entity")
  if data == nil then
    if self._conversion_general == nil then
      self._conversion_general = EntityMod.new(self, nil)
    end
    return self._conversion_general
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:conversion_general() instead.
function YadorePublisherSDK:ConversionGeneral(data)
  local EntityMod = require("entity.conversion_general_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:conversion_status():list() / client:conversion_status():load({ id = ... })
function YadorePublisherSDK:conversion_status(data)
  local EntityMod = require("entity.conversion_status_entity")
  if data == nil then
    if self._conversion_status == nil then
      self._conversion_status = EntityMod.new(self, nil)
    end
    return self._conversion_status
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:conversion_status() instead.
function YadorePublisherSDK:ConversionStatus(data)
  local EntityMod = require("entity.conversion_status_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:deeplink():list() / client:deeplink():load({ id = ... })
function YadorePublisherSDK:deeplink(data)
  local EntityMod = require("entity.deeplink_entity")
  if data == nil then
    if self._deeplink == nil then
      self._deeplink = EntityMod.new(self, nil)
    end
    return self._deeplink
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:deeplink() instead.
function YadorePublisherSDK:Deeplink(data)
  local EntityMod = require("entity.deeplink_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:deeplink_merchant():list() / client:deeplink_merchant():load({ id = ... })
function YadorePublisherSDK:deeplink_merchant(data)
  local EntityMod = require("entity.deeplink_merchant_entity")
  if data == nil then
    if self._deeplink_merchant == nil then
      self._deeplink_merchant = EntityMod.new(self, nil)
    end
    return self._deeplink_merchant
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:deeplink_merchant() instead.
function YadorePublisherSDK:DeeplinkMerchant(data)
  local EntityMod = require("entity.deeplink_merchant_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:dnt():list() / client:dnt():load({ id = ... })
function YadorePublisherSDK:dnt(data)
  local EntityMod = require("entity.dnt_entity")
  if data == nil then
    if self._dnt == nil then
      self._dnt = EntityMod.new(self, nil)
    end
    return self._dnt
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:dnt() instead.
function YadorePublisherSDK:Dnt(data)
  local EntityMod = require("entity.dnt_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:market():list() / client:market():load({ id = ... })
function YadorePublisherSDK:market(data)
  local EntityMod = require("entity.market_entity")
  if data == nil then
    if self._market == nil then
      self._market = EntityMod.new(self, nil)
    end
    return self._market
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:market() instead.
function YadorePublisherSDK:Market(data)
  local EntityMod = require("entity.market_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:merchant():list() / client:merchant():load({ id = ... })
function YadorePublisherSDK:merchant(data)
  local EntityMod = require("entity.merchant_entity")
  if data == nil then
    if self._merchant == nil then
      self._merchant = EntityMod.new(self, nil)
    end
    return self._merchant
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:merchant() instead.
function YadorePublisherSDK:Merchant(data)
  local EntityMod = require("entity.merchant_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:offer():list() / client:offer():load({ id = ... })
function YadorePublisherSDK:offer(data)
  local EntityMod = require("entity.offer_entity")
  if data == nil then
    if self._offer == nil then
      self._offer = EntityMod.new(self, nil)
    end
    return self._offer
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:offer() instead.
function YadorePublisherSDK:Offer(data)
  local EntityMod = require("entity.offer_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:report_detail():list() / client:report_detail():load({ id = ... })
function YadorePublisherSDK:report_detail(data)
  local EntityMod = require("entity.report_detail_entity")
  if data == nil then
    if self._report_detail == nil then
      self._report_detail = EntityMod.new(self, nil)
    end
    return self._report_detail
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:report_detail() instead.
function YadorePublisherSDK:ReportDetail(data)
  local EntityMod = require("entity.report_detail_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:report_general():list() / client:report_general():load({ id = ... })
function YadorePublisherSDK:report_general(data)
  local EntityMod = require("entity.report_general_entity")
  if data == nil then
    if self._report_general == nil then
      self._report_general = EntityMod.new(self, nil)
    end
    return self._report_general
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:report_general() instead.
function YadorePublisherSDK:ReportGeneral(data)
  local EntityMod = require("entity.report_general_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:report_modified():list() / client:report_modified():load({ id = ... })
function YadorePublisherSDK:report_modified(data)
  local EntityMod = require("entity.report_modified_entity")
  if data == nil then
    if self._report_modified == nil then
      self._report_modified = EntityMod.new(self, nil)
    end
    return self._report_modified
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:report_modified() instead.
function YadorePublisherSDK:ReportModified(data)
  local EntityMod = require("entity.report_modified_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:report_status():list() / client:report_status():load({ id = ... })
function YadorePublisherSDK:report_status(data)
  local EntityMod = require("entity.report_status_entity")
  if data == nil then
    if self._report_status == nil then
      self._report_status = EntityMod.new(self, nil)
    end
    return self._report_status
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:report_status() instead.
function YadorePublisherSDK:ReportStatus(data)
  local EntityMod = require("entity.report_status_entity")
  return EntityMod.new(self, data)
end




function YadorePublisherSDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = YadorePublisherSDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return YadorePublisherSDK
