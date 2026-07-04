<?php
declare(strict_types=1);

// Typed models for the YadorePublisher SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** ConversionDetail entity data model. */
class ConversionDetail
{
    public ?string $click_id = null;
    public ?string $date = null;
    public ?string $market = null;
    public ?array $merchant = null;
    public ?string $placement_id = null;
    public ?float $sale = null;
}

/** Match filter for ConversionDetail#list (any subset of ConversionDetail fields). */
class ConversionDetailListMatch
{
    public ?string $click_id = null;
    public ?string $date = null;
    public ?string $market = null;
    public ?array $merchant = null;
    public ?string $placement_id = null;
    public ?float $sale = null;
}

/** ConversionDetailMerchant entity data model. */
class ConversionDetailMerchant
{
    public ?int $click = null;
    public ?string $market = null;
    public ?array $merchant = null;
    public ?int $sale = null;
}

/** Match filter for ConversionDetailMerchant#list (any subset of ConversionDetailMerchant fields). */
class ConversionDetailMerchantListMatch
{
    public ?int $click = null;
    public ?string $market = null;
    public ?array $merchant = null;
    public ?int $sale = null;
}

/** ConversionGeneral entity data model. */
class ConversionGeneral
{
    public ?array $date = null;
    public ?array $market = null;
    public ?array $total = null;
}

/** Match filter for ConversionGeneral#load (any subset of ConversionGeneral fields). */
class ConversionGeneralLoadMatch
{
    public ?array $date = null;
    public ?array $market = null;
    public ?array $total = null;
}

/** ConversionStatus entity data model. */
class ConversionStatus
{
    public ?string $status = null;
}

/** Match filter for ConversionStatus#load (any subset of ConversionStatus fields). */
class ConversionStatusLoadMatch
{
    public ?string $status = null;
}

/** Deeplink entity data model. */
class Deeplink
{
    public ?bool $is_couponing = null;
    public string $market;
    public ?string $placement_id = null;
    public ?array $result = null;
    public array $url;
}

/** Match filter for Deeplink#create (any subset of Deeplink fields). */
class DeeplinkCreateData
{
    public ?bool $is_couponing = null;
    public ?string $market = null;
    public ?string $placement_id = null;
    public ?array $result = null;
    public ?array $url = null;
}

/** DeeplinkMerchant entity data model. */
class DeeplinkMerchant
{
    public ?int $deeplink_count = null;
    public ?array $estimated_cpc = null;
    public ?bool $has_external_homepage = null;
    public ?bool $has_smartlink_homepage = null;
    public ?string $id = null;
    public ?bool $is_smartlink = null;
    public ?array $logo = null;
    public ?string $name = null;
    public ?array $traffic_type = null;
}

/** Match filter for DeeplinkMerchant#list (any subset of DeeplinkMerchant fields). */
class DeeplinkMerchantListMatch
{
    public ?int $deeplink_count = null;
    public ?array $estimated_cpc = null;
    public ?bool $has_external_homepage = null;
    public ?bool $has_smartlink_homepage = null;
    public ?string $id = null;
    public ?bool $is_smartlink = null;
    public ?array $logo = null;
    public ?string $name = null;
    public ?array $traffic_type = null;
}

/** Dnt entity data model. */
class Dnt
{
}

/** Match filter for Dnt#load (any subset of Dnt fields). */
class DntLoadMatch
{
}

/** Market entity data model. */
class Market
{
    public ?string $id = null;
}

/** Match filter for Market#list (any subset of Market fields). */
class MarketListMatch
{
    public ?string $id = null;
}

/** Merchant entity data model. */
class Merchant
{
    public ?string $id = null;
    public ?array $logo = null;
    public ?string $name = null;
    public ?int $offer_count = null;
    public ?array $traffic_type = null;
}

/** Match filter for Merchant#list (any subset of Merchant fields). */
class MerchantListMatch
{
    public ?string $id = null;
    public ?array $logo = null;
    public ?string $name = null;
    public ?int $offer_count = null;
    public ?array $traffic_type = null;
}

/** Offer entity data model. */
class Offer
{
    public ?string $availability = null;
    public ?string $brand = null;
    public ?string $click_url = null;
    public ?string $description = null;
    public ?array $ean = null;
    public ?string $eer = null;
    public ?array $estimated_cpc = null;
    public ?string $id = null;
    public ?array $image = null;
    public ?array $merchant = null;
    public ?array $original_price = null;
    public ?array $price = null;
    public ?string $promo_text = null;
    public ?array $shipping_price = null;
    public ?array $shipping_time = null;
    public ?array $thumbnail = null;
    public ?string $title = null;
    public ?array $unit_price = null;
}

/** Match filter for Offer#load (any subset of Offer fields). */
class OfferLoadMatch
{
    public ?string $availability = null;
    public ?string $brand = null;
    public ?string $click_url = null;
    public ?string $description = null;
    public ?array $ean = null;
    public ?string $eer = null;
    public ?array $estimated_cpc = null;
    public ?string $id = null;
    public ?array $image = null;
    public ?array $merchant = null;
    public ?array $original_price = null;
    public ?array $price = null;
    public ?string $promo_text = null;
    public ?array $shipping_price = null;
    public ?array $shipping_time = null;
    public ?array $thumbnail = null;
    public ?string $title = null;
    public ?array $unit_price = null;
}

/** Match filter for Offer#list (any subset of Offer fields). */
class OfferListMatch
{
    public ?string $availability = null;
    public ?string $brand = null;
    public ?string $click_url = null;
    public ?string $description = null;
    public ?array $ean = null;
    public ?string $eer = null;
    public ?array $estimated_cpc = null;
    public ?string $id = null;
    public ?array $image = null;
    public ?array $merchant = null;
    public ?array $original_price = null;
    public ?array $price = null;
    public ?string $promo_text = null;
    public ?array $shipping_price = null;
    public ?array $shipping_time = null;
    public ?array $thumbnail = null;
    public ?string $title = null;
    public ?array $unit_price = null;
}

/** ReportDetail entity data model. */
class ReportDetail
{
    public ?string $click_id = null;
    public ?string $currency = null;
    public ?string $date = null;
    public ?string $market = null;
    public ?array $merchant = null;
    public ?string $placement_id = null;
    public ?float $revenue = null;
}

/** Match filter for ReportDetail#list (any subset of ReportDetail fields). */
class ReportDetailListMatch
{
    public ?string $click_id = null;
    public ?string $currency = null;
    public ?string $date = null;
    public ?string $market = null;
    public ?array $merchant = null;
    public ?string $placement_id = null;
    public ?float $revenue = null;
}

/** ReportGeneral entity data model. */
class ReportGeneral
{
    public ?array $date = null;
    public ?array $market = null;
    public ?array $total = null;
}

/** Match filter for ReportGeneral#load (any subset of ReportGeneral fields). */
class ReportGeneralLoadMatch
{
    public ?array $date = null;
    public ?array $market = null;
    public ?array $total = null;
}

/** ReportModified entity data model. */
class ReportModified
{
    public ?array $market = null;
}

/** Match filter for ReportModified#load (any subset of ReportModified fields). */
class ReportModifiedLoadMatch
{
    public ?array $market = null;
}

/** ReportStatus entity data model. */
class ReportStatus
{
    public ?string $status = null;
}

/** Match filter for ReportStatus#load (any subset of ReportStatus fields). */
class ReportStatusLoadMatch
{
    public ?string $status = null;
}

