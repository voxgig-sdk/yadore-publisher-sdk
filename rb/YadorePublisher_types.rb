# frozen_string_literal: true

# Typed models for the YadorePublisher SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# ConversionDetail entity data model.
#
# @!attribute [rw] click_id
#   @return [String, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] market
#   @return [String, nil]
#
# @!attribute [rw] merchant
#   @return [Hash, nil]
#
# @!attribute [rw] placement_id
#   @return [String, nil]
#
# @!attribute [rw] sale
#   @return [Float, nil]
ConversionDetail = Struct.new(
  :click_id,
  :date,
  :market,
  :merchant,
  :placement_id,
  :sale,
  keyword_init: true
)

# Match filter for ConversionDetail#list (any subset of ConversionDetail fields).
#
# @!attribute [rw] click_id
#   @return [String, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] market
#   @return [String, nil]
#
# @!attribute [rw] merchant
#   @return [Hash, nil]
#
# @!attribute [rw] placement_id
#   @return [String, nil]
#
# @!attribute [rw] sale
#   @return [Float, nil]
ConversionDetailListMatch = Struct.new(
  :click_id,
  :date,
  :market,
  :merchant,
  :placement_id,
  :sale,
  keyword_init: true
)

# ConversionDetailMerchant entity data model.
#
# @!attribute [rw] click
#   @return [Integer, nil]
#
# @!attribute [rw] market
#   @return [String, nil]
#
# @!attribute [rw] merchant
#   @return [Hash, nil]
#
# @!attribute [rw] sale
#   @return [Integer, nil]
ConversionDetailMerchant = Struct.new(
  :click,
  :market,
  :merchant,
  :sale,
  keyword_init: true
)

# Match filter for ConversionDetailMerchant#list (any subset of ConversionDetailMerchant fields).
#
# @!attribute [rw] click
#   @return [Integer, nil]
#
# @!attribute [rw] market
#   @return [String, nil]
#
# @!attribute [rw] merchant
#   @return [Hash, nil]
#
# @!attribute [rw] sale
#   @return [Integer, nil]
ConversionDetailMerchantListMatch = Struct.new(
  :click,
  :market,
  :merchant,
  :sale,
  keyword_init: true
)

# ConversionGeneral entity data model.
#
# @!attribute [rw] date
#   @return [Hash, nil]
#
# @!attribute [rw] market
#   @return [Hash, nil]
#
# @!attribute [rw] total
#   @return [Hash, nil]
ConversionGeneral = Struct.new(
  :date,
  :market,
  :total,
  keyword_init: true
)

# Match filter for ConversionGeneral#load (any subset of ConversionGeneral fields).
#
# @!attribute [rw] date
#   @return [Hash, nil]
#
# @!attribute [rw] market
#   @return [Hash, nil]
#
# @!attribute [rw] total
#   @return [Hash, nil]
ConversionGeneralLoadMatch = Struct.new(
  :date,
  :market,
  :total,
  keyword_init: true
)

# ConversionStatus entity data model.
#
# @!attribute [rw] status
#   @return [String, nil]
ConversionStatus = Struct.new(
  :status,
  keyword_init: true
)

# Match filter for ConversionStatus#load (any subset of ConversionStatus fields).
#
# @!attribute [rw] status
#   @return [String, nil]
ConversionStatusLoadMatch = Struct.new(
  :status,
  keyword_init: true
)

# Deeplink entity data model.
#
# @!attribute [rw] is_couponing
#   @return [Boolean, nil]
#
# @!attribute [rw] market
#   @return [String]
#
# @!attribute [rw] placement_id
#   @return [String, nil]
#
# @!attribute [rw] result
#   @return [Hash, nil]
#
# @!attribute [rw] url
#   @return [Array]
Deeplink = Struct.new(
  :is_couponing,
  :market,
  :placement_id,
  :result,
  :url,
  keyword_init: true
)

# Match filter for Deeplink#create (any subset of Deeplink fields).
#
# @!attribute [rw] is_couponing
#   @return [Boolean, nil]
#
# @!attribute [rw] market
#   @return [String, nil]
#
# @!attribute [rw] placement_id
#   @return [String, nil]
#
# @!attribute [rw] result
#   @return [Hash, nil]
#
# @!attribute [rw] url
#   @return [Array, nil]
DeeplinkCreateData = Struct.new(
  :is_couponing,
  :market,
  :placement_id,
  :result,
  :url,
  keyword_init: true
)

