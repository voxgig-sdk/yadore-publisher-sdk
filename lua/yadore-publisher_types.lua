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

---@class ConversionDetailMerchant
---@field click? number
---@field market? string
---@field merchant? table
---@field sale? number

---@class ConversionDetailMerchantListMatch

---@class ConversionGeneral
---@field date? table
---@field market? table
---@field total? table

---@class ConversionGeneralLoadMatch

---@class ConversionStatus
---@field status? string

---@class ConversionStatusLoadMatch

---@class Deeplink
---@field is_couponing? boolean
---@field market string
---@field placement_id? string
---@field result? table
---@field url table

---@class DeeplinkCreateData

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

---@class Dnt

---@class DntLoadMatch

---@class Market
---@field id? string

---@class MarketListMatch

---@class Merchant
---@field id? string
---@field logo? table
---@field name? string
---@field offer_count? number
---@field traffic_type? table

---@class MerchantListMatch

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

---@class OfferListMatch

---@class ReportDetail
---@field click_id? string
---@field currency? string
---@field date? string
---@field market? string
---@field merchant? table
---@field placement_id? string
---@field revenue? number

---@class ReportDetailListMatch

---@class ReportGeneral
---@field date? table
---@field market? table
---@field total? table

---@class ReportGeneralLoadMatch

---@class ReportModified
---@field market? table

---@class ReportModifiedLoadMatch

---@class ReportStatus
---@field status? string

---@class ReportStatusLoadMatch

local M = {}

return M
