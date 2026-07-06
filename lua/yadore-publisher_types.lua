-- Typed models for the YadorePublisher SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class ConversionDetail
---@field click_id? string
---@field date? string
---@field market? string
---@field merchant? table
---@field placement_id? string
---@field sale? number

---@class ConversionDetailListMatch
---@field click_id? string
---@field date? string
---@field market? string
---@field merchant? table
---@field placement_id? string
---@field sale? number

---@class ConversionDetailMerchant
---@field click? number
---@field market? string
---@field merchant? table
---@field sale? number

---@class ConversionDetailMerchantListMatch
---@field click? number
---@field market? string
---@field merchant? table
---@field sale? number

---@class ConversionGeneral
---@field date? table
---@field market? table
---@field total? table

---@class ConversionGeneralLoadMatch
---@field date? table
---@field market? table
---@field total? table

---@class ConversionStatus
---@field status? string

---@class ConversionStatusLoadMatch
---@field status? string

---@class Deeplink
---@field is_couponing? boolean
---@field market string
---@field placement_id? string
---@field result? table
---@field url table

---@class DeeplinkCreateData
---@field is_couponing? boolean
---@field market string
---@field placement_id? string
---@field result? table
---@field url table

---@class DeeplinkMerchant
---@field deeplink_count? number
---@field estimated_cpc? table
---@field has_external_homepage? boolean
---@field has_smartlink_homepage? boolean
---@field id? string
---@field is_smartlink? boolean
---@field logo? table
---@field name? string
---@field traffic_type? table

---@class DeeplinkMerchantListMatch
---@field deeplink_count? number
---@field estimated_cpc? table
---@field has_external_homepage? boolean
---@field has_smartlink_homepage? boolean
---@field id? string
---@field is_smartlink? boolean
---@field logo? table
---@field name? string
---@field traffic_type? table

---@class Dnt

---@class DntLoadMatch

---@class Market
---@field id? string

---@class MarketListMatch
---@field id? string

---@class Merchant
---@field id? string
---@field logo? table
---@field name? string
---@field offer_count? number
---@field traffic_type? table

---@class MerchantListMatch
---@field id? string
---@field logo? table
---@field name? string
---@field offer_count? number
---@field traffic_type? table

---@class Offer
---@field availability? string
---@field brand? string
---@field click_url? string
---@field description? string
---@field ean? table
---@field eer? string
---@field estimated_cpc? table
---@field id? string
---@field image? table
---@field merchant? table
---@field original_price? table
---@field price? table
---@field promo_text? string
---@field shipping_price? table
---@field shipping_time? table
---@field thumbnail? table
---@field title? string
---@field unit_price? table

---@class OfferLoadMatch
---@field availability? string
---@field brand? string
---@field click_url? string
---@field description? string
---@field ean? table
---@field eer? string
---@field estimated_cpc? table
---@field id string
---@field image? table
---@field merchant? table
---@field original_price? table
---@field price? table
---@field promo_text? string
---@field shipping_price? table
---@field shipping_time? table
---@field thumbnail? table
---@field title? string
---@field unit_price? table

---@class OfferListMatch
---@field availability? string
---@field brand? string
---@field click_url? string
---@field description? string
---@field ean? table
---@field eer? string
---@field estimated_cpc? table
---@field id? string
---@field image? table
---@field merchant? table
---@field original_price? table
---@field price? table
---@field promo_text? string
---@field shipping_price? table
---@field shipping_time? table
---@field thumbnail? table
---@field title? string
---@field unit_price? table

---@class ReportDetail
---@field click_id? string
---@field currency? string
---@field date? string
---@field market? string
---@field merchant? table
---@field placement_id? string
---@field revenue? number

---@class ReportDetailListMatch
---@field click_id? string
---@field currency? string
---@field date? string
---@field market? string
---@field merchant? table
---@field placement_id? string
---@field revenue? number

---@class ReportGeneral
---@field date? table
---@field market? table
---@field total? table

---@class ReportGeneralLoadMatch
---@field date? table
---@field market? table
---@field total? table

---@class ReportModified
---@field market? table

---@class ReportModifiedLoadMatch
---@field market? table

---@class ReportStatus
---@field status? string

---@class ReportStatusLoadMatch
---@field status? string

local M = {}

return M