# DeeplinkMerchant entity data model.
#
# @!attribute [rw] deeplink_count
#   @return [Integer, nil]
#
# @!attribute [rw] estimated_cpc
#   @return [Hash, nil]
#
# @!attribute [rw] has_external_homepage
#   @return [Boolean, nil]
#
# @!attribute [rw] has_smartlink_homepage
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] is_smartlink
#   @return [Boolean, nil]
#
# @!attribute [rw] logo
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] traffic_type
#   @return [Array, nil]
DeeplinkMerchant = Struct.new(
  :deeplink_count,
  :estimated_cpc,
  :has_external_homepage,
  :has_smartlink_homepage,
  :id,
  :is_smartlink,
  :logo,
  :name,
  :traffic_type,
  keyword_init: true
)

# Match filter for DeeplinkMerchant#list (any subset of DeeplinkMerchant fields).
#
# @!attribute [rw] deeplink_count
#   @return [Integer, nil]
#
# @!attribute [rw] estimated_cpc
#   @return [Hash, nil]
#
# @!attribute [rw] has_external_homepage
#   @return [Boolean, nil]
#
# @!attribute [rw] has_smartlink_homepage
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] is_smartlink
#   @return [Boolean, nil]
#
# @!attribute [rw] logo
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] traffic_type
#   @return [Array, nil]
DeeplinkMerchantListMatch = Struct.new(
  :deeplink_count,
  :estimated_cpc,
  :has_external_homepage,
  :has_smartlink_homepage,
  :id,
  :is_smartlink,
  :logo,
  :name,
  :traffic_type,
  keyword_init: true
)

# Dnt entity data model.
class Dnt
end

# Match filter for Dnt#load (any subset of Dnt fields).
class DntLoadMatch
end

# Market entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
Market = Struct.new(
  :id,
  keyword_init: true
)

# Match filter for Market#list (any subset of Market fields).
#
# @!attribute [rw] id
#   @return [String, nil]
MarketListMatch = Struct.new(
  :id,
  keyword_init: true
)

# Merchant entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] logo
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] offer_count
#   @return [Integer, nil]
#
# @!attribute [rw] traffic_type
#   @return [Array, nil]
Merchant = Struct.new(
  :id,
  :logo,
  :name,
  :offer_count,
  :traffic_type,
  keyword_init: true
)

# Match filter for Merchant#list (any subset of Merchant fields).
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] logo
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] offer_count
#   @return [Integer, nil]
#
# @!attribute [rw] traffic_type
#   @return [Array, nil]
MerchantListMatch = Struct.new(
  :id,
  :logo,
  :name,
  :offer_count,
  :traffic_type,
  keyword_init: true
)

# Offer entity data model.
#
# @!attribute [rw] availability
#   @return [String, nil]
#
# @!attribute [rw] brand
#   @return [String, nil]
#
# @!attribute [rw] click_url
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] ean
#   @return [Hash, nil]
#
# @!attribute [rw] eer
#   @return [String, nil]
#
# @!attribute [rw] estimated_cpc
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] image
#   @return [Hash, nil]
#
# @!attribute [rw] merchant
#   @return [Hash, nil]
#
# @!attribute [rw] original_price
#   @return [Hash, nil]
#
# @!attribute [rw] price
#   @return [Hash, nil]
#
# @!attribute [rw] promo_text
#   @return [String, nil]
#
# @!attribute [rw] shipping_price
#   @return [Hash, nil]
#
# @!attribute [rw] shipping_time
#   @return [Hash, nil]
#
# @!attribute [rw] thumbnail
#   @return [Hash, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] unit_price
#   @return [Hash, nil]
Offer = Struct.new(
  :availability,
  :brand,
  :click_url,
  :description,
  :ean,
  :eer,
  :estimated_cpc,
  :id,
  :image,
  :merchant,
  :original_price,
  :price,
  :promo_text,
  :shipping_price,
  :shipping_time,
  :thumbnail,
  :title,
  :unit_price,
  keyword_init: true
)

# Match filter for Offer#load (any subset of Offer fields).
#
# @!attribute [rw] availability
#   @return [String, nil]
#
# @!attribute [rw] brand
#   @return [String, nil]
#
# @!attribute [rw] click_url
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] ean
#   @return [Hash, nil]
#
# @!attribute [rw] eer
#   @return [String, nil]
#
# @!attribute [rw] estimated_cpc
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] image
#   @return [Hash, nil]
#
# @!attribute [rw] merchant
#   @return [Hash, nil]
#
# @!attribute [rw] original_price
#   @return [Hash, nil]
#
# @!attribute [rw] price
#   @return [Hash, nil]
#
# @!attribute [rw] promo_text
#   @return [String, nil]
#
# @!attribute [rw] shipping_price
#   @return [Hash, nil]
#
# @!attribute [rw] shipping_time
#   @return [Hash, nil]
#
# @!attribute [rw] thumbnail
#   @return [Hash, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] unit_price
#   @return [Hash, nil]
OfferLoadMatch = Struct.new(
  :availability,
  :brand,
  :click_url,
  :description,
  :ean,
  :eer,
  :estimated_cpc,
  :id,
  :image,
  :merchant,
  :original_price,
  :price,
  :promo_text,
  :shipping_price,
  :shipping_time,
  :thumbnail,
  :title,
  :unit_price,
  keyword_init: true
)

