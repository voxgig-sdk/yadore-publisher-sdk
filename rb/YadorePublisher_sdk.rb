# YadorePublisher SDK

require_relative 'utility/struct/voxgig_struct'
require_relative 'core/utility_type'
require_relative 'core/spec'
require_relative 'core/helpers'

# Load utility registration
require_relative 'utility/register'

# Load config and features
require_relative 'config'
require_relative 'feature/base_feature'
require_relative 'features'

# Load typed models (Struct value objects).
require_relative 'YadorePublisher_types'


class YadorePublisherSDK
  attr_accessor :mode, :features, :options

  def initialize(options = {})
    @mode = "live"
    @features = []
    @options = nil

    utility = YadorePublisherUtility.new
    @_utility = utility

    config = YadorePublisherConfig.make_config

    @_rootctx = utility.make_context.call({
      "client" => self,
      "utility" => utility,
      "config" => config,
      "options" => options || {},
      "shared" => {},
    }, nil)

    @options = utility.make_options.call(@_rootctx)

    if VoxgigStruct.getpath(@options, "feature.test.active") == true
      @mode = "test"
    end

    @_rootctx.options = @options

    # Add features from config.
    feature_opts = YadorePublisherHelpers.to_map(VoxgigStruct.getprop(@options, "feature"))
    if feature_opts
      items = VoxgigStruct.items(feature_opts)
      if items
        items.each do |item|
          fname = item[0]
          fopts = YadorePublisherHelpers.to_map(item[1])
          if fopts && fopts["active"] == true
            utility.feature_add.call(@_rootctx, YadorePublisherFeatures.make_feature(fname))
          end
        end
      end
    end

    # Add extension features.
    extend_val = VoxgigStruct.getprop(@options, "extend")
    if extend_val.is_a?(Array)
      extend_val.each do |f|
        if f.respond_to?(:get_name)
          utility.feature_add.call(@_rootctx, f)
        end
      end
    end

    # Initialize features.
    @features.each do |f|
      utility.feature_init.call(@_rootctx, f)
    end

    utility.feature_hook.call(@_rootctx, "PostConstruct")
  end

  def options_map
    out = VoxgigStruct.clone(@options)
    out.is_a?(Hash) ? out : {}
  end

  def get_utility
    YadorePublisherUtility.copy(@_utility)
  end

  def get_root_ctx
    @_rootctx
  end

  def prepare(fetchargs = {})
    utility = @_utility
    fetchargs ||= {}

    ctrl = YadorePublisherHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "prepare",
      "ctrl" => ctrl,
    }, @_rootctx)

    opts = @options
    path = VoxgigStruct.getprop(fetchargs, "path") || ""
    path = "" unless path.is_a?(String)
    method_val = VoxgigStruct.getprop(fetchargs, "method") || "GET"
    method_val = "GET" unless method_val.is_a?(String)
    params = YadorePublisherHelpers.to_map(VoxgigStruct.getprop(fetchargs, "params")) || {}
    query = YadorePublisherHelpers.to_map(VoxgigStruct.getprop(fetchargs, "query")) || {}
    headers = utility.prepare_headers.call(ctx)

    base = VoxgigStruct.getprop(opts, "base") || ""
    base = "" unless base.is_a?(String)
    prefix = VoxgigStruct.getprop(opts, "prefix") || ""
    prefix = "" unless prefix.is_a?(String)
    suffix = VoxgigStruct.getprop(opts, "suffix") || ""
    suffix = "" unless suffix.is_a?(String)

    ctx.spec = YadorePublisherSpec.new({
      "base" => base, "prefix" => prefix, "suffix" => suffix,
      "path" => path, "method" => method_val,
      "params" => params, "query" => query, "headers" => headers,
      "body" => VoxgigStruct.getprop(fetchargs, "body"),
      "step" => "start",
    })

    # Merge user-provided headers.
    uh = VoxgigStruct.getprop(fetchargs, "headers")
    if uh.is_a?(Hash)
      uh.each { |k, v| ctx.spec.headers[k] = v }
    end

    _, err = utility.prepare_auth.call(ctx)
    raise err if err

    utility.make_fetch_def.call(ctx)
  end

  def direct(fetchargs = {})
    utility = @_utility

    # direct() is the raw-HTTP escape hatch: it always returns a result hash
    # ({ "ok" => ..., ... }) and never raises. prepare() raises on error, so
    # trap that and surface it in the hash.
    begin
      fetchdef = prepare(fetchargs)
    rescue YadorePublisherError => err
      return { "ok" => false, "err" => err }
    end

    fetchargs ||= {}
    ctrl = YadorePublisherHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "direct",
      "ctrl" => ctrl,
    }, @_rootctx)

    url = fetchdef["url"] || ""
    fetched, fetch_err = utility.fetcher.call(ctx, url, fetchdef)

    return { "ok" => false, "err" => fetch_err } if fetch_err

    if fetched.nil?
      return {
        "ok" => false,
        "err" => ctx.make_error("direct_no_response", "response: undefined"),
      }
    end

    if fetched.is_a?(Hash)
      status = YadorePublisherHelpers.to_int(VoxgigStruct.getprop(fetched, "status"))
      headers = VoxgigStruct.getprop(fetched, "headers") || {}

      # No-body responses (204, 304) and explicit zero content-length must
      # skip JSON parsing — calling json() on an empty body errors.
      content_length = headers.is_a?(Hash) ? headers["content-length"] : nil
      no_body = status == 204 || status == 304 || content_length.to_s == "0"

      json_data = nil
      unless no_body
        jf = VoxgigStruct.getprop(fetched, "json")
        if jf.is_a?(Proc)
          begin
            json_data = jf.call
          rescue StandardError
            # Non-JSON body — leave data nil, keep status/headers.
            json_data = nil
          end
        end
      end

      return {
        "ok" => status >= 200 && status < 300,
        "status" => status,
        "headers" => headers,
        "data" => json_data,
      }
    end

    return {
      "ok" => false,
      "err" => ctx.make_error("direct_invalid", "invalid response type"),
    }
  end


  # Idiomatic facade: client.conversion_detail.list / client.conversion_detail.load({ "id" => ... })
  def conversion_detail
    require_relative 'entity/conversion_detail_entity'
    @conversion_detail ||= ConversionDetailEntity.new(self, nil)
  end

  # Deprecated: use client.conversion_detail instead.
  def ConversionDetail(data = nil)
    require_relative 'entity/conversion_detail_entity'
    ConversionDetailEntity.new(self, data)
  end


  # Idiomatic facade: client.conversion_detail_merchant.list / client.conversion_detail_merchant.load({ "id" => ... })
  def conversion_detail_merchant
    require_relative 'entity/conversion_detail_merchant_entity'
    @conversion_detail_merchant ||= ConversionDetailMerchantEntity.new(self, nil)
  end

  # Deprecated: use client.conversion_detail_merchant instead.
  def ConversionDetailMerchant(data = nil)
    require_relative 'entity/conversion_detail_merchant_entity'
    ConversionDetailMerchantEntity.new(self, data)
  end


  # Idiomatic facade: client.conversion_general.list / client.conversion_general.load({ "id" => ... })
  def conversion_general
    require_relative 'entity/conversion_general_entity'
    @conversion_general ||= ConversionGeneralEntity.new(self, nil)
  end

  # Deprecated: use client.conversion_general instead.
  def ConversionGeneral(data = nil)
    require_relative 'entity/conversion_general_entity'
    ConversionGeneralEntity.new(self, data)
  end


  # Idiomatic facade: client.conversion_status.list / client.conversion_status.load({ "id" => ... })
  def conversion_status
    require_relative 'entity/conversion_status_entity'
    @conversion_status ||= ConversionStatusEntity.new(self, nil)
  end

  # Deprecated: use client.conversion_status instead.
  def ConversionStatus(data = nil)
    require_relative 'entity/conversion_status_entity'
    ConversionStatusEntity.new(self, data)
  end


  # Idiomatic facade: client.deeplink.list / client.deeplink.load({ "id" => ... })
  def deeplink
    require_relative 'entity/deeplink_entity'
    @deeplink ||= DeeplinkEntity.new(self, nil)
  end

  # Deprecated: use client.deeplink instead.
  def Deeplink(data = nil)
    require_relative 'entity/deeplink_entity'
    DeeplinkEntity.new(self, data)
  end


  # Idiomatic facade: client.deeplink_merchant.list / client.deeplink_merchant.load({ "id" => ... })
  def deeplink_merchant
    require_relative 'entity/deeplink_merchant_entity'
    @deeplink_merchant ||= DeeplinkMerchantEntity.new(self, nil)
  end

  # Deprecated: use client.deeplink_merchant instead.
  def DeeplinkMerchant(data = nil)
    require_relative 'entity/deeplink_merchant_entity'
    DeeplinkMerchantEntity.new(self, data)
  end


  # Idiomatic facade: client.dnt.list / client.dnt.load({ "id" => ... })
  def dnt
    require_relative 'entity/dnt_entity'
    @dnt ||= DntEntity.new(self, nil)
  end

  # Deprecated: use client.dnt instead.
  def Dnt(data = nil)
    require_relative 'entity/dnt_entity'
    DntEntity.new(self, data)
  end


  # Idiomatic facade: client.market.list / client.market.load({ "id" => ... })
  def market
    require_relative 'entity/market_entity'
    @market ||= MarketEntity.new(self, nil)
  end

  # Deprecated: use client.market instead.
  def Market(data = nil)
    require_relative 'entity/market_entity'
    MarketEntity.new(self, data)
  end


  # Idiomatic facade: client.merchant.list / client.merchant.load({ "id" => ... })
  def merchant
    require_relative 'entity/merchant_entity'
    @merchant ||= MerchantEntity.new(self, nil)
  end

  # Deprecated: use client.merchant instead.
  def Merchant(data = nil)
    require_relative 'entity/merchant_entity'
    MerchantEntity.new(self, data)
  end


  # Idiomatic facade: client.offer.list / client.offer.load({ "id" => ... })
  def offer
    require_relative 'entity/offer_entity'
    @offer ||= OfferEntity.new(self, nil)
  end

  # Deprecated: use client.offer instead.
  def Offer(data = nil)
    require_relative 'entity/offer_entity'
    OfferEntity.new(self, data)
  end


  # Idiomatic facade: client.report_detail.list / client.report_detail.load({ "id" => ... })
  def report_detail
    require_relative 'entity/report_detail_entity'
    @report_detail ||= ReportDetailEntity.new(self, nil)
  end

  # Deprecated: use client.report_detail instead.
  def ReportDetail(data = nil)
    require_relative 'entity/report_detail_entity'
    ReportDetailEntity.new(self, data)
  end


  # Idiomatic facade: client.report_general.list / client.report_general.load({ "id" => ... })
  def report_general
    require_relative 'entity/report_general_entity'
    @report_general ||= ReportGeneralEntity.new(self, nil)
  end

  # Deprecated: use client.report_general instead.
  def ReportGeneral(data = nil)
    require_relative 'entity/report_general_entity'
    ReportGeneralEntity.new(self, data)
  end


  # Idiomatic facade: client.report_modified.list / client.report_modified.load({ "id" => ... })
  def report_modified
    require_relative 'entity/report_modified_entity'
    @report_modified ||= ReportModifiedEntity.new(self, nil)
  end

  # Deprecated: use client.report_modified instead.
  def ReportModified(data = nil)
    require_relative 'entity/report_modified_entity'
    ReportModifiedEntity.new(self, data)
  end


  # Idiomatic facade: client.report_status.list / client.report_status.load({ "id" => ... })
  def report_status
    require_relative 'entity/report_status_entity'
    @report_status ||= ReportStatusEntity.new(self, nil)
  end

  # Deprecated: use client.report_status instead.
  def ReportStatus(data = nil)
    require_relative 'entity/report_status_entity'
    ReportStatusEntity.new(self, data)
  end



  def self.test(testopts = nil, sdkopts = nil)
    sdkopts = sdkopts || {}
    sdkopts = VoxgigStruct.clone(sdkopts)
    sdkopts = {} unless sdkopts.is_a?(Hash)

    testopts = testopts || {}
    testopts = VoxgigStruct.clone(testopts)
    testopts = {} unless testopts.is_a?(Hash)
    testopts["active"] = true

    VoxgigStruct.setpath(sdkopts, "feature.test", testopts)

    sdk = YadorePublisherSDK.new(sdkopts)
    sdk.mode = "test"
    sdk
  end
end
