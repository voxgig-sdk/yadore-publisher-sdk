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
    click_id: str
    date: str
    market: str
    merchant: dict
    placement_id: str
    sale: float


class ConversionDetailListMatch(TypedDict, total=False):
    click_id: str
    date: str
    market: str
    merchant: dict
    placement_id: str
    sale: float


class ConversionDetailMerchant(TypedDict, total=False):
    click: int
    market: str
    merchant: dict
    sale: int


class ConversionDetailMerchantListMatch(TypedDict, total=False):
    click: int
    market: str
    merchant: dict
    sale: int


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
    url: list


class Deeplink(DeeplinkRequired, total=False):
    is_couponing: bool
    placement_id: str
    result: dict


class DeeplinkCreateData(TypedDict, total=False):
    is_couponing: bool
    market: str
    placement_id: str
    result: dict
    url: list


class DeeplinkMerchant(TypedDict, total=False):
    deeplink_count: int
    estimated_cpc: dict
    has_external_homepage: bool
    has_smartlink_homepage: bool
    id: str
    is_smartlink: bool
    logo: dict
    name: str
    traffic_type: list


class DeeplinkMerchantListMatch(TypedDict, total=False):
    deeplink_count: int
    estimated_cpc: dict
    has_external_homepage: bool
    has_smartlink_homepage: bool
    id: str
    is_smartlink: bool
    logo: dict
    name: str
    traffic_type: list


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
    offer_count: int
    traffic_type: list


class MerchantListMatch(TypedDict, total=False):
    id: str
    logo: dict
    name: str
    offer_count: int
    traffic_type: list


class Offer(TypedDict, total=False):
    availability: str
    brand: str
    click_url: str
    description: str
    ean: dict
    eer: str
    estimated_cpc: dict
    id: str
    image: dict
    merchant: dict
    original_price: dict
    price: dict
    promo_text: str
    shipping_price: dict
    shipping_time: dict
    thumbnail: dict
    title: str
    unit_price: dict


class OfferLoadMatch(TypedDict, total=False):
    availability: str
    brand: str
    click_url: str
    description: str
    ean: dict
    eer: str
    estimated_cpc: dict
    id: str
    image: dict
    merchant: dict
    original_price: dict
    price: dict
    promo_text: str
    shipping_price: dict
    shipping_time: dict
    thumbnail: dict
    title: str
    unit_price: dict


class OfferListMatch(TypedDict, total=False):
    availability: str
    brand: str
    click_url: str
    description: str
    ean: dict
    eer: str
    estimated_cpc: dict
    id: str
    image: dict
    merchant: dict
    original_price: dict
    price: dict
    promo_text: str
    shipping_price: dict
    shipping_time: dict
    thumbnail: dict
    title: str
    unit_price: dict


class ReportDetail(TypedDict, total=False):
    click_id: str
    currency: str
    date: str
    market: str
    merchant: dict
    placement_id: str
    revenue: float


class ReportDetailListMatch(TypedDict, total=False):
    click_id: str
    currency: str
    date: str
    market: str
    merchant: dict
    placement_id: str
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
    market: dict


class ReportModifiedLoadMatch(TypedDict, total=False):
    market: dict


class ReportStatus(TypedDict, total=False):
    status: str


class ReportStatusLoadMatch(TypedDict, total=False):
    status: str
