// Typed models for the YadorePublisher SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface ConversionDetail {
  click_id?: string
  date?: string
  market?: string
  merchant?: Record<string, any>
  placement_id?: string
  sale?: number
}

export type ConversionDetailListMatch = Partial<ConversionDetail>

export interface ConversionDetailMerchant {
  click?: number
  market?: string
  merchant?: Record<string, any>
  sale?: number
}

export type ConversionDetailMerchantListMatch = Partial<ConversionDetailMerchant>

export interface ConversionGeneral {
  date?: Record<string, any>
  market?: Record<string, any>
  total?: Record<string, any>
}

export type ConversionGeneralLoadMatch = Partial<ConversionGeneral>

export interface ConversionStatus {
  status?: string
}

export type ConversionStatusLoadMatch = Partial<ConversionStatus>

export interface Deeplink {
  is_couponing?: boolean
  market: string
  placement_id?: string
  result?: Record<string, any>
  url: any[]
}

export type DeeplinkCreateData = Partial<Deeplink>

export interface DeeplinkMerchant {
  deeplink_count?: number
  estimated_cpc?: Record<string, any>
  has_external_homepage?: boolean
  has_smartlink_homepage?: boolean
  id?: string
  is_smartlink?: boolean
  logo?: Record<string, any>
  name?: string
  traffic_type?: any[]
}

export type DeeplinkMerchantListMatch = Partial<DeeplinkMerchant>

export interface Dnt {
}

export type DntLoadMatch = Partial<Dnt>

export interface Market {
  id?: string
}

export type MarketListMatch = Partial<Market>

export interface Merchant {
  id?: string
  logo?: Record<string, any>
  name?: string
  offer_count?: number
  traffic_type?: any[]
}

export type MerchantListMatch = Partial<Merchant>

export interface Offer {
  availability?: string
  brand?: string
  click_url?: string
  description?: string
  ean?: Record<string, any>
  eer?: string
  estimated_cpc?: Record<string, any>
  id?: string
  image?: Record<string, any>
  merchant?: Record<string, any>
  original_price?: Record<string, any>
  price?: Record<string, any>
  promo_text?: string
  shipping_price?: Record<string, any>
  shipping_time?: Record<string, any>
  thumbnail?: Record<string, any>
  title?: string
  unit_price?: Record<string, any>
}

export type OfferLoadMatch = Partial<Offer>

export type OfferListMatch = Partial<Offer>

export interface ReportDetail {
  click_id?: string
  currency?: string
  date?: string
  market?: string
  merchant?: Record<string, any>
  placement_id?: string
  revenue?: number
}

export type ReportDetailListMatch = Partial<ReportDetail>

export interface ReportGeneral {
  date?: Record<string, any>
  market?: Record<string, any>
  total?: Record<string, any>
}

export type ReportGeneralLoadMatch = Partial<ReportGeneral>

export interface ReportModified {
  market?: Record<string, any>
}

export type ReportModifiedLoadMatch = Partial<ReportModified>

export interface ReportStatus {
  status?: string
}

export type ReportStatusLoadMatch = Partial<ReportStatus>

