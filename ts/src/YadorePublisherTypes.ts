// Typed models for the YadorePublisher SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface ConversionDetail {
  clickId?: string
  date?: string
  market?: string
  merchant?: Record<string, any>
  placementId?: string
  sales?: number
}

export interface ConversionDetailListMatch {
  date: string
  format: string
  market?: string
}

export interface ConversionDetailMerchant {
  clicks?: number
  market?: string
  merchant?: Record<string, any>
  sales?: number
}

export interface ConversionDetailMerchantListMatch {
  format: string
  from: string
  market?: string
  to: string
}

export interface ConversionGeneral {
  date?: Record<string, any>
  market?: Record<string, any>
  total?: Record<string, any>
}

export interface ConversionGeneralLoadMatch {
  format: string
  from: string
  to: string
}

export interface ConversionStatus {
  status?: string
}

export interface ConversionStatusLoadMatch {
  date: string
}

export interface Deeplink {
  deeplinks?: any[]
  found?: number
  isCouponing?: boolean
  market: string
  placementId?: string
  total?: number
  urls: any[]
}

export interface DeeplinkCreateData {
  deeplinks?: any[]
  found?: number
  isCouponing?: boolean
  market: string
  placementId?: string
  total?: number
  urls: any[]
}

export interface DeeplinkMerchant {
  deeplinkCount?: number
  estimatedCpc?: Record<string, any>
  hasExternalHomepage?: boolean
  hasSmartlinkHomepage?: boolean
  id?: string
  isSmartlink?: boolean
  logo?: Record<string, any>
  name?: string
  trafficTypes?: any[]
}

export interface DeeplinkMerchantListMatch {
  has_homepage?: boolean
  is_couponing?: boolean
  is_smartlink?: boolean
  market: string
}

export interface Dnt {
}

export interface DntLoadMatch {
  callback_url?: string
  is_couponing?: boolean
  market: string
  merchant_id?: string
  placement_id?: string
  project_id: string
  url: string
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
  offerCount?: number
  trafficTypes?: any[]
}

export interface MerchantListMatch {
  is_couponing?: boolean
  market: string
}

export interface Offer {
  availability?: string
  brand?: string
  clickUrl?: string
  count?: number
  description?: string
  eer?: string
  estimatedCpc?: Record<string, any>
  id?: string
  image?: Record<string, any>
  merchant?: Record<string, any>
  offers?: any[]
  originalPrice?: Record<string, any>
  price?: Record<string, any>
  promoText?: string
  shippingPrice?: Record<string, any>
  shippingTime?: Record<string, any>
  thumbnail?: Record<string, any>
  title?: string
  unitPrice?: Record<string, any>
}

export interface OfferLoadMatch {
  ean: string
  is_couponing?: boolean
  market: string
  merchant_id?: string
  placement_id?: string

  // Selects a custom action instead of the plain load:
  //   'bulk'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface OfferListMatch {
  ean?: string
  is_couponing?: boolean
  keyword?: string
  limit?: number
  market: string
  merchant_id?: string
  offer_id?: string
  placement_id?: string
  precision?: string
  sort?: string
}

export interface ReportDetail {
  clickId?: string
  currency?: string
  date?: string
  market?: string
  merchant?: Record<string, any>
  placementId?: string
  revenue?: number
}

export interface ReportDetailListMatch {
  date: string
  format: string
  market?: string
}

export interface ReportGeneral {
  date?: Record<string, any>
  market?: Record<string, any>
  total?: Record<string, any>
}

export interface ReportGeneralLoadMatch {
  date: string
  format: string
}

export interface ReportModified {
  date?: string
  modifiedDate?: string
}

export interface ReportModifiedLoadMatch {
  from: string
  market?: string
  to: string
}

export interface ReportStatus {
  status?: string
}

export interface ReportStatusLoadMatch {
  date: string
}

