"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "conversion_detail",
        "accessor": "ConversionDetail",
        "op": "list",
        "method": "GET",
        "path": "/v2/conversion/detail",
        "args": [],
        "select": {
            "date": "v1",
            "format": "v1",
            "market": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json",
            "text/csv"
        ],
        "query": [
            "date",
            "format",
            "market"
        ],
        "queryArgs": [
            {
                "name": "date",
                "wire": "date"
            },
            {
                "name": "format",
                "wire": "format"
            },
            {
                "name": "market",
                "wire": "market"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "totalClicks": 1,
            "clicks": [
                {
                    "clickId": "x",
                    "date": "2026-01-01T00:00:00Z",
                    "placementId": "x",
                    "market": "x",
                    "merchant": {
                        "id": "x",
                        "name": "x"
                    },
                    "sales": 42
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "conversion_detail_merchant",
        "accessor": "ConversionDetailMerchant",
        "op": "list",
        "method": "GET",
        "path": "/v2/conversion/detail/merchant",
        "args": [],
        "select": {
            "format": "v1",
            "from": "v1",
            "to": "v1",
            "market": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json",
            "text/csv"
        ],
        "query": [
            "market",
            "from",
            "to",
            "format"
        ],
        "queryArgs": [
            {
                "name": "format",
                "wire": "format"
            },
            {
                "name": "from",
                "wire": "from"
            },
            {
                "name": "market",
                "wire": "market"
            },
            {
                "name": "to",
                "wire": "to"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "date": {
                "from": "2026-01-01",
                "to": "2026-01-01"
            },
            "total": {
                "sales": 42,
                "clicks": 16
            },
            "salesByMerchant": [
                {
                    "market": "de",
                    "merchant": {
                        "id": "x",
                        "name": "x"
                    },
                    "sales": 42,
                    "clicks": 16
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "conversion_general",
        "accessor": "ConversionGeneral",
        "op": "load",
        "method": "GET",
        "path": "/v2/conversion/general",
        "args": [],
        "select": {
            "format": "v1",
            "from": "v1",
            "to": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json",
            "text/csv"
        ],
        "query": [
            "from",
            "to",
            "format"
        ],
        "queryArgs": [
            {
                "name": "format",
                "wire": "format"
            },
            {
                "name": "from",
                "wire": "from"
            },
            {
                "name": "to",
                "wire": "to"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "date": {
                "from": "2026-01-01",
                "to": "2026-01-01"
            },
            "total": {
                "sales": "42",
                "clickCount": "123"
            },
            "market": {
                "de": {
                    "total": {
                        "sales": "42",
                        "clickCount": "123"
                    }
                },
                "ch": {
                    "total": {
                        "sales": "42",
                        "clickCount": "123"
                    }
                }
            }
        },
        "idField": "id"
    },
    {
        "entity": "conversion_status",
        "accessor": "ConversionStatus",
        "op": "load",
        "method": "GET",
        "path": "/v2/conversion/status",
        "args": [],
        "select": {
            "date": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "date"
        ],
        "queryArgs": [
            {
                "name": "date",
                "wire": "date"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "status": "complete"
        },
        "idField": "id"
    },
    {
        "entity": "deeplink",
        "accessor": "Deeplink",
        "op": "create",
        "method": "POST",
        "path": "/v2/deeplink",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "result": {
                "found": 1,
                "total": 1,
                "deeplinks": [
                    {
                        "url": "x",
                        "found": true,
                        "clickUrl": "x",
                        "merchant": {
                            "logo": {
                                "url": "x",
                                "exists": true
                            }
                        },
                        "estimatedCpc": {
                            "amount": "x",
                            "currency": "x"
                        }
                    }
                ]
            }
        },
        "idField": "id"
    },
    {
        "entity": "deeplink_merchant",
        "accessor": "DeeplinkMerchant",
        "op": "list",
        "method": "GET",
        "path": "/v2/deeplink/merchant",
        "args": [],
        "select": {
            "market": "v1",
            "has_homepage": "v1",
            "is_couponing": "v1",
            "is_smartlink": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "market",
            "isSmartlink",
            "hasHomepage",
            "isCouponing"
        ],
        "queryArgs": [
            {
                "name": "has_homepage",
                "wire": "hasHomepage"
            },
            {
                "name": "is_couponing",
                "wire": "isCouponing"
            },
            {
                "name": "is_smartlink",
                "wire": "isSmartlink"
            },
            {
                "name": "market",
                "wire": "market"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "total": 1,
            "merchants": [
                {
                    "id": "x",
                    "name": "x",
                    "isSmartlink": true,
                    "hasSmartlinkHomepage": true,
                    "hasExternalHomepage": true,
                    "deeplinkCount": 1,
                    "logo": {
                        "url": "x",
                        "exists": true
                    },
                    "estimatedCpc": {
                        "amount": "x",
                        "currency": "x"
                    },
                    "trafficTypes": [
                        {
                            "type": "x",
                            "permission": "not_allowed"
                        }
                    ]
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "dnt",
        "accessor": "Dnt",
        "op": "load",
        "method": "GET",
        "path": "/v2/d",
        "args": [],
        "select": {
            "market": "v1",
            "project_id": "v1",
            "url": "v1",
            "callback_url": "v1",
            "is_couponing": "v1",
            "merchant_id": "v1",
            "placement_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "query": [
            "url",
            "callbackUrl",
            "market",
            "merchantId",
            "placementId",
            "projectId",
            "isCouponing"
        ],
        "queryArgs": [
            {
                "name": "callback_url",
                "wire": "callbackUrl"
            },
            {
                "name": "is_couponing",
                "wire": "isCouponing"
            },
            {
                "name": "market",
                "wire": "market"
            },
            {
                "name": "merchant_id",
                "wire": "merchantId"
            },
            {
                "name": "placement_id",
                "wire": "placementId"
            },
            {
                "name": "project_id",
                "wire": "projectId"
            },
            {
                "name": "url",
                "wire": "url"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "api-key"
                }
            ]
        ],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "market",
        "accessor": "Market",
        "op": "list",
        "method": "GET",
        "path": "/v2/markets",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "markets": [
                {
                    "id": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "merchant",
        "accessor": "Merchant",
        "op": "list",
        "method": "GET",
        "path": "/v2/merchant",
        "args": [],
        "select": {
            "market": "v1",
            "is_couponing": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "market",
            "isCouponing"
        ],
        "queryArgs": [
            {
                "name": "is_couponing",
                "wire": "isCouponing"
            },
            {
                "name": "market",
                "wire": "market"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "total": 1,
            "merchants": [
                {
                    "id": "x",
                    "name": "x",
                    "offerCount": 1,
                    "logo": {
                        "url": "x",
                        "exists": true
                    },
                    "trafficTypes": [
                        {
                            "type": "x",
                            "permission": "not_allowed"
                        }
                    ]
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "offer",
        "accessor": "Offer",
        "op": "list",
        "method": "GET",
        "path": "/v2/offer",
        "args": [],
        "select": {
            "market": "v1",
            "ean": "v1",
            "is_couponing": "v1",
            "keyword": "v1",
            "limit": "v1",
            "merchant_id": "v1",
            "offer_id": "v1",
            "placement_id": "v1",
            "precision": "fuzzy",
            "sort": "rel_desc"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "market",
            "keyword",
            "ean",
            "merchantId",
            "offerId",
            "placementId",
            "precision",
            "sort",
            "limit",
            "isCouponing"
        ],
        "queryArgs": [
            {
                "name": "ean",
                "wire": "ean"
            },
            {
                "name": "is_couponing",
                "wire": "isCouponing"
            },
            {
                "name": "keyword",
                "wire": "keyword"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "market",
                "wire": "market"
            },
            {
                "name": "merchant_id",
                "wire": "merchantId"
            },
            {
                "name": "offer_id",
                "wire": "offerId"
            },
            {
                "name": "placement_id",
                "wire": "placementId"
            },
            {
                "name": "precision",
                "wire": "precision"
            },
            {
                "name": "sort",
                "wire": "sort"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "count": 1,
            "total": 1,
            "offers": [
                {
                    "id": "x",
                    "title": "x",
                    "description": "x",
                    "promoText": "x",
                    "brand": "x",
                    "clickUrl": "x",
                    "availability": "AVAILABLE",
                    "eer": "x",
                    "shippingTime": {
                        "text": "x"
                    },
                    "merchant": {
                        "id": "x",
                        "name": "x",
                        "logo": {
                            "url": "x",
                            "exists": true
                        }
                    },
                    "price": {
                        "amount": "x",
                        "currency": "x"
                    },
                    "originalPrice": {
                        "amount": "x",
                        "currency": "x"
                    },
                    "shippingPrice": {
                        "amount": "x",
                        "currency": "x"
                    },
                    "estimatedCpc": {
                        "amount": "x",
                        "currency": "x"
                    },
                    "unitPrice": {
                        "text": "x"
                    },
                    "image": {
                        "url": "x"
                    },
                    "thumbnail": {
                        "url": "x"
                    }
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "offer",
        "accessor": "Offer",
        "op": "load",
        "method": "GET",
        "path": "/v2/offer/bulk",
        "action": "bulk",
        "args": [],
        "select": {
            "ean": "v1",
            "market": "v1",
            "is_couponing": "v1",
            "merchant_id": "v1",
            "placement_id": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "market",
            "eans",
            "merchantId",
            "placementId",
            "isCouponing"
        ],
        "queryArgs": [
            {
                "name": "ean",
                "wire": "eans"
            },
            {
                "name": "is_couponing",
                "wire": "isCouponing"
            },
            {
                "name": "market",
                "wire": "market"
            },
            {
                "name": "merchant_id",
                "wire": "merchantId"
            },
            {
                "name": "placement_id",
                "wire": "placementId"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "ean": {
                "count": 1,
                "offers": [
                    {
                        "id": "x",
                        "title": "x",
                        "description": "x",
                        "promoText": "x",
                        "brand": "x",
                        "clickUrl": "x",
                        "availability": "AVAILABLE",
                        "eer": "x",
                        "shippingTime": {
                            "text": "x"
                        },
                        "merchant": {
                            "id": "x",
                            "name": "x",
                            "logo": {
                                "url": "x",
                                "exists": true
                            }
                        },
                        "price": {
                            "amount": "x",
                            "currency": "x"
                        },
                        "originalPrice": {
                            "amount": "x",
                            "currency": "x"
                        },
                        "shippingPrice": {
                            "amount": "x",
                            "currency": "x"
                        },
                        "estimatedCpc": {
                            "amount": "x",
                            "currency": "x"
                        },
                        "unitPrice": {
                            "text": "x"
                        },
                        "image": {
                            "url": "x"
                        },
                        "thumbnail": {
                            "url": "x"
                        }
                    }
                ]
            }
        },
        "idField": "id"
    },
    {
        "entity": "report_detail",
        "accessor": "ReportDetail",
        "op": "list",
        "method": "GET",
        "path": "/v2/report/detail",
        "args": [],
        "select": {
            "date": "v1",
            "format": "v1",
            "market": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json",
            "text/csv"
        ],
        "query": [
            "date",
            "format",
            "market"
        ],
        "queryArgs": [
            {
                "name": "date",
                "wire": "date"
            },
            {
                "name": "format",
                "wire": "format"
            },
            {
                "name": "market",
                "wire": "market"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "totalClicks": 1,
            "clicks": [
                {
                    "clickId": "x",
                    "date": "2026-01-01T00:00:00Z",
                    "placementId": "x",
                    "market": "x",
                    "merchant": {
                        "id": "x",
                        "name": "x"
                    },
                    "revenue": 1,
                    "currency": "EUR"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "report_general",
        "accessor": "ReportGeneral",
        "op": "load",
        "method": "GET",
        "path": "/v2/report/general",
        "args": [],
        "select": {
            "date": "v1",
            "format": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json",
            "text/csv"
        ],
        "query": [
            "date",
            "format"
        ],
        "queryArgs": [
            {
                "name": "date",
                "wire": "date"
            },
            {
                "name": "format",
                "wire": "format"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "date": {
                "from": "x",
                "to": "x"
            },
            "total": {
                "clicks": 1,
                "revenue": 1,
                "currency": "x"
            },
            "market": {
                "de": {
                    "total": {
                        "clicks": 1,
                        "revenue": 0,
                        "currency": "x"
                    }
                }
            }
        },
        "idField": "id"
    },
    {
        "entity": "report_modified",
        "accessor": "ReportModified",
        "op": "load",
        "method": "GET",
        "path": "/v2/report/modified",
        "args": [],
        "select": {
            "from": "v1",
            "to": "v1",
            "market": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "from",
            "to",
            "market"
        ],
        "queryArgs": [
            {
                "name": "from",
                "wire": "from"
            },
            {
                "name": "market",
                "wire": "market"
            },
            {
                "name": "to",
                "wire": "to"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "market": {
                "date": "2026-01-01",
                "modifiedDate": "2026-01-01T00:00:00Z"
            }
        },
        "idField": "id"
    },
    {
        "entity": "report_status",
        "accessor": "ReportStatus",
        "op": "load",
        "method": "GET",
        "path": "/v2/report/status",
        "args": [],
        "select": {
            "date": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "date"
        ],
        "queryArgs": [
            {
                "name": "date",
                "wire": "date"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "status": "complete"
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map