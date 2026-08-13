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
# @!attribute [rw] clickId
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
# @!attribute [rw] placementId
#   @return [String, nil]
#
# @!attribute [rw] sales
#   @return [Float, nil]
ConversionDetail = Struct.new(
  :clickId,
  :date,
  :market,
  :merchant,
  :placementId,
  :sales,
  keyword_init: true
)

# Request payload for ConversionDetail#list.
#
# @!attribute [rw] clickId
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
# @!attribute [rw] placementId
#   @return [String, nil]
#
# @!attribute [rw] sales
#   @return [Float, nil]
ConversionDetailListMatch = Struct.new(
  :clickId,
  :date,
  :market,
  :merchant,
  :placementId,
  :sales,
  keyword_init: true
)

# ConversionDetailMerchant entity data model.
#
# @!attribute [rw] clicks
#   @return [Integer, nil]
#
# @!attribute [rw] market
#   @return [String, nil]
#
# @!attribute [rw] merchant
#   @return [Hash, nil]
#
# @!attribute [rw] sales
#   @return [Integer, nil]
ConversionDetailMerchant = Struct.new(
  :clicks,
  :market,
  :merchant,
  :sales,
  keyword_init: true
)

# Request payload for ConversionDetailMerchant#list.
#
# @!attribute [rw] clicks
#   @return [Integer, nil]
#
# @!attribute [rw] market
#   @return [String, nil]
#
# @!attribute [rw] merchant
#   @return [Hash, nil]
#
# @!attribute [rw] sales
#   @return [Integer, nil]
ConversionDetailMerchantListMatch = Struct.new(
  :clicks,
  :market,
  :merchant,
  :sales,
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

# Request payload for ConversionGeneral#load.
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

# Request payload for ConversionStatus#load.
#
# @!attribute [rw] status
#   @return [String, nil]
ConversionStatusLoadMatch = Struct.new(
  :status,
  keyword_init: true
)

# Deeplink entity data model.
#
# @!attribute [rw] deeplinks
#   @return [Array, nil]
#
# @!attribute [rw] found
#   @return [Integer, nil]
#
# @!attribute [rw] isCouponing
#   @return [Boolean, nil]
#
# @!attribute [rw] market
#   @return [String]
#
# @!attribute [rw] placementId
#   @return [String, nil]
#
# @!attribute [rw] total
#   @return [Integer, nil]
#
# @!attribute [rw] urls
#   @return [Array]
Deeplink = Struct.new(
  :deeplinks,
  :found,
  :isCouponing,
  :market,
  :placementId,
  :total,
  :urls,
  keyword_init: true
)

# Request payload for Deeplink#create.
#
# @!attribute [rw] deeplinks
#   @return [Array, nil]
#
# @!attribute [rw] found
#   @return [Integer, nil]
#
# @!attribute [rw] isCouponing
#   @return [Boolean, nil]
#
# @!attribute [rw] market
#   @return [String]
#
# @!attribute [rw] placementId
#   @return [String, nil]
#
# @!attribute [rw] total
#   @return [Integer, nil]
#
# @!attribute [rw] urls
#   @return [Array]
DeeplinkCreateData = Struct.new(
  :deeplinks,
  :found,
  :isCouponing,
  :market,
  :placementId,
  :total,
  :urls,
  keyword_init: true
)

# DeeplinkMerchant entity data model.
#
# @!attribute [rw] deeplinkCount
#   @return [Integer, nil]
#
# @!attribute [rw] estimatedCpc
#   @return [Hash, nil]
#
# @!attribute [rw] hasExternalHomepage
#   @return [Boolean, nil]
#
# @!attribute [rw] hasSmartlinkHomepage
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] isSmartlink
#   @return [Boolean, nil]
#
# @!attribute [rw] logo
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] trafficTypes
#   @return [Array, nil]
DeeplinkMerchant = Struct.new(
  :deeplinkCount,
  :estimatedCpc,
  :hasExternalHomepage,
  :hasSmartlinkHomepage,
  :id,
  :isSmartlink,
  :logo,
  :name,
  :trafficTypes,
  keyword_init: true
)

# Request payload for DeeplinkMerchant#list.
#
# @!attribute [rw] deeplinkCount
#   @return [Integer, nil]
#
# @!attribute [rw] estimatedCpc
#   @return [Hash, nil]
#
# @!attribute [rw] hasExternalHomepage
#   @return [Boolean, nil]
#
# @!attribute [rw] hasSmartlinkHomepage
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] isSmartlink
#   @return [Boolean, nil]
#
# @!attribute [rw] logo
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] trafficTypes
#   @return [Array, nil]
DeeplinkMerchantListMatch = Struct.new(
  :deeplinkCount,
  :estimatedCpc,
  :hasExternalHomepage,
  :hasSmartlinkHomepage,
  :id,
  :isSmartlink,
  :logo,
  :name,
  :trafficTypes,
  keyword_init: true
)

# Dnt entity data model.
class Dnt
end

# Request payload for Dnt#load.
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

# Request payload for Market#list.
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
# @!attribute [rw] offerCount
#   @return [Integer, nil]
#
# @!attribute [rw] trafficTypes
#   @return [Array, nil]
Merchant = Struct.new(
  :id,
  :logo,
  :name,
  :offerCount,
  :trafficTypes,
  keyword_init: true
)

