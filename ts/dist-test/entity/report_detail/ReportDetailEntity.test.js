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
(0, node_test_1.describe)('ReportDetailEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when YADORE_PUBLISHER_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('YADORE_PUBLISHER_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.YadorePublisherSDK.test();
        const ent = testsdk.ReportDetail();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.YADORE_PUBLISHER_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'report_detail.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "clickId", "req": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "currency", "req": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "format": "date-time", "name": "date", "req": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "market", "req": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "merchant", "req": false, "type": "`$OBJECT`", "index$": 4 }, { "active": true, "name": "placementId", "req": false, "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "revenue", "req": false, "type": "`$NUMBER`", "index$": 6 }], "name": "report_detail", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "date", "orig": "date", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "format", "orig": "format", "reqd": true, "type": "`$STRING`", "index$": 1 }, { "active": true, "kind": "query", "name": "market", "orig": "market", "reqd": false, "type": "`$STRING`", "index$": 2 }] }, "contract": { "id": "GET /v2/report/detail", "json": "{\"operationId\":\"getReportDetail\",\"parameters\":[{\"description\":\"Date for which to generate a report. This date is in the UTC timezone. This parameter has to be in format `YYYY-mm-dd`, for example `2018-01-31`.\",\"in\":\"query\",\"name\":\"date\",\"required\":true,\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"A format to generate the reports. Available formats are `json` and `csv`.\",\"in\":\"query\",\"name\":\"format\",\"required\":true,\"schema\":{\"enum\":[\"json\",\"csv\"],\"type\":\"string\"}},{\"description\":\"Market to search. You can get the markets you are activated for with the Markets API.\",\"in\":\"query\",\"name\":\"market\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"clicks\":{\"items\":{\"properties\":{\"clickId\":{\"type\":\"string\"},\"currency\":{\"example\":\"EUR\",\"type\":\"string\"},\"date\":{\"format\":\"date-time\",\"type\":\"string\"},\"market\":{\"type\":\"string\"},\"merchant\":{\"properties\":{\"id\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"placementId\":{\"type\":\"string\"},\"revenue\":{\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"},\"totalClicks\":{\"type\":\"integer\"}},\"type\":\"object\"}},\"text/csv\":{\"schema\":{\"example\":\"\\\"clickId\\\",\\\"date\\\",\\\"placementId\\\",\\\"market\\\",\\\"merchantId\\\",\\\"merchantName\\\",\\\"revenue\\\",\\\"currency\\\"\\n\\\"532f889fd3ba56f628f3234647d9854650534789938b7fdaafddf1d75081fadc\\\",\\\"2018-01-01T00:00:01+00:00\\\",\\\"your-custom-placement-id-1\\\",\\\"de\\\",\\\"583c1b14c50391777b40ee033a04cef033271e35307f7276125b2ba760d4b48e\\\",\\\"example.com\\\",\\\"0.142898\\\",\\\"EUR\\\"\\n\\\"ae7facb00d557e7d92e1d2ee31bc05cc9787bc6802e636ccb284cfbaeb6680b8\\\",\\\"2018-01-01T00:00:02+00:00\\\",\\\"your-custom-placement-id-2\\\",\\\"de\\\",\\\"583c1b14c50391777b40ee033a04cef033271e35307f7276125b2ba760d4b48e\\\",\\\"example.com\\\",\\\"0.142825\\\",\\\"EUR\\\"\\n\\\"8bc875e7f5260fa14b21797508b9e47ee2df2c2fe0351b88edded847ee59bb1f\\\",\\\"2018-01-01T00:00:03+00:00\\\",\\\"your-custom-placement-id-3\\\",\\\"de\\\",\\\"583c1b14c50391777b40ee033a04cef033271e35307f7276125b2ba760d4b48e\\\",\\\"example.com\\\",\\\"0.120417\\\",\\\"EUR\\\"\\n\"}}},\"description\":\"Report Detail Response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"Your project's API-Key.\",\"in\":\"header\",\"name\":\"API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/v2/report/detail", "segments": [{ "lit": "v2" }, { "lit": "report" }, { "lit": "detail" }], "select": { "exist": ["date", "format", "market"] }, "transform": { "req": "`reqdata`", "res": "`body.clicks`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "report_detail", "name__orig": "report_detail", "Name": "ReportDetail", "name_": "report_detail", "name-": "report-detail", "NAME": "REPORT_DETAIL", "index$": 10 }, { "active": true, "entity": "report_detail", "key$": "BasicReportDetailFlow", "kind": "basic", "name": "BasicReportDetailFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "report_detail_ref01" } }], "index$": 0 }] }, 'ReportDetail');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let report_detail_ref01_data = Object.values(setup.data.existing.report_detail)[0];
        // LIST
        const report_detail_ref01_ent = client.ReportDetail();
        const report_detail_ref01_match = {};
        const report_detail_ref01_list = (await report_detail_ref01_ent.list(report_detail_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/report_detail/ReportDetailTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.YadorePublisherSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['report_detail01', 'report_detail02', 'report_detail03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'YADORE_PUBLISHER_TEST_REPORT_DETAIL_ENTID': idmap,
        'YADORE_PUBLISHER_TEST_LIVE': 'FALSE',
        'YADORE_PUBLISHER_TEST_EXPLAIN': 'FALSE',
        'YADORE_PUBLISHER_APIKEY': '',
    });
    idmap = env['YADORE_PUBLISHER_TEST_REPORT_DETAIL_ENTID'];
    const live = 'TRUE' === env.YADORE_PUBLISHER_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['YADORE_PUBLISHER_TEST_REPORT_DETAIL_ENTID'];
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
//# sourceMappingURL=ReportDetailEntity.test.js.map