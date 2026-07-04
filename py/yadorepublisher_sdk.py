# YadorePublisher SDK

from utility.voxgig_struct import voxgig_struct as vs
from core.utility_type import YadorePublisherUtility
from core.spec import YadorePublisherSpec
from core import helpers

# Load utility registration (populates Utility._registrar)
from utility import register

# Load features
from feature.base_feature import YadorePublisherBaseFeature
from features import _make_feature


class YadorePublisherSDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = YadorePublisherUtility()
        self._utility = utility

        from config import make_config
        config = make_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features from config.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            feature_items = vs.items(feature_opts)
            if feature_items is not None:
                for item in feature_items:
                    fname = item[0]
                    fopts = helpers.to_map(item[1])
                    if fopts is not None and fopts.get("active") is True:
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        extend = vs.getprop(self.options, "extend")
        if isinstance(extend, list):
            for f in extend:
                if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                    utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return YadorePublisherUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = YadorePublisherSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    def direct(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }


    @property
    def conversion_detail(self):
        """Idiomatic facade: client.conversion_detail.list() / client.conversion_detail.load({"id": ...})."""
        from entity.conversion_detail_entity import ConversionDetailEntity
        cached = getattr(self, "_conversion_detail", None)
        if cached is None:
            cached = ConversionDetailEntity(self, None)
            self._conversion_detail = cached
        return cached

    def ConversionDetail(self, data=None):
        # Deprecated: use client.conversion_detail instead.
        from entity.conversion_detail_entity import ConversionDetailEntity
        return ConversionDetailEntity(self, data)


    @property
    def conversion_detail_merchant(self):
        """Idiomatic facade: client.conversion_detail_merchant.list() / client.conversion_detail_merchant.load({"id": ...})."""
        from entity.conversion_detail_merchant_entity import ConversionDetailMerchantEntity
        cached = getattr(self, "_conversion_detail_merchant", None)
        if cached is None:
            cached = ConversionDetailMerchantEntity(self, None)
            self._conversion_detail_merchant = cached
        return cached

    def ConversionDetailMerchant(self, data=None):
        # Deprecated: use client.conversion_detail_merchant instead.
        from entity.conversion_detail_merchant_entity import ConversionDetailMerchantEntity
        return ConversionDetailMerchantEntity(self, data)


    @property
    def conversion_general(self):
        """Idiomatic facade: client.conversion_general.list() / client.conversion_general.load({"id": ...})."""
        from entity.conversion_general_entity import ConversionGeneralEntity
        cached = getattr(self, "_conversion_general", None)
        if cached is None:
            cached = ConversionGeneralEntity(self, None)
            self._conversion_general = cached
        return cached

    def ConversionGeneral(self, data=None):
        # Deprecated: use client.conversion_general instead.
        from entity.conversion_general_entity import ConversionGeneralEntity
        return ConversionGeneralEntity(self, data)


    @property
    def conversion_status(self):
        """Idiomatic facade: client.conversion_status.list() / client.conversion_status.load({"id": ...})."""
        from entity.conversion_status_entity import ConversionStatusEntity
        cached = getattr(self, "_conversion_status", None)
        if cached is None:
            cached = ConversionStatusEntity(self, None)
            self._conversion_status = cached
        return cached

    def ConversionStatus(self, data=None):
        # Deprecated: use client.conversion_status instead.
        from entity.conversion_status_entity import ConversionStatusEntity
        return ConversionStatusEntity(self, data)


    @property
    def deeplink(self):
        """Idiomatic facade: client.deeplink.list() / client.deeplink.load({"id": ...})."""
        from entity.deeplink_entity import DeeplinkEntity
        cached = getattr(self, "_deeplink", None)
        if cached is None:
            cached = DeeplinkEntity(self, None)
            self._deeplink = cached
        return cached

    def Deeplink(self, data=None):
        # Deprecated: use client.deeplink instead.
        from entity.deeplink_entity import DeeplinkEntity
        return DeeplinkEntity(self, data)


    @property
    def deeplink_merchant(self):
        """Idiomatic facade: client.deeplink_merchant.list() / client.deeplink_merchant.load({"id": ...})."""
        from entity.deeplink_merchant_entity import DeeplinkMerchantEntity
        cached = getattr(self, "_deeplink_merchant", None)
        if cached is None:
            cached = DeeplinkMerchantEntity(self, None)
            self._deeplink_merchant = cached
        return cached

    def DeeplinkMerchant(self, data=None):
        # Deprecated: use client.deeplink_merchant instead.
        from entity.deeplink_merchant_entity import DeeplinkMerchantEntity
        return DeeplinkMerchantEntity(self, data)


    @property
    def dnt(self):
        """Idiomatic facade: client.dnt.list() / client.dnt.load({"id": ...})."""
        from entity.dnt_entity import DntEntity
        cached = getattr(self, "_dnt", None)
        if cached is None:
            cached = DntEntity(self, None)
            self._dnt = cached
        return cached

    def Dnt(self, data=None):
        # Deprecated: use client.dnt instead.
        from entity.dnt_entity import DntEntity
        return DntEntity(self, data)


    @property
    def market(self):
        """Idiomatic facade: client.market.list() / client.market.load({"id": ...})."""
        from entity.market_entity import MarketEntity
        cached = getattr(self, "_market", None)
        if cached is None:
            cached = MarketEntity(self, None)
            self._market = cached
        return cached

    def Market(self, data=None):
        # Deprecated: use client.market instead.
        from entity.market_entity import MarketEntity
        return MarketEntity(self, data)


    @property
    def merchant(self):
        """Idiomatic facade: client.merchant.list() / client.merchant.load({"id": ...})."""
        from entity.merchant_entity import MerchantEntity
        cached = getattr(self, "_merchant", None)
        if cached is None:
            cached = MerchantEntity(self, None)
            self._merchant = cached
        return cached

    def Merchant(self, data=None):
        # Deprecated: use client.merchant instead.
        from entity.merchant_entity import MerchantEntity
        return MerchantEntity(self, data)


    @property
    def offer(self):
        """Idiomatic facade: client.offer.list() / client.offer.load({"id": ...})."""
        from entity.offer_entity import OfferEntity
        cached = getattr(self, "_offer", None)
        if cached is None:
            cached = OfferEntity(self, None)
            self._offer = cached
        return cached

    def Offer(self, data=None):
        # Deprecated: use client.offer instead.
        from entity.offer_entity import OfferEntity
        return OfferEntity(self, data)


    @property
    def report_detail(self):
        """Idiomatic facade: client.report_detail.list() / client.report_detail.load({"id": ...})."""
        from entity.report_detail_entity import ReportDetailEntity
        cached = getattr(self, "_report_detail", None)
        if cached is None:
            cached = ReportDetailEntity(self, None)
            self._report_detail = cached
        return cached

    def ReportDetail(self, data=None):
        # Deprecated: use client.report_detail instead.
        from entity.report_detail_entity import ReportDetailEntity
        return ReportDetailEntity(self, data)


    @property
    def report_general(self):
        """Idiomatic facade: client.report_general.list() / client.report_general.load({"id": ...})."""
        from entity.report_general_entity import ReportGeneralEntity
        cached = getattr(self, "_report_general", None)
        if cached is None:
            cached = ReportGeneralEntity(self, None)
            self._report_general = cached
        return cached

    def ReportGeneral(self, data=None):
        # Deprecated: use client.report_general instead.
        from entity.report_general_entity import ReportGeneralEntity
        return ReportGeneralEntity(self, data)


    @property
    def report_modified(self):
        """Idiomatic facade: client.report_modified.list() / client.report_modified.load({"id": ...})."""
        from entity.report_modified_entity import ReportModifiedEntity
        cached = getattr(self, "_report_modified", None)
        if cached is None:
            cached = ReportModifiedEntity(self, None)
            self._report_modified = cached
        return cached

    def ReportModified(self, data=None):
        # Deprecated: use client.report_modified instead.
        from entity.report_modified_entity import ReportModifiedEntity
        return ReportModifiedEntity(self, data)


    @property
    def report_status(self):
        """Idiomatic facade: client.report_status.list() / client.report_status.load({"id": ...})."""
        from entity.report_status_entity import ReportStatusEntity
        cached = getattr(self, "_report_status", None)
        if cached is None:
            cached = ReportStatusEntity(self, None)
            self._report_status = cached
        return cached

    def ReportStatus(self, data=None):
        # Deprecated: use client.report_status instead.
        from entity.report_status_entity import ReportStatusEntity
        return ReportStatusEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None):
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk
