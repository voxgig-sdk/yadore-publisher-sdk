-- Typed models for the YadorePublisher SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class ConversionDetail
---@field clickId? string
---@field date? string
---@field market? string
---@field merchant? table
---@field placementId? string
---@field sales? number

---@class ConversionDetailListMatch
---@field date string
---@field format string
---@field market? string

---@class ConversionDetailMerchant
---@field clicks? number
---@field market? string
---@field merchant? table
---@field sales? number

---@class ConversionDetailMerchantListMatch
---@field format string
---@field from string
---@field market? string
---@field to string

---@class ConversionGeneral
---@field date? table
---@field market? table
---@field total? table

---@class ConversionGeneralLoadMatch
---@field format string
---@field from string
---@field to string

---@class ConversionStatus
---@field status? string

---@class ConversionStatusLoadMatch
---@field date string

---@class Deeplink
---@field deeplinks? table
---@field found? number
---@field isCouponing? boolean
---@field market string
---@field placementId? string
---@field total? number
---@field urls table

---@class DeeplinkCreateData
---@field deeplinks? table
---@field found? number
---@field isCouponing? boolean
---@field market string
---@field placementId? string
---@field total? number
---@field urls table

---@class DeeplinkMerchant
---@field deeplinkCount? number
---@field estimatedCpc? table
---@field hasExternalHomepage? boolean
---@field hasSmartlinkHomepage? boolean
---@field id? string
---@field isSmartlink? boolean
---@field logo? table
---@field name? string
---@field trafficTypes? table

---@class DeeplinkMerchantListMatch
---@field has_homepage? boolean
---@field is_couponing? boolean
---@field is_smartlink? boolean
---@field market string

---@class Dnt

---@class DntLoadMatch
---@field callback_url? string
---@field is_couponing? boolean
---@field market string
---@field merchant_id? string
---@field placement_id? string
---@field project_id string
---@field url string

---@class Market
---@field id? string

---@class MarketListMatch
---@field id? string

---@class Merchant
---@field id? string
---@field logo? table
---@field name? string
---@field offerCount? number
---@field trafficTypes? table

---@class MerchantListMatch
---@field is_couponing? boolean
---@field market string

---@class Offer
---@field availability? string
---@field brand? string
---@field clickUrl? string
---@field count? number
---@field description? string
---@field eer? string
---@field estimatedCpc? table
---@field id? string
---@field image? table
---@field merchant? table
---@field offers? table
---@field originalPrice? table
---@field price? table
---@field promoText? string
---@field shippingPrice? table
---@field shippingTime? table
---@field thumbnail? table
---@field title? string
---@field unitPrice? table

---@class OfferLoadMatch
---@field ean string
---@field is_couponing? boolean
---@field market string
---@field merchant_id? string
---@field placement_id? string

---@class OfferListMatch
---@field ean? string
---@field is_couponing? boolean
---@field keyword? string
---@field limit? number
---@field market string
---@field merchant_id? string
---@field offer_id? string
---@field placement_id? string
---@field precision? string
---@field sort? string

---@class ReportDetail
---@field clickId? string
---@field currency? string
---@field date? string
---@field market? string
---@field merchant? table
---@field placementId? string
---@field revenue? number

---@class ReportDetailListMatch
---@field date string
---@field format string
---@field market? string

---@class ReportGeneral
---@field date? table
---@field market? table
---@field total? table

---@class ReportGeneralLoadMatch
---@field date string
---@field format string

---@class ReportModified
---@field date? string
---@field modifiedDate? string

---@class ReportModifiedLoadMatch
---@field from string
---@field market? string
---@field to string

---@class ReportStatus
---@field status? string

---@class ReportStatusLoadMatch
---@field date string

local M = {}

return M
