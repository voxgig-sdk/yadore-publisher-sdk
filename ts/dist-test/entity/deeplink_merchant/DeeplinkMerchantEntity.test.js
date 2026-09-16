"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('DeeplinkMerchantEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when YADORE_PUBLISHER_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('YADORE_PUBLISHER_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.YadorePublisherSDK.test();
        const ent = testsdk.DeeplinkMerchant();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.YADORE_PUBLISHER_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'deeplink_merchant.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "deeplinkCount", "req": false, "short": "Even when a merchant has no deeplinks, it might still have smartlinks.", "type": "`$INTEGER`", "index$": 0 }, { "active": true, "name": "estimatedCpc", "req": false, "type": "`$OBJECT`", "index$": 1 }, { "active": true, "name": "hasExternalHomepage", "req": false, "short": "If the merchant accept homepage deeplinks.", "type": "`$BOOLEAN`", "index$": 2 }, { "active": true, "name": "hasSmartlinkHomepage", "req": false, "short": "If the merchant accept homepage smartlinks.", "type": "`$BOOLEAN`", "index$": 3 }, { "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "isSmartlink", "req": false, "short": "If the merchant has one or more smartlinks.", "type": "`$BOOLEAN`", "index$": 5 }, { "active": true, "name": "logo", "req": false, "type": "`$OBJECT`", "index$": 6 }, { "active": true, "name": "name", "req": false, "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "trafficTypes", "req": false, "type": "`$ARRAY`", "index$": 8 }], "id": { "field": "id", "name": "id" }, "name": "deeplink_merchant", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "has_homepage", "orig": "has_homepage", "reqd": false, "type": "`$BOOLEAN`", "index$": 0 }, { "active": true, "kind": "query", "name": "is_couponing", "orig": "is_couponing", "reqd": false, "type": "`$BOOLEAN`", "index$": 1 }, { "active": true, "kind": "query", "name": "is_smartlink", "orig": "is_smartlink", "reqd": false, "type": "`$BOOLEAN`", "index$": 2 }, { "active": true, "kind": "query", "name": "market", "orig": "market", "reqd": true, "type": "`$STRING`", "index$": 3 }] }, "contract": { "id": "GET /v2/deeplink/merchant", "json": "{\"operationId\":\"getDeeplinkMerchant\",\"parameters\":[{\"description\":\"Market to search. You can get the markets you are activated for with the Markets API.\",\"in\":\"query\",\"name\":\"market\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Set to 1 to limit results to smartlink merchants only. If omitted, you will get results for all merchants.\",\"in\":\"query\",\"name\":\"isSmartlink\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Set to 1 to limit results to homepage merchants only. If omitted, you will get results for all merchants.\",\"in\":\"query\",\"name\":\"hasHomepage\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"If your project has mixed traffic, you can filter the merchants by using this parameter.\",\"in\":\"query\",\"name\":\"isCouponing\",\"required\":false,\"schema\":{\"type\":\"boolean\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"merchants\":{\"items\":{\"properties\":{\"deeplinkCount\":{\"description\":\"Even when a merchant has no deeplinks, it might still have smartlinks.\",\"type\":\"integer\"},\"estimatedCpc\":{\"properties\":{\"amount\":{\"nullable\":true,\"type\":\"string\"},\"currency\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"hasExternalHomepage\":{\"description\":\"If the merchant accept homepage deeplinks.\",\"type\":\"boolean\"},\"hasSmartlinkHomepage\":{\"description\":\"If the merchant accept homepage smartlinks.\",\"type\":\"boolean\"},\"id\":{\"type\":\"string\"},\"isSmartlink\":{\"description\":\"If the merchant has one or more smartlinks.\",\"type\":\"boolean\"},\"logo\":{\"properties\":{\"exists\":{\"type\":\"boolean\"},\"url\":{\"type\":\"string\"}},\"type\":\"object\"},\"name\":{\"type\":\"string\"},\"trafficTypes\":{\"items\":{\"properties\":{\"permission\":{\"enum\":[\"not_allowed\",\"allowed\"],\"type\":\"string\"},\"type\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"},\"total\":{\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Deeplink Merchant Response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"Your project's API-Key.\",\"in\":\"header\",\"name\":\"API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/v2/deeplink/merchant", "segments": [{ "lit": "v2" }, { "lit": "deeplink" }, { "lit": "merchant" }], "select": { "exist": ["has_homepage", "is_couponing", "is_smartlink", "market"] }, "transform": { "req": "`reqdata`", "res": "`body.merchants`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "deeplink_merchant", "name__orig": "deeplink_merchant", "Name": "DeeplinkMerchant", "name_": "deeplink_merchant", "name-": "deeplink-merchant", "NAME": "DEEPLINK_MERCHANT", "index$": 5 }, { "active": true, "entity": "deeplink_merchant", "key$": "BasicDeeplinkMerchantFlow", "kind": "basic", "name": "BasicDeeplinkMerchantFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "deeplink_merchant_ref01" } }], "index$": 0 }] }, 'DeeplinkMerchant');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let deeplink_merchant_ref01_data = Object.values(setup.data.existing.deeplink_merchant)[0];
        // LIST
        const deeplink_merchant_ref01_ent = client.DeeplinkMerchant();
        const deeplink_merchant_ref01_match = {};
        const deeplink_merchant_ref01_list = (await deeplink_merchant_ref01_ent.list(deeplink_merchant_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/deeplink_merchant/DeeplinkMerchantTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.YadorePublisherSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['deeplink_merchant01', 'deeplink_merchant02', 'deeplink_merchant03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'YADORE_PUBLISHER_TEST_DEEPLINK_MERCHANT_ENTID': idmap,
        'YADORE_PUBLISHER_TEST_LIVE': 'FALSE',
        'YADORE_PUBLISHER_TEST_EXPLAIN': 'FALSE',
        'YADORE_PUBLISHER_APIKEY': '',
    });
    idmap = env['YADORE_PUBLISHER_TEST_DEEPLINK_MERCHANT_ENTID'];
    const live = 'TRUE' === env.YADORE_PUBLISHER_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['YADORE_PUBLISHER_TEST_DEEPLINK_MERCHANT_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.YadorePublisherSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.YADORE_PUBLISHER_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.YADORE_PUBLISHER_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=DeeplinkMerchantEntity.test.js.map