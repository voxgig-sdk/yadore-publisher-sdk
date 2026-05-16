# YadorePublisher SDK configuration


def make_config():
    return {
        "main": {
            "name": "YadorePublisher",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api.yadore.com/",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "conversion_detail": {},
                "conversion_detail_merchant": {},
                "conversion_general": {},
                "conversion_status": {},
                "deeplink": {},
                "deeplink_merchant": {},
                "dnt": {},
                "market": {},
                "merchant": {},
                "offer": {},
                "report_detail": {},
                "report_general": {},
                "report_modified": {},
                "report_status": {},
            },
        },
        "entity": {
      "conversion_detail": {
        "fields": [
          {
            "name": "click_id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "date",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "market",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "merchant",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "placement_id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "sale",
            "req": False,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 5,
          },
        ],
        "name": "conversion_detail",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "date",
                      "orig": "date",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "market",
                      "orig": "market",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/v2/conversion/detail",
                "parts": [
                  "v2",
                  "conversion",
                  "detail",
                ],
                "select": {
                  "exist": [
                    "date",
                    "format",
                    "market",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "conversion_detail_merchant": {
        "fields": [
          {
            "name": "click",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "market",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "merchant",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "sale",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 3,
          },
        ],
        "name": "conversion_detail_merchant",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "from",
                      "orig": "from",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "market",
                      "orig": "market",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "to",
                      "orig": "to",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/v2/conversion/detail/merchant",
                "parts": [
                  "v2",
                  "conversion",
                  "detail",
                  "merchant",
                ],
                "select": {
                  "exist": [
                    "format",
                    "from",
                    "market",
                    "to",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "conversion_general": {
        "fields": [
          {
            "name": "date",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "market",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "total",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 2,
          },
        ],
        "name": "conversion_general",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "from",
                      "orig": "from",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "to",
                      "orig": "to",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/v2/conversion/general",
                "parts": [
                  "v2",
                  "conversion",
                  "general",
                ],
                "select": {
                  "exist": [
                    "format",
                    "from",
                    "to",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "conversion_status": {
        "fields": [
          {
            "name": "status",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
        ],
        "name": "conversion_status",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "date",
                      "orig": "date",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/v2/conversion/status",
                "parts": [
                  "v2",
                  "conversion",
                  "status",
                ],
                "select": {
                  "exist": [
                    "date",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "deeplink": {
        "fields": [
          {
            "name": "is_couponing",
            "req": False,
            "type": "`$BOOLEAN`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "market",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "placement_id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "result",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "url",
            "req": True,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 4,
          },
        ],
        "name": "deeplink",
        "op": {
          "create": {
            "name": "create",
            "points": [
              {
                "method": "POST",
                "orig": "/v2/deeplink",
                "parts": [
                  "v2",
                  "deeplink",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "create",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "deeplink_merchant": {
        "fields": [
          {
            "name": "deeplink_count",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "estimated_cpc",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "has_external_homepage",
            "req": False,
            "type": "`$BOOLEAN`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "has_smartlink_homepage",
            "req": False,
            "type": "`$BOOLEAN`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "is_smartlink",
            "req": False,
            "type": "`$BOOLEAN`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "logo",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 6,
          },
          {
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 7,
          },
          {
            "name": "traffic_type",
            "req": False,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 8,
          },
        ],
        "name": "deeplink_merchant",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "has_homepage",
                      "orig": "has_homepage",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "is_couponing",
                      "orig": "is_couponing",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "is_smartlink",
                      "orig": "is_smartlink",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "market",
                      "orig": "market",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/v2/deeplink/merchant",
                "parts": [
                  "v2",
                  "deeplink",
                  "merchant",
                ],
                "select": {
                  "exist": [
                    "has_homepage",
                    "is_couponing",
                    "is_smartlink",
                    "market",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "dnt": {
        "fields": [],
        "name": "dnt",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "callback_url",
                      "orig": "callback_url",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "is_couponing",
                      "orig": "is_couponing",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "market",
                      "orig": "market",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "merchant_id",
                      "orig": "merchant_id",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "placement_id",
                      "orig": "placement_id",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "project_id",
                      "orig": "project_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "url",
                      "orig": "url",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/v2/d",
                "parts": [
                  "v2",
                  "d",
                ],
                "select": {
                  "exist": [
                    "callback_url",
                    "is_couponing",
                    "market",
                    "merchant_id",
                    "placement_id",
                    "project_id",
                    "url",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "market": {
        "fields": [
          {
            "name": "id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
        ],
        "name": "market",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "method": "GET",
                "orig": "/v2/markets",
                "parts": [
                  "v2",
                  "markets",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "merchant": {
        "fields": [
          {
            "name": "id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "logo",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "offer_count",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "traffic_type",
            "req": False,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 4,
          },
        ],
        "name": "merchant",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "is_couponing",
                      "orig": "is_couponing",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "market",
                      "orig": "market",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/v2/merchant",
                "parts": [
                  "v2",
                  "merchant",
                ],
                "select": {
                  "exist": [
                    "is_couponing",
                    "market",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "offer": {
        "fields": [
          {
            "name": "availability",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "brand",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "click_url",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "description",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "ean",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "eer",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "estimated_cpc",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 6,
          },
          {
            "name": "id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 7,
          },
          {
            "name": "image",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 8,
          },
          {
            "name": "merchant",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 9,
          },
          {
            "name": "original_price",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 10,
          },
          {
            "name": "price",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 11,
          },
          {
            "name": "promo_text",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 12,
          },
          {
            "name": "shipping_price",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 13,
          },
          {
            "name": "shipping_time",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 14,
          },
          {
            "name": "thumbnail",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 15,
          },
          {
            "name": "title",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 16,
          },
          {
            "name": "unit_price",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 17,
          },
        ],
        "name": "offer",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "ean",
                      "orig": "ean",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "is_couponing",
                      "orig": "is_couponing",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "keyword",
                      "orig": "keyword",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "market",
                      "orig": "market",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "merchant_id",
                      "orig": "merchant_id",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "offer_id",
                      "orig": "offer_id",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "placement_id",
                      "orig": "placement_id",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": "fuzzy",
                      "kind": "query",
                      "name": "precision",
                      "orig": "precision",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": "rel_desc",
                      "kind": "query",
                      "name": "sort",
                      "orig": "sort",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/v2/offer",
                "parts": [
                  "v2",
                  "offer",
                ],
                "select": {
                  "exist": [
                    "ean",
                    "is_couponing",
                    "keyword",
                    "limit",
                    "market",
                    "merchant_id",
                    "offer_id",
                    "placement_id",
                    "precision",
                    "sort",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": "12345678,87654321",
                      "kind": "query",
                      "name": "ean",
                      "orig": "ean",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "is_couponing",
                      "orig": "is_couponing",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "market",
                      "orig": "market",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "merchant_id",
                      "orig": "merchant_id",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "placement_id",
                      "orig": "placement_id",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/v2/offer/bulk",
                "parts": [
                  "v2",
                  "offer",
                  "bulk",
                ],
                "select": {
                  "$action": "bulk",
                  "exist": [
                    "ean",
                    "is_couponing",
                    "market",
                    "merchant_id",
                    "placement_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "report_detail": {
        "fields": [
          {
            "name": "click_id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "currency",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "date",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "market",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "merchant",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "placement_id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "revenue",
            "req": False,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 6,
          },
        ],
        "name": "report_detail",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "date",
                      "orig": "date",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "market",
                      "orig": "market",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/v2/report/detail",
                "parts": [
                  "v2",
                  "report",
                  "detail",
                ],
                "select": {
                  "exist": [
                    "date",
                    "format",
                    "market",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "report_general": {
        "fields": [
          {
            "name": "date",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "market",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "total",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 2,
          },
        ],
        "name": "report_general",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "date",
                      "orig": "date",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/v2/report/general",
                "parts": [
                  "v2",
                  "report",
                  "general",
                ],
                "select": {
                  "exist": [
                    "date",
                    "format",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "report_modified": {
        "fields": [
          {
            "name": "market",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 0,
          },
        ],
        "name": "report_modified",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "from",
                      "orig": "from",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "market",
                      "orig": "market",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "to",
                      "orig": "to",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/v2/report/modified",
                "parts": [
                  "v2",
                  "report",
                  "modified",
                ],
                "select": {
                  "exist": [
                    "from",
                    "market",
                    "to",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "report_status": {
        "fields": [
          {
            "name": "status",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
        ],
        "name": "report_status",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "date",
                      "orig": "date",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/v2/report/status",
                "parts": [
                  "v2",
                  "report",
                  "status",
                ],
                "select": {
                  "exist": [
                    "date",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
