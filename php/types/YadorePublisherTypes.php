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
    public ?string $clickId = null;
    public ?string $date = null;
    public ?string $market = null;
    public ?array $merchant = null;
    public ?string $placementId = null;
    public ?float $sales = null;
}

/** Request payload for ConversionDetail#list. */
class ConversionDetailListMatch
{
    public ?string $clickId = null;
    public ?string $date = null;
    public ?string $market = null;
    public ?array $merchant = null;
    public ?string $placementId = null;
    public ?float $sales = null;
}

/** ConversionDetailMerchant entity data model. */
class ConversionDetailMerchant
{
    public ?int $clicks = null;
    public ?string $market = null;
    public ?array $merchant = null;
    public ?int $sales = null;
}

/** Request payload for ConversionDetailMerchant#list. */
class ConversionDetailMerchantListMatch
{
    public ?int $clicks = null;
    public ?string $market = null;
    public ?array $merchant = null;
    public ?int $sales = null;
}

/** ConversionGeneral entity data model. */
class ConversionGeneral
{
    public ?array $date = null;
    public ?array $market = null;
    public ?array $total = null;
}

/** Request payload for ConversionGeneral#load. */
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

/** Request payload for ConversionStatus#load. */
class ConversionStatusLoadMatch
{
    public ?string $status = null;
}

/** Deeplink entity data model. */
class Deeplink
{
    public ?array $deeplinks = null;
    public ?int $found = null;
    public ?bool $isCouponing = null;
    public string $market;
    public ?string $placementId = null;
    public ?int $total = null;
    public array $urls;
}

/** Request payload for Deeplink#create. */
class DeeplinkCreateData
{
    public ?array $deeplinks = null;
    public ?int $found = null;
    public ?bool $isCouponing = null;
    public string $market;
    public ?string $placementId = null;
    public ?int $total = null;
    public array $urls;
}

/** DeeplinkMerchant entity data model. */
class DeeplinkMerchant
{
    public ?int $deeplinkCount = null;
    public ?array $estimatedCpc = null;
    public ?bool $hasExternalHomepage = null;
    public ?bool $hasSmartlinkHomepage = null;
    public ?string $id = null;
    public ?bool $isSmartlink = null;
    public ?array $logo = null;
    public ?string $name = null;
    public ?array $trafficTypes = null;
}

/** Request payload for DeeplinkMerchant#list. */
class DeeplinkMerchantListMatch
{
    public ?int $deeplinkCount = null;
    public ?array $estimatedCpc = null;
    public ?bool $hasExternalHomepage = null;
    public ?bool $hasSmartlinkHomepage = null;
    public ?string $id = null;
    public ?bool $isSmartlink = null;
    public ?array $logo = null;
    public ?string $name = null;
    public ?array $trafficTypes = null;
}

/** Dnt entity data model. */
class Dnt
{
}

/** Request payload for Dnt#load. */
class DntLoadMatch
{
}

/** Market entity data model. */
class Market
{
    public ?string $id = null;
}

/** Request payload for Market#list. */
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
    public ?int $offerCount = null;
    public ?array $trafficTypes = null;
}

/** Request payload for Merchant#list. */
class MerchantListMatch
{
    public ?string $id = null;
    public ?array $logo = null;
    public ?string $name = null;
    public ?int $offerCount = null;
    public ?array $trafficTypes = null;
}

/** Offer entity data model. */
class Offer
{
    public ?string $availability = null;
    public ?string $brand = null;
    public ?string $clickUrl = null;
    public ?int $count = null;
    public ?string $description = null;
    public ?string $eer = null;
    public ?array $estimatedCpc = null;
    public ?string $id = null;
    public ?array $image = null;
    public ?array $merchant = null;
    public ?array $offers = null;
    public ?array $originalPrice = null;
    public ?array $price = null;
    public ?string $promoText = null;
    public ?array $shippingPrice = null;
    public ?array $shippingTime = null;
    public ?array $thumbnail = null;
    public ?string $title = null;
    public ?array $unitPrice = null;
}

/** Request payload for Offer#load. */
class OfferLoadMatch
{
    public ?string $availability = null;
    public ?string $brand = null;
    public ?string $clickUrl = null;
    public ?int $count = null;
    public ?string $description = null;
    public ?string $eer = null;
    public ?array $estimatedCpc = null;
    public string $id;
    public ?array $image = null;
    public ?array $merchant = null;
    public ?array $offers = null;
    public ?array $originalPrice = null;
    public ?array $price = null;
    public ?string $promoText = null;
    public ?array $shippingPrice = null;
    public ?array $shippingTime = null;
    public ?array $thumbnail = null;
    public ?string $title = null;
    public ?array $unitPrice = null;
}

/** Request payload for Offer#list. */
class OfferListMatch
{
    public ?string $availability = null;
    public ?string $brand = null;
    public ?string $clickUrl = null;
    public ?int $count = null;
    public ?string $description = null;
    public ?string $eer = null;
    public ?array $estimatedCpc = null;
    public ?string $id = null;
    public ?array $image = null;
    public ?array $merchant = null;
    public ?array $offers = null;
    public ?array $originalPrice = null;
    public ?array $price = null;
    public ?string $promoText = null;
    public ?array $shippingPrice = null;
    public ?array $shippingTime = null;
    public ?array $thumbnail = null;
    public ?string $title = null;
    public ?array $unitPrice = null;
}

/** ReportDetail entity data model. */
class ReportDetail
{
    public ?string $clickId = null;
    public ?string $currency = null;
    public ?string $date = null;
    public ?string $market = null;
    public ?array $merchant = null;
    public ?string $placementId = null;
    public ?float $revenue = null;
}

/** Request payload for ReportDetail#list. */
class ReportDetailListMatch
{
    public ?string $clickId = null;
    public ?string $currency = null;
    public ?string $date = null;
    public ?string $market = null;
    public ?array $merchant = null;
    public ?string $placementId = null;
    public ?float $revenue = null;
}

/** ReportGeneral entity data model. */
class ReportGeneral
{
    public ?array $date = null;
    public ?array $market = null;
    public ?array $total = null;
}

/** Request payload for ReportGeneral#load. */
class ReportGeneralLoadMatch
{
    public ?array $date = null;
    public ?array $market = null;
    public ?array $total = null;
}

/** ReportModified entity data model. */
class ReportModified
{
    public ?string $date = null;
    public ?string $modifiedDate = null;
}

/** Request payload for ReportModified#load. */
class ReportModifiedLoadMatch
{
    public ?string $date = null;
    public ?string $modifiedDate = null;
}

/** ReportStatus entity data model. */
class ReportStatus
{
    public ?string $status = null;
}

/** Request payload for ReportStatus#load. */
class ReportStatusLoadMatch
{
    public ?string $status = null;
}

