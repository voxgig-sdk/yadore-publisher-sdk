// Typed models for the YadorePublisher SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// ConversionDetail is the typed data model for the conversion_detail entity.
type ConversionDetail struct {
	ClickId *string `json:"click_id,omitempty"`
	Date *string `json:"date,omitempty"`
	Market *string `json:"market,omitempty"`
	Merchant *map[string]any `json:"merchant,omitempty"`
	PlacementId *string `json:"placement_id,omitempty"`
	Sale *float64 `json:"sale,omitempty"`
}

// ConversionDetailListMatch mirrors the conversion_detail fields as an all-optional match
// filter (Go analog of Partial<ConversionDetail>).
type ConversionDetailListMatch struct {
	ClickId *string `json:"click_id,omitempty"`
	Date *string `json:"date,omitempty"`
	Market *string `json:"market,omitempty"`
	Merchant *map[string]any `json:"merchant,omitempty"`
	PlacementId *string `json:"placement_id,omitempty"`
	Sale *float64 `json:"sale,omitempty"`
}

// ConversionDetailMerchant is the typed data model for the conversion_detail_merchant entity.
type ConversionDetailMerchant struct {
	Click *int `json:"click,omitempty"`
	Market *string `json:"market,omitempty"`
	Merchant *map[string]any `json:"merchant,omitempty"`
	Sale *int `json:"sale,omitempty"`
}

// ConversionDetailMerchantListMatch mirrors the conversion_detail_merchant fields as an all-optional match
// filter (Go analog of Partial<ConversionDetailMerchant>).
type ConversionDetailMerchantListMatch struct {
	Click *int `json:"click,omitempty"`
	Market *string `json:"market,omitempty"`
	Merchant *map[string]any `json:"merchant,omitempty"`
	Sale *int `json:"sale,omitempty"`
}

// ConversionGeneral is the typed data model for the conversion_general entity.
type ConversionGeneral struct {
	Date *map[string]any `json:"date,omitempty"`
	Market *map[string]any `json:"market,omitempty"`
	Total *map[string]any `json:"total,omitempty"`
}

// ConversionGeneralLoadMatch mirrors the conversion_general fields as an all-optional match
// filter (Go analog of Partial<ConversionGeneral>).
type ConversionGeneralLoadMatch struct {
	Date *map[string]any `json:"date,omitempty"`
	Market *map[string]any `json:"market,omitempty"`
	Total *map[string]any `json:"total,omitempty"`
}

// ConversionStatus is the typed data model for the conversion_status entity.
type ConversionStatus struct {
	Status *string `json:"status,omitempty"`
}

// ConversionStatusLoadMatch mirrors the conversion_status fields as an all-optional match
// filter (Go analog of Partial<ConversionStatus>).
type ConversionStatusLoadMatch struct {
	Status *string `json:"status,omitempty"`
}

// Deeplink is the typed data model for the deeplink entity.
type Deeplink struct {
	IsCouponing *bool `json:"is_couponing,omitempty"`
	Market string `json:"market"`
	PlacementId *string `json:"placement_id,omitempty"`
	Result *map[string]any `json:"result,omitempty"`
	Url []any `json:"url"`
}

// DeeplinkCreateData mirrors the deeplink fields as an all-optional match
// filter (Go analog of Partial<Deeplink>).
type DeeplinkCreateData struct {
	IsCouponing *bool `json:"is_couponing,omitempty"`
	Market *string `json:"market,omitempty"`
	PlacementId *string `json:"placement_id,omitempty"`
	Result *map[string]any `json:"result,omitempty"`
	Url *[]any `json:"url,omitempty"`
}

// DeeplinkMerchant is the typed data model for the deeplink_merchant entity.
type DeeplinkMerchant struct {
	DeeplinkCount *int `json:"deeplink_count,omitempty"`
	EstimatedCpc *map[string]any `json:"estimated_cpc,omitempty"`
	HasExternalHomepage *bool `json:"has_external_homepage,omitempty"`
	HasSmartlinkHomepage *bool `json:"has_smartlink_homepage,omitempty"`
	Id *string `json:"id,omitempty"`
	IsSmartlink *bool `json:"is_smartlink,omitempty"`
	Logo *map[string]any `json:"logo,omitempty"`
	Name *string `json:"name,omitempty"`
	TrafficType *[]any `json:"traffic_type,omitempty"`
}

