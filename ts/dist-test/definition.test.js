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
        "query": [
            "date",
            "format",
            "market"
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
                    "market": "x",
                    "merchant": {
                        "id": "x",
                        "name": "x"
                    },
                    "placementId": "x",
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
            "market": "v1",
            "to": "v1"
        },
        "headers": [],
        "query": [
            "market",
            "from",
            "to",
            "format"
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
                "clicks": 16,
                "sales": 42
            },
            "salesByMerchant": [
                {
                    "clicks": 16,
                    "market": "de",
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
        "query": [
            "from",
            "to",
            "format"
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
                "clickCount": "123",
                "sales": "42"
            },
            "market": {
                "ch": {
                    "total": {
                        "clickCount": "123",
                        "sales": "42"
                    }
                },
                "de": {
                    "total": {
                        "clickCount": "123",
                        "sales": "42"
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
        "query": [
            "date"
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
        "query": [],
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
            "has_homepage": "v1",
            "is_couponing": "v1",
            "is_smartlink": "v1",
            "market": "v1"
        },
        "headers": [],
        "query": [
            "market",
            "isSmartlink",
            "hasHomepage",
            "isCouponing"
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
                    "deeplinkCount": 1,
                    "estimatedCpc": {
                        "amount": "x",
                        "currency": "x"
                    },
                    "hasExternalHomepage": true,
                    "hasSmartlinkHomepage": true,
                    "id": "x",
                    "isSmartlink": true,
                    "logo": {
                        "exists": true,
                        "url": "x"
                    },
                    "name": "x",
                    "trafficTypes": [
                        {
                            "permission": "not_allowed",
                            "type": "x"
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
            "callback_url": "v1",
            "is_couponing": "v1",
            "market": "v1",
            "merchant_id": "v1",
            "placement_id": "v1",
            "project_id": "v1",
            "url": "v1"
        },
        "headers": [],
        "query": [
            "url",
            "callbackUrl",
            "market",
            "merchantId",
            "placementId",
            "projectId",
            "isCouponing"
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
        "query": [],
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
            "is_couponing": "v1",
            "market": "v1"
        },
        "headers": [],
        "query": [
            "market",
            "isCouponing"
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
                    "logo": {
                        "exists": true,
                        "url": "x"
                    },
                    "name": "x",
                    "offerCount": 1,
                    "trafficTypes": [
                        {
                            "permission": "not_allowed",
                            "type": "x"
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
            "ean": "v1",
            "is_couponing": "v1",
            "keyword": "v1",
            "limit": "v1",
            "market": "v1",
            "merchant_id": "v1",
            "offer_id": "v1",
            "placement_id": "v1",
            "precision": "v1",
            "sort": "v1"
        },
        "headers": [],
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
                    "availability": "AVAILABLE",
                    "brand": "x",
                    "clickUrl": "x",
                    "description": "x",
                    "eer": "x",
                    "estimatedCpc": {
                        "amount": "x",
                        "currency": "x"
                    },
                    "id": "x",
                    "image": {
                        "url": "x"
                    },
                    "merchant": {
                        "id": "x",
                        "logo": {
                            "exists": true,
                            "url": "x"
                        },
                        "name": "x"
                    },
                    "originalPrice": {
                        "amount": "x",
                        "currency": "x"
                    },
                    "price": {
                        "amount": "x",
                        "currency": "x"
                    },
                    "promoText": "x",
                    "shippingPrice": {
                        "amount": "x",
                        "currency": "x"
                    },
                    "shippingTime": {
                        "text": "x"
                    },
                    "thumbnail": {
                        "url": "x"
                    },
                    "title": "x",
                    "unitPrice": {
                        "text": "x"
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
            "is_couponing": "v1",
            "market": "v1",
            "merchant_id": "v1",
            "placement_id": "v1"
        },
        "headers": [],
        "query": [
            "market",
            "eans",
            "merchantId",
            "placementId",
            "isCouponing"
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
                        "availability": "AVAILABLE",
                        "brand": "x",
                        "clickUrl": "x",
                        "description": "x",
                        "eer": "x",
                        "estimatedCpc": {
                            "amount": "x",
                            "currency": "x"
                        },
                        "id": "x",
                        "image": {
                            "url": "x"
                        },
                        "merchant": {
                            "id": "x",
                            "logo": {
                                "exists": true,
                                "url": "x"
                            },
                            "name": "x"
                        },
                        "originalPrice": {
                            "amount": "x",
                            "currency": "x"
                        },
                        "price": {
                            "amount": "x",
                            "currency": "x"
                        },
                        "promoText": "x",
                        "shippingPrice": {
                            "amount": "x",
                            "currency": "x"
                        },
                        "shippingTime": {
                            "text": "x"
                        },
                        "thumbnail": {
                            "url": "x"
                        },
                        "title": "x",
                        "unitPrice": {
                            "text": "x"
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
        "query": [
            "date",
            "format",
            "market"
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
                    "currency": "EUR",
                    "date": "2026-01-01T00:00:00Z",
                    "market": "x",
                    "merchant": {
                        "id": "x",
                        "name": "x"
                    },
                    "placementId": "x",
                    "revenue": 1
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
        "query": [
            "date",
            "format"
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
                "currency": "x",
                "revenue": 1
            },
            "market": {
                "de": {
                    "total": {
                        "clicks": 1,
                        "currency": "x",
                        "revenue": 0
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
            "market": "v1",
            "to": "v1"
        },
        "headers": [],
        "query": [
            "from",
            "to",
            "market"
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
        "query": [
            "date"
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