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

        # Add features in the resolved order (make_options puts an explicit
        # list order first, else defaults to test-first). Ordering matters: the
        # `test` feature installs the base mock transport and the transport
        # features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        # current, so `test` must be added before them to sit at the base.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            featureorder = vs.getpath(self.options, "__derived__.featureorder")
            if isinstance(featureorder, list):
                for fname in featureorder:
                    fopts = helpers.to_map(feature_opts.get(fname))
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


    def ConversionDetail(self, data=None) -> "ConversionDetailEntity":
        """Entity factory: client.ConversionDetail().list() / client.ConversionDetail().load({"id": ...})."""
        from entity.conversion_detail_entity import ConversionDetailEntity
        return ConversionDetailEntity(self, data)


    def ConversionDetailMerchant(self, data=None) -> "ConversionDetailMerchantEntity":
        """Entity factory: client.ConversionDetailMerchant().list() / client.ConversionDetailMerchant().load({"id": ...})."""
        from entity.conversion_detail_merchant_entity import ConversionDetailMerchantEntity
        return ConversionDetailMerchantEntity(self, data)


    def ConversionGeneral(self, data=None) -> "ConversionGeneralEntity":
        """Entity factory: client.ConversionGeneral().list() / client.ConversionGeneral().load({"id": ...})."""
        from entity.conversion_general_entity import ConversionGeneralEntity
        return ConversionGeneralEntity(self, data)


    def ConversionStatus(self, data=None) -> "ConversionStatusEntity":
        """Entity factory: client.ConversionStatus().list() / client.ConversionStatus().load({"id": ...})."""
        from entity.conversion_status_entity import ConversionStatusEntity
        return ConversionStatusEntity(self, data)


    def Deeplink(self, data=None) -> "DeeplinkEntity":
        """Entity factory: client.Deeplink().list() / client.Deeplink().load({"id": ...})."""
        from entity.deeplink_entity import DeeplinkEntity
        return DeeplinkEntity(self, data)


    def DeeplinkMerchant(self, data=None) -> "DeeplinkMerchantEntity":
        """Entity factory: client.DeeplinkMerchant().list() / client.DeeplinkMerchant().load({"id": ...})."""
        from entity.deeplink_merchant_entity import DeeplinkMerchantEntity
        return DeeplinkMerchantEntity(self, data)


    def Dnt(self, data=None) -> "DntEntity":
        """Entity factory: client.Dnt().list() / client.Dnt().load({"id": ...})."""
        from entity.dnt_entity import DntEntity
        return DntEntity(self, data)


    def Market(self, data=None) -> "MarketEntity":
        """Entity factory: client.Market().list() / client.Market().load({"id": ...})."""
        from entity.market_entity import MarketEntity
        return MarketEntity(self, data)


    def Merchant(self, data=None) -> "MerchantEntity":
        """Entity factory: client.Merchant().list() / client.Merchant().load({"id": ...})."""
        from entity.merchant_entity import MerchantEntity
        return MerchantEntity(self, data)


    def Offer(self, data=None) -> "OfferEntity":
        """Entity factory: client.Offer().list() / client.Offer().load({"id": ...})."""
        from entity.offer_entity import OfferEntity
        return OfferEntity(self, data)


    def ReportDetail(self, data=None) -> "ReportDetailEntity":
        """Entity factory: client.ReportDetail().list() / client.ReportDetail().load({"id": ...})."""
        from entity.report_detail_entity import ReportDetailEntity
        return ReportDetailEntity(self, data)


    def ReportGeneral(self, data=None) -> "ReportGeneralEntity":
        """Entity factory: client.ReportGeneral().list() / client.ReportGeneral().load({"id": ...})."""
        from entity.report_general_entity import ReportGeneralEntity
        return ReportGeneralEntity(self, data)


    def ReportModified(self, data=None) -> "ReportModifiedEntity":
        """Entity factory: client.ReportModified().list() / client.ReportModified().load({"id": ...})."""
        from entity.report_modified_entity import ReportModifiedEntity
        return ReportModifiedEntity(self, data)


    def ReportStatus(self, data=None) -> "ReportStatusEntity":
        """Entity factory: client.ReportStatus().list() / client.ReportStatus().load({"id": ...})."""
        from entity.report_status_entity import ReportStatusEntity
        return ReportStatusEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None) -> "YadorePublisherSDK":
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


from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from entity.conversion_detail_entity import ConversionDetailEntity
    from entity.conversion_detail_merchant_entity import ConversionDetailMerchantEntity
    from entity.conversion_general_entity import ConversionGeneralEntity
    from entity.conversion_status_entity import ConversionStatusEntity
    from entity.deeplink_entity import DeeplinkEntity
    from entity.deeplink_merchant_entity import DeeplinkMerchantEntity
    from entity.dnt_entity import DntEntity
    from entity.market_entity import MarketEntity
    from entity.merchant_entity import MerchantEntity
    from entity.offer_entity import OfferEntity
    from entity.report_detail_entity import ReportDetailEntity
    from entity.report_general_entity import ReportGeneralEntity
    from entity.report_modified_entity import ReportModifiedEntity
    from entity.report_status_entity import ReportStatusEntity
