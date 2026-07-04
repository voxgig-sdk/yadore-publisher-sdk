# Typed models for the YadorePublisher SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class ConversionDetail:
    click_id: Optional[str] = None
    date: Optional[str] = None
    market: Optional[str] = None
    merchant: Optional[dict] = None
    placement_id: Optional[str] = None
    sale: Optional[float] = None


@dataclass
class ConversionDetailListMatch:
    click_id: Optional[str] = None
    date: Optional[str] = None
    market: Optional[str] = None
    merchant: Optional[dict] = None
    placement_id: Optional[str] = None
    sale: Optional[float] = None


@dataclass
class ConversionDetailMerchant:
    click: Optional[int] = None
    market: Optional[str] = None
    merchant: Optional[dict] = None
    sale: Optional[int] = None


@dataclass
class ConversionDetailMerchantListMatch:
    click: Optional[int] = None
    market: Optional[str] = None
    merchant: Optional[dict] = None
    sale: Optional[int] = None


@dataclass
class ConversionGeneral:
    date: Optional[dict] = None
    market: Optional[dict] = None
    total: Optional[dict] = None


@dataclass
class ConversionGeneralLoadMatch:
    date: Optional[dict] = None
    market: Optional[dict] = None
    total: Optional[dict] = None


@dataclass
class ConversionStatus:
    status: Optional[str] = None


@dataclass
class ConversionStatusLoadMatch:
    status: Optional[str] = None


@dataclass
class Deeplink:
    market: str
    url: list
    is_couponing: Optional[bool] = None
    placement_id: Optional[str] = None
    result: Optional[dict] = None


@dataclass
class DeeplinkCreateData:
    is_couponing: Optional[bool] = None
    market: Optional[str] = None
    placement_id: Optional[str] = None
    result: Optional[dict] = None
    url: Optional[list] = None


@dataclass
class DeeplinkMerchant:
    deeplink_count: Optional[int] = None
    estimated_cpc: Optional[dict] = None
    has_external_homepage: Optional[bool] = None
    has_smartlink_homepage: Optional[bool] = None
    id: Optional[str] = None
    is_smartlink: Optional[bool] = None
    logo: Optional[dict] = None
    name: Optional[str] = None
    traffic_type: Optional[list] = None


@dataclass
class DeeplinkMerchantListMatch:
    deeplink_count: Optional[int] = None
    estimated_cpc: Optional[dict] = None
    has_external_homepage: Optional[bool] = None
    has_smartlink_homepage: Optional[bool] = None
    id: Optional[str] = None
    is_smartlink: Optional[bool] = None
    logo: Optional[dict] = None
    name: Optional[str] = None
    traffic_type: Optional[list] = None


@dataclass
class Dnt:
    pass


@dataclass
class DntLoadMatch:
    pass


@dataclass
class Market:
    id: Optional[str] = None


@dataclass
class MarketListMatch:
    id: Optional[str] = None


@dataclass
class Merchant:
    id: Optional[str] = None
    logo: Optional[dict] = None
    name: Optional[str] = None
    offer_count: Optional[int] = None
    traffic_type: Optional[list] = None


@dataclass
class MerchantListMatch:
    id: Optional[str] = None
    logo: Optional[dict] = None
    name: Optional[str] = None
    offer_count: Optional[int] = None
    traffic_type: Optional[list] = None


@dataclass
class Offer:
    availability: Optional[str] = None
    brand: Optional[str] = None
    click_url: Optional[str] = None
    description: Optional[str] = None
    ean: Optional[dict] = None
    eer: Optional[str] = None
    estimated_cpc: Optional[dict] = None
    id: Optional[str] = None
    image: Optional[dict] = None
    merchant: Optional[dict] = None
    original_price: Optional[dict] = None
    price: Optional[dict] = None
    promo_text: Optional[str] = None
    shipping_price: Optional[dict] = None
    shipping_time: Optional[dict] = None
    thumbnail: Optional[dict] = None
    title: Optional[str] = None
    unit_price: Optional[dict] = None


@dataclass
class OfferLoadMatch:
    availability: Optional[str] = None
    brand: Optional[str] = None
    click_url: Optional[str] = None
    description: Optional[str] = None
    ean: Optional[dict] = None
    eer: Optional[str] = None
    estimated_cpc: Optional[dict] = None
    id: Optional[str] = None
    image: Optional[dict] = None
    merchant: Optional[dict] = None
    original_price: Optional[dict] = None
    price: Optional[dict] = None
    promo_text: Optional[str] = None
    shipping_price: Optional[dict] = None
    shipping_time: Optional[dict] = None
    thumbnail: Optional[dict] = None
    title: Optional[str] = None
    unit_price: Optional[dict] = None


@dataclass
class OfferListMatch:
    availability: Optional[str] = None
    brand: Optional[str] = None
    click_url: Optional[str] = None
    description: Optional[str] = None
    ean: Optional[dict] = None
    eer: Optional[str] = None
    estimated_cpc: Optional[dict] = None
    id: Optional[str] = None
    image: Optional[dict] = None
    merchant: Optional[dict] = None
    original_price: Optional[dict] = None
    price: Optional[dict] = None
    promo_text: Optional[str] = None
    shipping_price: Optional[dict] = None
    shipping_time: Optional[dict] = None
    thumbnail: Optional[dict] = None
    title: Optional[str] = None
    unit_price: Optional[dict] = None


@dataclass
class ReportDetail:
    click_id: Optional[str] = None
    currency: Optional[str] = None
    date: Optional[str] = None
    market: Optional[str] = None
    merchant: Optional[dict] = None
    placement_id: Optional[str] = None
    revenue: Optional[float] = None


@dataclass
class ReportDetailListMatch:
    click_id: Optional[str] = None
    currency: Optional[str] = None
    date: Optional[str] = None
    market: Optional[str] = None
    merchant: Optional[dict] = None
    placement_id: Optional[str] = None
    revenue: Optional[float] = None


@dataclass
class ReportGeneral:
    date: Optional[dict] = None
    market: Optional[dict] = None
    total: Optional[dict] = None


@dataclass
class ReportGeneralLoadMatch:
    date: Optional[dict] = None
    market: Optional[dict] = None
    total: Optional[dict] = None


@dataclass
class ReportModified:
    market: Optional[dict] = None


@dataclass
class ReportModifiedLoadMatch:
    market: Optional[dict] = None


@dataclass
class ReportStatus:
    status: Optional[str] = None


@dataclass
class ReportStatusLoadMatch:
    status: Optional[str] = None