# Match filter for Offer#list (any subset of Offer fields).
#
# @!attribute [rw] availability
#   @return [String, nil]
#
# @!attribute [rw] brand
#   @return [String, nil]
#
# @!attribute [rw] click_url
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] ean
#   @return [Hash, nil]
#
# @!attribute [rw] eer
#   @return [String, nil]
#
# @!attribute [rw] estimated_cpc
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] image
#   @return [Hash, nil]
#
# @!attribute [rw] merchant
#   @return [Hash, nil]
#
# @!attribute [rw] original_price
#   @return [Hash, nil]
#
# @!attribute [rw] price
#   @return [Hash, nil]
#
# @!attribute [rw] promo_text
#   @return [String, nil]
#
# @!attribute [rw] shipping_price
#   @return [Hash, nil]
#
# @!attribute [rw] shipping_time
#   @return [Hash, nil]
#
# @!attribute [rw] thumbnail
#   @return [Hash, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] unit_price
#   @return [Hash, nil]
OfferListMatch = Struct.new(
  :availability,
  :brand,
  :click_url,
  :description,
  :ean,
  :eer,
  :estimated_cpc,
  :id,
  :image,
  :merchant,
  :original_price,
  :price,
  :promo_text,
  :shipping_price,
  :shipping_time,
  :thumbnail,
  :title,
  :unit_price,
  keyword_init: true
)

# ReportDetail entity data model.
#
# @!attribute [rw] click_id
#   @return [String, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] market
#   @return [String, nil]
#
# @!attribute [rw] merchant
#   @return [Hash, nil]
#
# @!attribute [rw] placement_id
#   @return [String, nil]
#
# @!attribute [rw] revenue
#   @return [Float, nil]
ReportDetail = Struct.new(
  :click_id,
  :currency,
  :date,
  :market,
  :merchant,
  :placement_id,
  :revenue,
  keyword_init: true
)

# Match filter for ReportDetail#list (any subset of ReportDetail fields).
#
# @!attribute [rw] click_id
#   @return [String, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] market
#   @return [String, nil]
#
# @!attribute [rw] merchant
#   @return [Hash, nil]
#
# @!attribute [rw] placement_id
#   @return [String, nil]
#
# @!attribute [rw] revenue
#   @return [Float, nil]
ReportDetailListMatch = Struct.new(
  :click_id,
  :currency,
  :date,
  :market,
  :merchant,
  :placement_id,
  :revenue,
  keyword_init: true
)

# ReportGeneral entity data model.
#
# @!attribute [rw] date
#   @return [Hash, nil]
#
# @!attribute [rw] market
#   @return [Hash, nil]
#
# @!attribute [rw] total
#   @return [Hash, nil]
ReportGeneral = Struct.new(
  :date,
  :market,
  :total,
  keyword_init: true
)

# Match filter for ReportGeneral#load (any subset of ReportGeneral fields).
#
# @!attribute [rw] date
#   @return [Hash, nil]
#
# @!attribute [rw] market
#   @return [Hash, nil]
#
# @!attribute [rw] total
#   @return [Hash, nil]
ReportGeneralLoadMatch = Struct.new(
  :date,
  :market,
  :total,
  keyword_init: true
)

# ReportModified entity data model.
#
# @!attribute [rw] market
#   @return [Hash, nil]
ReportModified = Struct.new(
  :market,
  keyword_init: true
)

# Match filter for ReportModified#load (any subset of ReportModified fields).
#
# @!attribute [rw] market
#   @return [Hash, nil]
ReportModifiedLoadMatch = Struct.new(
  :market,
  keyword_init: true
)

# ReportStatus entity data model.
#
# @!attribute [rw] status
#   @return [String, nil]
ReportStatus = Struct.new(
  :status,
  keyword_init: true
)

# Match filter for ReportStatus#load (any subset of ReportStatus fields).
#
# @!attribute [rw] status
#   @return [String, nil]
ReportStatusLoadMatch = Struct.new(
  :status,
  keyword_init: true
)

