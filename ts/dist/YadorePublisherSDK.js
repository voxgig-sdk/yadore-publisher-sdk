"use strict";
// YadorePublisher Ts SDK
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK = exports.YadorePublisherSDK = exports.YadorePublisherEntityBase = exports.BaseFeature = exports.config = exports.stdutil = void 0;
const ConversionDetailEntity_1 = require("./entity/ConversionDetailEntity");
const ConversionDetailMerchantEntity_1 = require("./entity/ConversionDetailMerchantEntity");
const ConversionGeneralEntity_1 = require("./entity/ConversionGeneralEntity");
const ConversionStatusEntity_1 = require("./entity/ConversionStatusEntity");
const DeeplinkEntity_1 = require("./entity/DeeplinkEntity");
const DeeplinkMerchantEntity_1 = require("./entity/DeeplinkMerchantEntity");
const DntEntity_1 = require("./entity/DntEntity");
const MarketEntity_1 = require("./entity/MarketEntity");
const MerchantEntity_1 = require("./entity/MerchantEntity");
const OfferEntity_1 = require("./entity/OfferEntity");
const ReportDetailEntity_1 = require("./entity/ReportDetailEntity");
const ReportGeneralEntity_1 = require("./entity/ReportGeneralEntity");
const ReportModifiedEntity_1 = require("./entity/ReportModifiedEntity");
const ReportStatusEntity_1 = require("./entity/ReportStatusEntity");
const node_util_1 = require("node:util");
const Config_1 = require("./Config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return Config_1.config; } });
const YadorePublisherEntityBase_1 = require("./YadorePublisherEntityBase");
Object.defineProperty(exports, "YadorePublisherEntityBase", { enumerable: true, get: function () { return YadorePublisherEntityBase_1.YadorePublisherEntityBase; } });
const Utility_1 = require("./utility/Utility");
const BaseFeature_1 = require("./feature/base/BaseFeature");
Object.defineProperty(exports, "BaseFeature", { enumerable: true, get: function () { return BaseFeature_1.BaseFeature; } });
const stdutil = new Utility_1.Utility();
exports.stdutil = stdutil;
class YadorePublisherSDK {
    _mode = 'live';
    _options;
    _utility = new Utility_1.Utility();
    _features;
    _rootctx;
    constructor(options) {
        this._rootctx = this._utility.makeContext({
            client: this,
            utility: this._utility,
            config: Config_1.config,
            options,
            shared: new WeakMap()
        });
        this._options = this._utility.makeOptions(this._rootctx);
        const struct = this._utility.struct;
        const getpath = struct.getpath;
        if (true === getpath(this._options.feature, 'test.active')) {
            this._mode = 'test';
        }
        this._rootctx.options = this._options;
        this._features = [];
        const featureAdd = this._utility.featureAdd;
        const featureInit = this._utility.featureInit;
        // Add features in the resolved order (makeOptions puts an explicit
        // array order first, else defaults to test-first). Ordering matters:
        // the `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
        // so `test` must be added before them to sit at the base of the chain.
        const extend = this._options.extend || [];
        const featureorder = getpath(this._options, '__derived__.featureorder') || [];
        for (const fname of featureorder) {
            const fopts = this._options.feature[fname] || {};
            if (fopts.active) {
                // An active name with no generated class is legal when an
                // extend-supplied instance carries that name (station's adopt
                // path): the instance is added below, positioned by its own
                // __after__ entry, so skip it here rather than fail construction.
                if (!this._rootctx.config.hasFeature(fname) &&
                    extend.some((f) => fname === f.name)) {
                    continue;
                }
                featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname));
            }
        }
        for (let f of extend) {
            featureAdd(this._rootctx, f);
        }
        for (let f of this._features) {
            featureInit(this._rootctx, f);
        }
        const featureHook = this._utility.featureHook;
        featureHook(this._rootctx, 'PostConstruct');
    }
    options() {
        return this._utility.struct.clone(this._options);
    }
    utility() {
        return this._utility.struct.clone(this._utility);
    }
    async prepare(fetchargs) {
        const utility = this._utility;
        const struct = utility.struct;
        const clone = struct.clone;
        const { makeContext, makeFetchDef, prepareHeaders, prepareAuth, } = utility;
        fetchargs = fetchargs || {};
        let ctx = makeContext({
            opname: 'prepare',
            ctrl: fetchargs.ctrl || {},
        }, this._rootctx);
        const options = this._options;
        // Build spec directly from SDK options + user-provided fetch args.
        const spec = {
            base: options.base,
            prefix: options.prefix,
            suffix: options.suffix,
            path: fetchargs.path || '',
            method: fetchargs.method || 'GET',
            params: fetchargs.params || {},
            query: fetchargs.query || {},
            headers: prepareHeaders(ctx),
            body: fetchargs.body,
            step: 'start',
        };
        ctx.spec = spec;
        // Merge user-provided headers over SDK defaults.
        if (fetchargs.headers) {
            const uheaders = fetchargs.headers;
            for (let key in uheaders) {
                spec.headers[key] = uheaders[key];
            }
        }
        // Apply SDK auth (apikey, auth prefix, etc.)
        const authResult = prepareAuth(ctx);
        if (authResult instanceof Error) {
            return authResult;
        }
        return makeFetchDef(ctx);
    }
    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    // either one reaches the same endpoint.
    async direct(fetchargs) {
        if (!this._options.allow.op.includes('direct')) {
            return {
                ok: false,
                err: new Error('YadorePublisherSDK: direct: operation not allowed by' +
                    ' SDK option allow.op value: "' + this._options.allow.op + '"'),
            };
        }
        return this._rawRequest(fetchargs);
    }
    // Ungated request path shared by direct() and graphql(), each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    async _rawRequest(fetchargs) {
        const utility = this._utility;
        const fetcher = utility.fetcher;
        const makeContext = utility.makeContext;
        const fetchdef = await this.prepare(fetchargs);
        if (fetchdef instanceof Error) {
            return fetchdef;
        }
        let ctx = makeContext({
            opname: 'direct',
            ctrl: (fetchargs || {}).ctrl || {},
        }, this._rootctx);
        try {
            const fetched = await fetcher(ctx, fetchdef.url, fetchdef);
            if (null == fetched) {
                return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') };
            }
            else if (fetched instanceof Error) {
                return { ok: false, err: fetched };
            }
            const status = fetched.status;
            // No body responses (204 No Content, 304 Not Modified) and explicit
            // zero content-length must skip JSON parsing — fetched.json() would
            // throw `Unexpected end of JSON input` on an empty body.
            const headers = fetched.headers;
            const contentLength = headers && 'function' === typeof headers.get
                ? headers.get('content-length')
                : (headers || {})['content-length'];
            const noBody = 204 === status || 304 === status || '0' === String(contentLength);
            let json = undefined;
            if (!noBody) {
                try {
                    json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json;
                }
                catch (parseErr) {
                    // Body wasn't valid JSON — surface the raw response rather than
                    // throwing. data stays undefined; callers can inspect status/headers.
                    json = undefined;
                }
            }
            return {
                ok: status >= 200 && status < 300,
                status,
                headers: fetched.headers,
                data: json,
            };
        }
        catch (err) {
            return { ok: false, err };
        }
    }
    // Raw GraphQL access: the pressure valve that makes the generated
    // surface's deliberate omissions (per-call selection sets, typed filter
    // builders, batching, subscriptions) livable — the whole schema stays
    // reachable.
    //
    // Thin wrapper over the same prepare/fetch path `direct` uses, with the
    // one thing raw `direct` cannot do for GraphQL: a GraphQL failure rides
    // HTTP 200 as a top-level `errors` array, so status alone would report a
    // failed query as ok.
    //
    // NOTE: like `direct`, this bypasses the feature pipeline — no retry,
    // ratelimit or paging features apply.
    async graphql(query, variables, ctrl) {
        const options = this._options;
        if (!options.allow.op.includes('graphql')) {
            return {
                ok: false,
                err: new Error('YadorePublisherSDK: graphql: operation not allowed by' +
                    ' SDK option allow.op value: "' + options.allow.op + '"'),
            };
        }
        const res = await this._rawRequest({
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: { query, variables: variables || {} },
            ctrl,
        });
        if (res instanceof Error) {
            return res;
        }
        // Errors are read BEFORE any status check: a GraphQL parse or validation
        // failure comes back as HTTP 400 carrying the standard { errors: [...] }
        // body, and the raw path represents a non-2xx as { ok: false } with no
        // err — so returning early on status would discard the server's own
        // diagnostics, which are the only useful part of that response.
        const errors = null == res.data ? undefined : res.data.errors;
        if (null != errors && Array.isArray(errors) && 0 < errors.length) {
            const first = errors[0] || {};
            const err = new Error('YadorePublisherSDK: graphql: ' +
                (first.message || 'graphql error'));
            err.graphql = errors;
            return { ok: false, status: res.status, headers: res.headers, err, data: res.data };
        }
        return res;
    }
    // Entity access: `client.ConversionDetail().list()` / `client.ConversionDetail().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ConversionDetail(entopts) {
        const self = this;
        return new ConversionDetailEntity_1.ConversionDetailEntity(self, entopts);
    }
    // Entity access: `client.ConversionDetailMerchant().list()` / `client.ConversionDetailMerchant().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ConversionDetailMerchant(entopts) {
        const self = this;
        return new ConversionDetailMerchantEntity_1.ConversionDetailMerchantEntity(self, entopts);
    }
    // Entity access: `client.ConversionGeneral().list()` / `client.ConversionGeneral().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ConversionGeneral(entopts) {
        const self = this;
        return new ConversionGeneralEntity_1.ConversionGeneralEntity(self, entopts);
    }
    // Entity access: `client.ConversionStatus().list()` / `client.ConversionStatus().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ConversionStatus(entopts) {
        const self = this;
        return new ConversionStatusEntity_1.ConversionStatusEntity(self, entopts);
    }
    // Entity access: `client.Deeplink().list()` / `client.Deeplink().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Deeplink(entopts) {
        const self = this;
        return new DeeplinkEntity_1.DeeplinkEntity(self, entopts);
    }
    // Entity access: `client.DeeplinkMerchant().list()` / `client.DeeplinkMerchant().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DeeplinkMerchant(entopts) {
        const self = this;
        return new DeeplinkMerchantEntity_1.DeeplinkMerchantEntity(self, entopts);
    }
    // Entity access: `client.Dnt().list()` / `client.Dnt().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Dnt(entopts) {
        const self = this;
        return new DntEntity_1.DntEntity(self, entopts);
    }
    // Entity access: `client.Market().list()` / `client.Market().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Market(entopts) {
        const self = this;
        return new MarketEntity_1.MarketEntity(self, entopts);
    }
    // Entity access: `client.Merchant().list()` / `client.Merchant().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Merchant(entopts) {
        const self = this;
        return new MerchantEntity_1.MerchantEntity(self, entopts);
    }
    // Entity access: `client.Offer().list()` / `client.Offer().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Offer(entopts) {
        const self = this;
        return new OfferEntity_1.OfferEntity(self, entopts);
    }
    // Entity access: `client.ReportDetail().list()` / `client.ReportDetail().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ReportDetail(entopts) {
        const self = this;
        return new ReportDetailEntity_1.ReportDetailEntity(self, entopts);
    }
    // Entity access: `client.ReportGeneral().list()` / `client.ReportGeneral().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ReportGeneral(entopts) {
        const self = this;
        return new ReportGeneralEntity_1.ReportGeneralEntity(self, entopts);
    }
    // Entity access: `client.ReportModified().list()` / `client.ReportModified().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ReportModified(entopts) {
        const self = this;
        return new ReportModifiedEntity_1.ReportModifiedEntity(self, entopts);
    }
    // Entity access: `client.ReportStatus().list()` / `client.ReportStatus().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ReportStatus(entopts) {
        const self = this;
        return new ReportStatusEntity_1.ReportStatusEntity(self, entopts);
    }
    static test(testoptsarg, sdkoptsarg) {
        const struct = stdutil.struct;
        const setpath = struct.setpath;
        const getdef = struct.getdef;
        const clone = struct.clone;
        const setprop = struct.setprop;
        const sdkopts = getdef(clone(sdkoptsarg), {});
        const testopts = getdef(clone(testoptsarg), {});
        setprop(testopts, 'active', true);
        setpath(sdkopts, 'feature.test', testopts);
        const testsdk = new YadorePublisherSDK(sdkopts);
        testsdk._mode = 'test';
        return testsdk;
    }
    tester(testopts, sdkopts) {
        return YadorePublisherSDK.test(testopts, sdkopts);
    }
    toJSON() {
        return { name: 'YadorePublisher' };
    }
    toString() {
        return 'YadorePublisher ' + this._utility.struct.jsonify(this.toJSON());
    }
    [node_util_1.inspect.custom]() {
        return this.toString();
    }
}
exports.YadorePublisherSDK = YadorePublisherSDK;
const SDK = YadorePublisherSDK;
exports.SDK = SDK;
//# sourceMappingURL=YadorePublisherSDK.js.map