// DeeplinkMerchantListMatch mirrors the deeplink_merchant fields as an all-optional match
// filter (Go analog of Partial<DeeplinkMerchant>).
type DeeplinkMerchantListMatch struct {
	DeeplinkCount *int `json:"deeplink_count,omitempty"`
	EstimatedCpc *map[string]any `json:"estimated_cpc,omitempty"`
	HasExternalHomepage *bool `json:"has_external_homepage,omitempty"`
	HasSmartlinkHomepage *bool `json:"has_smartlink_homepage,omitempty"`
	Id *string `json:"id,omitempty"`
	IsSmartlink *bool `json:"is_smartlink,omitempty"`
	Logo *map[string]any `json:"logo,omitempty"`
	Name *string `json:"name,omitempty"`
	TrafficType *[]any `json:"traffic_type,omitempty"`
}

// Dnt is the typed data model for the dnt entity.
type Dnt struct {
}

// DntLoadMatch mirrors the dnt fields as an all-optional match
// filter (Go analog of Partial<Dnt>).
type DntLoadMatch struct {
}

// Market is the typed data model for the market entity.
type Market struct {
	Id *string `json:"id,omitempty"`
}

// MarketListMatch mirrors the market fields as an all-optional match
// filter (Go analog of Partial<Market>).
type MarketListMatch struct {
	Id *string `json:"id,omitempty"`
}

// Merchant is the typed data model for the merchant entity.
type Merchant struct {
	Id *string `json:"id,omitempty"`
	Logo *map[string]any `json:"logo,omitempty"`
	Name *string `json:"name,omitempty"`
	OfferCount *int `json:"offer_count,omitempty"`
	TrafficType *[]any `json:"traffic_type,omitempty"`
}

// MerchantListMatch mirrors the merchant fields as an all-optional match
// filter (Go analog of Partial<Merchant>).
type MerchantListMatch struct {
	Id *string `json:"id,omitempty"`
	Logo *map[string]any `json:"logo,omitempty"`
	Name *string `json:"name,omitempty"`
	OfferCount *int `json:"offer_count,omitempty"`
	TrafficType *[]any `json:"traffic_type,omitempty"`
}

// Offer is the typed data model for the offer entity.
type Offer struct {
	Availability *string `json:"availability,omitempty"`
	Brand *string `json:"brand,omitempty"`
	ClickUrl *string `json:"click_url,omitempty"`
	Description *string `json:"description,omitempty"`
	Ean *map[string]any `json:"ean,omitempty"`
	Eer *string `json:"eer,omitempty"`
	EstimatedCpc *map[string]any `json:"estimated_cpc,omitempty"`
	Id *string `json:"id,omitempty"`
	Image *map[string]any `json:"image,omitempty"`
	Merchant *map[string]any `json:"merchant,omitempty"`
	OriginalPrice *map[string]any `json:"original_price,omitempty"`
	Price *map[string]any `json:"price,omitempty"`
	PromoText *string `json:"promo_text,omitempty"`
	ShippingPrice *map[string]any `json:"shipping_price,omitempty"`
	ShippingTime *map[string]any `json:"shipping_time,omitempty"`
	Thumbnail *map[string]any `json:"thumbnail,omitempty"`
	Title *string `json:"title,omitempty"`
	UnitPrice *map[string]any `json:"unit_price,omitempty"`
}

// OfferLoadMatch mirrors the offer fields as an all-optional match
// filter (Go analog of Partial<Offer>).
type OfferLoadMatch struct {
	Availability *string `json:"availability,omitempty"`
	Brand *string `json:"brand,omitempty"`
	ClickUrl *string `json:"click_url,omitempty"`
	Description *string `json:"description,omitempty"`
	Ean *map[string]any `json:"ean,omitempty"`
	Eer *string `json:"eer,omitempty"`
	EstimatedCpc *map[string]any `json:"estimated_cpc,omitempty"`
	Id *string `json:"id,omitempty"`
	Image *map[string]any `json:"image,omitempty"`
	Merchant *map[string]any `json:"merchant,omitempty"`
	OriginalPrice *map[string]any `json:"original_price,omitempty"`
	Price *map[string]any `json:"price,omitempty"`
	PromoText *string `json:"promo_text,omitempty"`
	ShippingPrice *map[string]any `json:"shipping_price,omitempty"`
	ShippingTime *map[string]any `json:"shipping_time,omitempty"`
	Thumbnail *map[string]any `json:"thumbnail,omitempty"`
	Title *string `json:"title,omitempty"`
	UnitPrice *map[string]any `json:"unit_price,omitempty"`
}

