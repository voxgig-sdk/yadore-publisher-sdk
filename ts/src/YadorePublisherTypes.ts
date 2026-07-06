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

export interface ConversionDetailListMatch {
  click_id?: string
  date?: string
  market?: string
  merchant?: Record<string, any>
  placement_id?: string
  sale?: number
}

export interface ConversionDetailMerchant {
  click?: number
  market?: string
  merchant?: Record<string, any>
  sale?: number
}

export interface ConversionDetailMerchantListMatch {
  click?: number
  market?: string
  merchant?: Record<string, any>
  sale?: number
}

export interface ConversionGeneral {
  date?: Record<string, any>
  market?: Record<string, any>
  total?: Record<string, any>
}

export interface ConversionGeneralLoadMatch {
  date?: Record<string, any>
  market?: Record<string, any>
  total?: Record<string, any>
}

export interface ConversionStatus {
  status?: string
}

export interface ConversionStatusLoadMatch {
  status?: string
}

export interface Deeplink {
  is_couponing?: boolean
  market: string
  placement_id?: string
  result?: Record<string, any>
  url: any[]
}

export interface DeeplinkCreateData {
  is_couponing?: boolean
  market: string
  placement_id?: string
  result?: Record<string, any>
  url: any[]
}

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

export interface DeeplinkMerchantListMatch {
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

export interface Dnt {
}

export interface DntLoadMatch {
}

export interface Market {
  id?: string
}

export interface MarketListMatch {
  id?: string
}

export interface Merchant {
  id?: string
  logo?: Record<string, any>
  name?: string
  offer_count?: number
  traffic_type?: any[]
}

export interface MerchantListMatch {
  id?: string
  logo?: Record<string, any>
  name?: string
  offer_count?: number
  traffic_type?: any[]
}

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

export interface OfferLoadMatch {
  availability?: string
  brand?: string
  click_url?: string
  description?: string
  ean?: Record<string, any>
  eer?: string
  estimated_cpc?: Record<string, any>
  id: string
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

export interface OfferListMatch {
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

export interface ReportDetail {
  click_id?: string
  currency?: string
  date?: string
  market?: string
  merchant?: Record<string, any>
  placement_id?: string
  revenue?: number
}

export interface ReportDetailListMatch {
  click_id?: string
  currency?: string
  date?: string
  market?: string
  merchant?: Record<string, any>
  placement_id?: string
  revenue?: number
}

export interface ReportGeneral {
  date?: Record<string, any>
  market?: Record<string, any>
  total?: Record<string, any>
}

export interface ReportGeneralLoadMatch {
  date?: Record<string, any>
  market?: Record<string, any>
  total?: Record<string, any>
}

export interface ReportModified {
  market?: Record<string, any>
}

export interface ReportModifiedLoadMatch {
  market?: Record<string, any>
}

export interface ReportStatus {
  status?: string
}

export interface ReportStatusLoadMatch {
  status?: string
}

