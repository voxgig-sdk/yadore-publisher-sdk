// Typed models for the YadorePublisher SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/yadore-publisher-sdk/go/core"
)

// ConversionDetail is the typed data model for the conversion_detail entity.
type ConversionDetail struct {
	ClickId *string `json:"clickId,omitempty"`
	Date *string `json:"date,omitempty"`
	Market *string `json:"market,omitempty"`
	Merchant *map[string]any `json:"merchant,omitempty"`
	PlacementId *string `json:"placementId,omitempty"`
	Sales *float64 `json:"sales,omitempty"`
}

// ConversionDetailListMatch is the typed request payload for ConversionDetail.ListTyped.
type ConversionDetailListMatch struct {
	Date string `json:"date"`
	Format string `json:"format"`
	Market *string `json:"market,omitempty"`
}

// ConversionDetailMerchant is the typed data model for the conversion_detail_merchant entity.
type ConversionDetailMerchant struct {
	Clicks *int `json:"clicks,omitempty"`
	Market *string `json:"market,omitempty"`
	Merchant *map[string]any `json:"merchant,omitempty"`
	Sales *int `json:"sales,omitempty"`
}

// ConversionDetailMerchantListMatch is the typed request payload for ConversionDetailMerchant.ListTyped.
type ConversionDetailMerchantListMatch struct {
	Format string `json:"format"`
	From string `json:"from"`
	Market *string `json:"market,omitempty"`
	To string `json:"to"`
}

// ConversionGeneral is the typed data model for the conversion_general entity.
type ConversionGeneral struct {
	Date *map[string]any `json:"date,omitempty"`
	Market *map[string]any `json:"market,omitempty"`
	Total *map[string]any `json:"total,omitempty"`
}

// ConversionGeneralLoadMatch is the typed request payload for ConversionGeneral.LoadTyped.
type ConversionGeneralLoadMatch struct {
	Format string `json:"format"`
	From string `json:"from"`
	To string `json:"to"`
}

// ConversionStatus is the typed data model for the conversion_status entity.
type ConversionStatus struct {
	Status *string `json:"status,omitempty"`
}

// ConversionStatusLoadMatch is the typed request payload for ConversionStatus.LoadTyped.
type ConversionStatusLoadMatch struct {
	Date string `json:"date"`
}

// Deeplink is the typed data model for the deeplink entity.
type Deeplink struct {
	Deeplinks *[]any `json:"deeplinks,omitempty"`
	Found *int `json:"found,omitempty"`
	IsCouponing *bool `json:"isCouponing,omitempty"`
	Market string `json:"market"`
	PlacementId *string `json:"placementId,omitempty"`
	Total *int `json:"total,omitempty"`
	Urls []any `json:"urls"`
}

// DeeplinkCreateData is the typed request payload for Deeplink.CreateTyped.
type DeeplinkCreateData struct {
	Deeplinks *[]any `json:"deeplinks,omitempty"`
	Found *int `json:"found,omitempty"`
	IsCouponing *bool `json:"isCouponing,omitempty"`
	Market string `json:"market"`
	PlacementId *string `json:"placementId,omitempty"`
	Total *int `json:"total,omitempty"`
	Urls []any `json:"urls"`
}

// DeeplinkMerchant is the typed data model for the deeplink_merchant entity.
type DeeplinkMerchant struct {
	DeeplinkCount *int `json:"deeplinkCount,omitempty"`
	EstimatedCpc *map[string]any `json:"estimatedCpc,omitempty"`
	HasExternalHomepage *bool `json:"hasExternalHomepage,omitempty"`
	HasSmartlinkHomepage *bool `json:"hasSmartlinkHomepage,omitempty"`
	Id *string `json:"id,omitempty"`
	IsSmartlink *bool `json:"isSmartlink,omitempty"`
	Logo *map[string]any `json:"logo,omitempty"`
	Name *string `json:"name,omitempty"`
	TrafficTypes *[]any `json:"trafficTypes,omitempty"`
}

// DeeplinkMerchantListMatch is the typed request payload for DeeplinkMerchant.ListTyped.
type DeeplinkMerchantListMatch struct {
	HasHomepage *bool `json:"has_homepage,omitempty"`
	IsCouponing *bool `json:"is_couponing,omitempty"`
	IsSmartlink *bool `json:"is_smartlink,omitempty"`
	Market string `json:"market"`
}

// Dnt is the typed data model for the dnt entity.
type Dnt struct {
}

// DntLoadMatch is the typed request payload for Dnt.LoadTyped.
type DntLoadMatch struct {
	CallbackUrl *string `json:"callback_url,omitempty"`
	IsCouponing *bool `json:"is_couponing,omitempty"`
	Market string `json:"market"`
	MerchantId *string `json:"merchant_id,omitempty"`
	PlacementId *string `json:"placement_id,omitempty"`
	ProjectId string `json:"project_id"`
	Url string `json:"url"`
}