// OfferListMatch mirrors the offer fields as an all-optional match
// filter (Go analog of Partial<Offer>).
type OfferListMatch struct {
	Availability *string `json:"availability,omitempty"`
	Brand *string `json:"brand,omitempty"`
	ClickUrl *string `json:"click_url,omitempty"`
	Description *string `json:"description,omitempty"`
	Ean *map[string]any `json:"ean,omitempty"`
	Eer *string `json:"eer,omitempty"`
	EstimatedCpc *map[string]any `json:"estimated_cpc,omitempty"`
	Id *string `json:"id,omitempty"`
	Image *map[string]any `json:"image,omitempty"`
	Merchant *map[string]any `json:"merchant,omitempty"`
	OriginalPrice *map[string]any `json:"original_price,omitempty"`
	Price *map[string]any `json:"price,omitempty"`
	PromoText *string `json:"promo_text,omitempty"`
	ShippingPrice *map[string]any `json:"shipping_price,omitempty"`
	ShippingTime *map[string]any `json:"shipping_time,omitempty"`
	Thumbnail *map[string]any `json:"thumbnail,omitempty"`
	Title *string `json:"title,omitempty"`
	UnitPrice *map[string]any `json:"unit_price,omitempty"`
}

// ReportDetail is the typed data model for the report_detail entity.
type ReportDetail struct {
	ClickId *string `json:"click_id,omitempty"`
	Currency *string `json:"currency,omitempty"`
	Date *string `json:"date,omitempty"`
	Market *string `json:"market,omitempty"`
	Merchant *map[string]any `json:"merchant,omitempty"`
	PlacementId *string `json:"placement_id,omitempty"`
	Revenue *float64 `json:"revenue,omitempty"`
}

// ReportDetailListMatch mirrors the report_detail fields as an all-optional match
// filter (Go analog of Partial<ReportDetail>).
type ReportDetailListMatch struct {
	ClickId *string `json:"click_id,omitempty"`
	Currency *string `json:"currency,omitempty"`
	Date *string `json:"date,omitempty"`
	Market *string `json:"market,omitempty"`
	Merchant *map[string]any `json:"merchant,omitempty"`
	PlacementId *string `json:"placement_id,omitempty"`
	Revenue *float64 `json:"revenue,omitempty"`
}

// ReportGeneral is the typed data model for the report_general entity.
type ReportGeneral struct {
	Date *map[string]any `json:"date,omitempty"`
	Market *map[string]any `json:"market,omitempty"`
	Total *map[string]any `json:"total,omitempty"`
}

// ReportGeneralLoadMatch mirrors the report_general fields as an all-optional match
// filter (Go analog of Partial<ReportGeneral>).
type ReportGeneralLoadMatch struct {
	Date *map[string]any `json:"date,omitempty"`
	Market *map[string]any `json:"market,omitempty"`
	Total *map[string]any `json:"total,omitempty"`
}

// ReportModified is the typed data model for the report_modified entity.
type ReportModified struct {
	Market *map[string]any `json:"market,omitempty"`
}

// ReportModifiedLoadMatch mirrors the report_modified fields as an all-optional match
// filter (Go analog of Partial<ReportModified>).
type ReportModifiedLoadMatch struct {
	Market *map[string]any `json:"market,omitempty"`
}

// ReportStatus is the typed data model for the report_status entity.
type ReportStatus struct {
	Status *string `json:"status,omitempty"`
}

// ReportStatusLoadMatch mirrors the report_status fields as an all-optional match
// filter (Go analog of Partial<ReportStatus>).
type ReportStatusLoadMatch struct {
	Status *string `json:"status,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
