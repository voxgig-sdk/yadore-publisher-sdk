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
(0, node_test_1.describe)('ConversionDetailMerchantEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when YADORE_PUBLISHER_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('YADORE_PUBLISHER_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.YadorePublisherSDK.test();
        const ent = testsdk.ConversionDetailMerchant();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.YADORE_PUBLISHER_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'conversion_detail_merchant.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "clicks", "req": false, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "format": "ISO 3166 Alpha-2", "name": "market", "req": false, "short": "Two character form of a country, in all lower-case", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "merchant", "req": false, "type": "`$OBJECT`", "index$": 2 }, { "active": true, "name": "sales", "req": false, "type": "`$INTEGER`", "index$": 3 }], "name": "conversion_detail_merchant", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "format", "orig": "format", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "from", "orig": "from", "reqd": true, "type": "`$STRING`", "index$": 1 }, { "active": true, "kind": "query", "name": "market", "orig": "market", "reqd": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "kind": "query", "name": "to", "orig": "to", "reqd": true, "type": "`$STRING`", "index$": 3 }] }, "contract": { "id": "GET /v2/conversion/detail/merchant", "json": "{\"operationId\":\"getConversionDetailMerchant\",\"parameters\":[{\"description\":\"Market to search. You will receive a list with valid Markets along with your account information and keys.\",\"in\":\"query\",\"name\":\"market\",\"required\":false,\"schema\":{\"format\":\"ISO 3166 Alpha-2\",\"type\":\"string\"}},{\"description\":\"Starting date for which to generate the report. This parameter has to be in format `YYYY-mm-dd`\",\"in\":\"query\",\"name\":\"from\",\"required\":true,\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"Ending date for which to generate the report. This parameter has to be in format `YYYY-mm-dd`\",\"in\":\"query\",\"name\":\"to\",\"required\":true,\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"A format to generate the reports. Available formats are `json` and `csv`.\",\"in\":\"query\",\"name\":\"format\",\"required\":true,\"schema\":{\"enum\":[\"json\",\"csv\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"date\":{\"properties\":{\"from\":{\"format\":\"date\",\"type\":\"string\"},\"to\":{\"format\":\"date\",\"type\":\"string\"}},\"type\":\"object\"},\"salesByMerchant\":{\"items\":{\"properties\":{\"clicks\":{\"example\":16,\"type\":\"integer\"},\"market\":{\"description\":\"Two character form of a country, in all lower-case\",\"example\":\"de\",\"format\":\"ISO 3166 Alpha-2\",\"pattern\":\"[A-Z]{2}\",\"type\":\"string\"},\"merchant\":{\"properties\":{\"id\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"sales\":{\"example\":42,\"type\":\"integer\"}},\"type\":\"object\"},\"minItems\":0,\"type\":\"array\"},\"total\":{\"properties\":{\"clicks\":{\"example\":16,\"type\":\"integer\"},\"sales\":{\"example\":42,\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"}},\"text/csv\":{\"schema\":{\"example\":\"merchant_id,merchant_name,sales\\n0000111122223333444455556666777788889999aaaabbbbccccddddeeeeffff,example.com,1337\\n1000111122223333444455556666777788889999aaaabbbbccccddddeeeeffff,example.com,163\\n\"}}},\"description\":\"Conversion Detail Merchant Response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"Your project's API-Key.\",\"in\":\"header\",\"name\":\"API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/v2/conversion/detail/merchant", "segments": [{ "lit": "v2" }, { "lit": "conversion" }, { "lit": "detail" }, { "lit": "merchant" }], "select": { "exist": ["format", "from", "market", "to"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "conversion_detail_merchant", "name__orig": "conversion_detail_merchant", "Name": "ConversionDetailMerchant", "name_": "conversion_detail_merchant", "name-": "conversion-detail-merchant", "NAME": "CONVERSION_DETAIL_MERCHANT", "index$": 1 }, { "active": true, "entity": "conversion_detail_merchant", "key$": "BasicConversionDetailMerchantFlow", "kind": "basic", "name": "BasicConversionDetailMerchantFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "conversion_detail_merchant_ref01" } }], "index$": 0 }] }, 'ConversionDetailMerchant');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let conversion_detail_merchant_ref01_data = Object.values(setup.data.existing.conversion_detail_merchant)[0];
        // LIST
        const conversion_detail_merchant_ref01_ent = client.ConversionDetailMerchant();
        const conversion_detail_merchant_ref01_match = {};
        const conversion_detail_merchant_ref01_list = (await conversion_detail_merchant_ref01_ent.list(conversion_detail_merchant_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/conversion_detail_merchant/ConversionDetailMerchantTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.YadorePublisherSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['conversion_detail_merchant01', 'conversion_detail_merchant02', 'conversion_detail_merchant03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'YADORE_PUBLISHER_TEST_CONVERSION_DETAIL_MERCHANT_ENTID': idmap,
        'YADORE_PUBLISHER_TEST_LIVE': 'FALSE',
        'YADORE_PUBLISHER_TEST_EXPLAIN': 'FALSE',
        'YADORE_PUBLISHER_APIKEY': '',
    });
    idmap = env['YADORE_PUBLISHER_TEST_CONVERSION_DETAIL_MERCHANT_ENTID'];
    const live = 'TRUE' === env.YADORE_PUBLISHER_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['YADORE_PUBLISHER_TEST_CONVERSION_DETAIL_MERCHANT_ENTID'];
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
//# sourceMappingURL=ConversionDetailMerchantEntity.test.js.map