// Market is the typed data model for the market entity.
type Market struct {
	Id *string `json:"id,omitempty"`
}

// MarketListMatch is the typed request payload for Market.ListTyped.
type MarketListMatch struct {
	Id *string `json:"id,omitempty"`
}

// Merchant is the typed data model for the merchant entity.
type Merchant struct {
	Id *string `json:"id,omitempty"`
	Logo *map[string]any `json:"logo,omitempty"`
	Name *string `json:"name,omitempty"`
	OfferCount *int `json:"offerCount,omitempty"`
	TrafficTypes *[]any `json:"trafficTypes,omitempty"`
}

// MerchantListMatch is the typed request payload for Merchant.ListTyped.
type MerchantListMatch struct {
	IsCouponing *bool `json:"is_couponing,omitempty"`
	Market string `json:"market"`
}

// Offer is the typed data model for the offer entity.
type Offer struct {
	Availability *string `json:"availability,omitempty"`
	Brand *string `json:"brand,omitempty"`
	ClickUrl *string `json:"clickUrl,omitempty"`
	Count *int `json:"count,omitempty"`
	Description *string `json:"description,omitempty"`
	Eer *string `json:"eer,omitempty"`
	EstimatedCpc *map[string]any `json:"estimatedCpc,omitempty"`
	Id *string `json:"id,omitempty"`
	Image *map[string]any `json:"image,omitempty"`
	Merchant *map[string]any `json:"merchant,omitempty"`
	Offers *[]any `json:"offers,omitempty"`
	OriginalPrice *map[string]any `json:"originalPrice,omitempty"`
	Price *map[string]any `json:"price,omitempty"`
	PromoText *string `json:"promoText,omitempty"`
	ShippingPrice *map[string]any `json:"shippingPrice,omitempty"`
	ShippingTime *map[string]any `json:"shippingTime,omitempty"`
	Thumbnail *map[string]any `json:"thumbnail,omitempty"`
	Title *string `json:"title,omitempty"`
	UnitPrice *map[string]any `json:"unitPrice,omitempty"`
}

// OfferLoadMatch is the typed request payload for Offer.LoadTyped.
type OfferLoadMatch struct {
	Ean string `json:"ean"`
	IsCouponing *bool `json:"is_couponing,omitempty"`
	Market string `json:"market"`
	MerchantId *string `json:"merchant_id,omitempty"`
	PlacementId *string `json:"placement_id,omitempty"`
}

// OfferListMatch is the typed request payload for Offer.ListTyped.
type OfferListMatch struct {
	Ean *string `json:"ean,omitempty"`
	IsCouponing *bool `json:"is_couponing,omitempty"`
	Keyword *string `json:"keyword,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Market string `json:"market"`
	MerchantId *string `json:"merchant_id,omitempty"`
	OfferId *string `json:"offer_id,omitempty"`
	PlacementId *string `json:"placement_id,omitempty"`
	Precision *string `json:"precision,omitempty"`
	Sort *string `json:"sort,omitempty"`
}

// ReportDetail is the typed data model for the report_detail entity.
type ReportDetail struct {
	ClickId *string `json:"clickId,omitempty"`
	Currency *string `json:"currency,omitempty"`
	Date *string `json:"date,omitempty"`
	Market *string `json:"market,omitempty"`
	Merchant *map[string]any `json:"merchant,omitempty"`
	PlacementId *string `json:"placementId,omitempty"`
	Revenue *float64 `json:"revenue,omitempty"`
}

// ReportDetailListMatch is the typed request payload for ReportDetail.ListTyped.
type ReportDetailListMatch struct {
	Date string `json:"date"`
	Format string `json:"format"`
	Market *string `json:"market,omitempty"`
}

// ReportGeneral is the typed data model for the report_general entity.
type ReportGeneral struct {
	Date *map[string]any `json:"date,omitempty"`
	Market *map[string]any `json:"market,omitempty"`
	Total *map[string]any `json:"total,omitempty"`
}

// ReportGeneralLoadMatch is the typed request payload for ReportGeneral.LoadTyped.
type ReportGeneralLoadMatch struct {
	Date string `json:"date"`
	Format string `json:"format"`
}

// ReportModified is the typed data model for the report_modified entity.
type ReportModified struct {
	Date *string `json:"date,omitempty"`
	ModifiedDate *string `json:"modifiedDate,omitempty"`
}

// ReportModifiedLoadMatch is the typed request payload for ReportModified.LoadTyped.
type ReportModifiedLoadMatch struct {
	From string `json:"from"`
	Market *string `json:"market,omitempty"`
	To string `json:"to"`
}

// ReportStatus is the typed data model for the report_status entity.
type ReportStatus struct {
	Status *string `json:"status,omitempty"`
}

// ReportStatusLoadMatch is the typed request payload for ReportStatus.LoadTyped.
type ReportStatusLoadMatch struct {
	Date string `json:"date"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
