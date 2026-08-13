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
  clickId?: string
  date?: string
  market?: string
  merchant?: Record<string, any>
  placementId?: string
  sales?: number
}

export interface ConversionDetailMerchant {
  clicks?: number
  market?: string
  merchant?: Record<string, any>
  sales?: number
}

export interface ConversionDetailMerchantListMatch {
  clicks?: number
  market?: string
  merchant?: Record<string, any>
  sales?: number
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
  offerCount?: number
  trafficTypes?: any[]
}

export interface MerchantListMatch {
  id?: string
  logo?: Record<string, any>
  name?: string
  offerCount?: number
  trafficTypes?: any[]
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
  availability?: string
  brand?: string
  clickUrl?: string
  count?: number
  description?: string
  eer?: string
  estimatedCpc?: Record<string, any>
  id: string
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

  // Selects a custom action instead of the plain load:
  //   'bulk'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface OfferListMatch {
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
  clickId?: string
  currency?: string
  date?: string
  market?: string
  merchant?: Record<string, any>
  placementId?: string
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
  date?: string
  modifiedDate?: string
}

export interface ReportModifiedLoadMatch {
  date?: string
  modifiedDate?: string
}

export interface ReportStatus {
  status?: string
}

export interface ReportStatusLoadMatch {
  status?: string
}

