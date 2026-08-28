# Typed models for the YadorePublisher SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class ConversionDetail(TypedDict, total=False):
    clickId: str
    date: str
    market: str
    merchant: dict
    placementId: str
    sales: float


class ConversionDetailListMatchRequired(TypedDict):
    date: str
    format: str


class ConversionDetailListMatch(ConversionDetailListMatchRequired, total=False):
    market: str


class ConversionDetailMerchant(TypedDict, total=False):
    clicks: int
    market: str
    merchant: dict
    sales: int


class ConversionDetailMerchantListMatchRequired(TypedDict):
    format: str
    to: str


class ConversionDetailMerchantListMatch(ConversionDetailMerchantListMatchRequired, total=False):
    market: str


class ConversionGeneral(TypedDict, total=False):
    date: dict
    market: dict
    total: dict


class ConversionGeneralLoadMatch(TypedDict):
    format: str
    to: str


class ConversionStatus(TypedDict, total=False):
    status: str


class ConversionStatusLoadMatch(TypedDict):
    date: str


class DeeplinkRequired(TypedDict):
    market: str
    urls: list


class Deeplink(DeeplinkRequired, total=False):
    deeplinks: list
    found: int
    isCouponing: bool
    placementId: str
    total: int


class DeeplinkCreateDataRequired(TypedDict):
    market: str
    urls: list


class DeeplinkCreateData(DeeplinkCreateDataRequired, total=False):
    deeplinks: list
    found: int
    isCouponing: bool
    placementId: str
    total: int


class DeeplinkMerchant(TypedDict, total=False):
    deeplinkCount: int
    estimatedCpc: dict
    hasExternalHomepage: bool
    hasSmartlinkHomepage: bool
    id: str
    isSmartlink: bool
    logo: dict
    name: str
    trafficTypes: list


class DeeplinkMerchantListMatchRequired(TypedDict):
    market: str


class DeeplinkMerchantListMatch(DeeplinkMerchantListMatchRequired, total=False):
    has_homepage: bool
    is_couponing: bool
    is_smartlink: bool


class Dnt(TypedDict):
    pass


class DntLoadMatchRequired(TypedDict):
    market: str
    project_id: str
    url: str


class DntLoadMatch(DntLoadMatchRequired, total=False):
    callback_url: str
    is_couponing: bool
    merchant_id: str
    placement_id: str


class Market(TypedDict, total=False):
    id: str


class MarketListMatch(TypedDict, total=False):
    id: str


class Merchant(TypedDict, total=False):
    id: str
    logo: dict
    name: str
    offerCount: int
    trafficTypes: list


class MerchantListMatchRequired(TypedDict):
    market: str


class MerchantListMatch(MerchantListMatchRequired, total=False):
    is_couponing: bool


class Offer(TypedDict, total=False):
    availability: str
    brand: str
    clickUrl: str
    count: int
    description: str
    eer: str
    estimatedCpc: dict
    id: str
    image: dict
    merchant: dict
    offers: list
    originalPrice: dict
    price: dict
    promoText: str
    shippingPrice: dict
    shippingTime: dict
    thumbnail: dict
    title: str
    unitPrice: dict


class OfferLoadMatchRequired(TypedDict):
    ean: str
    market: str


class OfferLoadMatch(OfferLoadMatchRequired, total=False):
    is_couponing: bool
    merchant_id: str
    placement_id: str


class OfferListMatchRequired(TypedDict):
    market: str


class OfferListMatch(OfferListMatchRequired, total=False):
    ean: str
    is_couponing: bool
    keyword: str
    limit: int
    merchant_id: str
    offer_id: str
    placement_id: str
    precision: str
    sort: str


class ReportDetail(TypedDict, total=False):
    clickId: str
    currency: str
    date: str
    market: str
    merchant: dict
    placementId: str
    revenue: float


class ReportDetailListMatchRequired(TypedDict):
    date: str
    format: str


class ReportDetailListMatch(ReportDetailListMatchRequired, total=False):
    market: str


class ReportGeneral(TypedDict, total=False):
    date: dict
    market: dict
    total: dict


class ReportGeneralLoadMatch(TypedDict):
    date: str
    format: str


class ReportModified(TypedDict, total=False):
    date: str
    modifiedDate: str


class ReportModifiedLoadMatchRequired(TypedDict):
    to: str


class ReportModifiedLoadMatch(ReportModifiedLoadMatchRequired, total=False):
    market: str


class ReportStatus(TypedDict, total=False):
    status: str


class ReportStatusLoadMatch(TypedDict):
    date: str