# Request payload for Merchant#list.
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
# @!attribute [rw] offerCount
#   @return [Integer, nil]
#
# @!attribute [rw] trafficTypes
#   @return [Array, nil]
MerchantListMatch = Struct.new(
  :id,
  :logo,
  :name,
  :offerCount,
  :trafficTypes,
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
# @!attribute [rw] clickUrl
#   @return [String, nil]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] eer
#   @return [String, nil]
#
# @!attribute [rw] estimatedCpc
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
# @!attribute [rw] offers
#   @return [Array, nil]
#
# @!attribute [rw] originalPrice
#   @return [Hash, nil]
#
# @!attribute [rw] price
#   @return [Hash, nil]
#
# @!attribute [rw] promoText
#   @return [String, nil]
#
# @!attribute [rw] shippingPrice
#   @return [Hash, nil]
#
# @!attribute [rw] shippingTime
#   @return [Hash, nil]
#
# @!attribute [rw] thumbnail
#   @return [Hash, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] unitPrice
#   @return [Hash, nil]
Offer = Struct.new(
  :availability,
  :brand,
  :clickUrl,
  :count,
  :description,
  :eer,
  :estimatedCpc,
  :id,
  :image,
  :merchant,
  :offers,
  :originalPrice,
  :price,
  :promoText,
  :shippingPrice,
  :shippingTime,
  :thumbnail,
  :title,
  :unitPrice,
  keyword_init: true
)

# Request payload for Offer#load.
#
# @!attribute [rw] availability
#   @return [String, nil]
#
# @!attribute [rw] brand
#   @return [String, nil]
#
# @!attribute [rw] clickUrl
#   @return [String, nil]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] eer
#   @return [String, nil]
#
# @!attribute [rw] estimatedCpc
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] image
#   @return [Hash, nil]
#
# @!attribute [rw] merchant
#   @return [Hash, nil]
#
# @!attribute [rw] offers
#   @return [Array, nil]
#
# @!attribute [rw] originalPrice
#   @return [Hash, nil]
#
# @!attribute [rw] price
#   @return [Hash, nil]
#
# @!attribute [rw] promoText
#   @return [String, nil]
#
# @!attribute [rw] shippingPrice
#   @return [Hash, nil]
#
# @!attribute [rw] shippingTime
#   @return [Hash, nil]
#
# @!attribute [rw] thumbnail
#   @return [Hash, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] unitPrice
#   @return [Hash, nil]
OfferLoadMatch = Struct.new(
  :availability,
  :brand,
  :clickUrl,
  :count,
  :description,
  :eer,
  :estimatedCpc,
  :id,
  :image,
  :merchant,
  :offers,
  :originalPrice,
  :price,
  :promoText,
  :shippingPrice,
  :shippingTime,
  :thumbnail,
  :title,
  :unitPrice,
  keyword_init: true
)

# Request payload for Offer#list.
#
# @!attribute [rw] availability
#   @return [String, nil]
#
# @!attribute [rw] brand
#   @return [String, nil]
#
# @!attribute [rw] clickUrl
#   @return [String, nil]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] eer
#   @return [String, nil]
#
# @!attribute [rw] estimatedCpc
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
# @!attribute [rw] offers
#   @return [Array, nil]
#
# @!attribute [rw] originalPrice
#   @return [Hash, nil]
#
# @!attribute [rw] price
#   @return [Hash, nil]
#
# @!attribute [rw] promoText
#   @return [String, nil]
#
# @!attribute [rw] shippingPrice
#   @return [Hash, nil]
#
# @!attribute [rw] shippingTime
#   @return [Hash, nil]
#
# @!attribute [rw] thumbnail
#   @return [Hash, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] unitPrice
#   @return [Hash, nil]
OfferListMatch = Struct.new(
  :availability,
  :brand,
  :clickUrl,
  :count,
  :description,
  :eer,
  :estimatedCpc,
  :id,
  :image,
  :merchant,
  :offers,
  :originalPrice,
  :price,
  :promoText,
  :shippingPrice,
  :shippingTime,
  :thumbnail,
  :title,
  :unitPrice,
  keyword_init: true
)

# ReportDetail entity data model.
#
# @!attribute [rw] clickId
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
# @!attribute [rw] placementId
#   @return [String, nil]
#
# @!attribute [rw] revenue
#   @return [Float, nil]
ReportDetail = Struct.new(
  :clickId,
  :currency,
  :date,
  :market,
  :merchant,
  :placementId,
  :revenue,
  keyword_init: true
)

# Request payload for ReportDetail#list.
#
# @!attribute [rw] clickId
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
# @!attribute [rw] placementId
#   @return [String, nil]
#
# @!attribute [rw] revenue
#   @return [Float, nil]
ReportDetailListMatch = Struct.new(
  :clickId,
  :currency,
  :date,
  :market,
  :merchant,
  :placementId,
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

# Request payload for ReportGeneral#load.
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
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] modifiedDate
#   @return [String, nil]
ReportModified = Struct.new(
  :date,
  :modifiedDate,
  keyword_init: true
)

# Request payload for ReportModified#load.
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] modifiedDate
#   @return [String, nil]
ReportModifiedLoadMatch = Struct.new(
  :date,
  :modifiedDate,
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

# Request payload for ReportStatus#load.
#
# @!attribute [rw] status
#   @return [String, nil]
ReportStatusLoadMatch = Struct.new(
  :status,
  keyword_init: true
)

