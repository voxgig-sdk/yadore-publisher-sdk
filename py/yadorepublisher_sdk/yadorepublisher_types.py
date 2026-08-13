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


class ConversionDetailListMatch(TypedDict, total=False):
    clickId: str
    date: str
    market: str
    merchant: dict
    placementId: str
    sales: float


class ConversionDetailMerchant(TypedDict, total=False):
    clicks: int
    market: str
    merchant: dict
    sales: int


class ConversionDetailMerchantListMatch(TypedDict, total=False):
    clicks: int
    market: str
    merchant: dict
    sales: int


class ConversionGeneral(TypedDict, total=False):
    date: dict
    market: dict
    total: dict


class ConversionGeneralLoadMatch(TypedDict, total=False):
    date: dict
    market: dict
    total: dict


class ConversionStatus(TypedDict, total=False):
    status: str


class ConversionStatusLoadMatch(TypedDict, total=False):
    status: str


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


class DeeplinkMerchantListMatch(TypedDict, total=False):
    deeplinkCount: int
    estimatedCpc: dict
    hasExternalHomepage: bool
    hasSmartlinkHomepage: bool
    id: str
    isSmartlink: bool
    logo: dict
    name: str
    trafficTypes: list


class Dnt(TypedDict):
    pass


class DntLoadMatch(TypedDict):
    pass


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


class MerchantListMatch(TypedDict, total=False):
    id: str
    logo: dict
    name: str
    offerCount: int
    trafficTypes: list


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
    id: str


class OfferLoadMatch(OfferLoadMatchRequired, total=False):
    availability: str
    brand: str
    clickUrl: str
    count: int
    description: str
    eer: str
    estimatedCpc: dict
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


class OfferListMatch(TypedDict, total=False):
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


class ReportDetail(TypedDict, total=False):
    clickId: str
    currency: str
    date: str
    market: str
    merchant: dict
    placementId: str
    revenue: float


class ReportDetailListMatch(TypedDict, total=False):
    clickId: str
    currency: str
    date: str
    market: str
    merchant: dict
    placementId: str
    revenue: float


class ReportGeneral(TypedDict, total=False):
    date: dict
    market: dict
    total: dict


class ReportGeneralLoadMatch(TypedDict, total=False):
    date: dict
    market: dict
    total: dict


class ReportModified(TypedDict, total=False):
    date: str
    modifiedDate: str


class ReportModifiedLoadMatch(TypedDict, total=False):
    date: str
    modifiedDate: str


class ReportStatus(TypedDict, total=False):
    status: str


class ReportStatusLoadMatch(TypedDict, total=False):
    status: str
