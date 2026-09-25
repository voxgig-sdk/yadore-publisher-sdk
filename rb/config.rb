# YadorePublisher SDK configuration

module YadorePublisherConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "YadorePublisher",
        "slug" => "yadore-publisher",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://api.yadore.com/",
        "auth" => {
          "prefix" => "",
          "name" => "API-Key",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "conversion_detail" => {},
          "conversion_detail_merchant" => {},
          "conversion_general" => {},
          "conversion_status" => {},
          "deeplink" => {},
          "deeplink_merchant" => {},
          "dnt" => {},
          "market" => {},
          "merchant" => {},
          "offer" => {},
          "report_detail" => {},
          "report_general" => {},
          "report_modified" => {},
          "report_status" => {},
        },
      },
      "entity" => {
        "conversion_detail" => {
          "fields" => [
            {
              "name" => "clickId",
              "title" => "Click Id",
              "type" => "`$STRING`",
            },
            {
              "name" => "date",
              "title" => "Date",
              "type" => "`$STRING`",
              "format" => "date-time",
            },
            {
              "name" => "market",
              "title" => "Market",
              "type" => "`$STRING`",
            },
            {
              "name" => "merchant",
              "title" => "Merchant",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "placementId",
              "title" => "Placement Id",
              "type" => "`$STRING`",
            },
            {
              "name" => "sales",
              "title" => "Sales",
              "type" => "`$NUMBER`",
            },
          ],
          "name" => "conversion_detail",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v2/conversion/detail",
                  "segments" => [
                    {
                      "lit" => "v2",
                    },
                    {
                      "lit" => "conversion",
                    },
                    {
                      "lit" => "detail",
                    },
                  ],
                  "parts" => [
                    "v2",
                    "conversion",
                    "detail",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.clicks`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "date",
                        "orig" => "date",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "market",
                        "orig" => "market",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "date",
                      "format",
                      "market",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "conversion_detail_merchant" => {
          "fields" => [
            {
              "name" => "clicks",
              "title" => "Clicks",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "market",
              "title" => "Market",
              "type" => "`$STRING`",
              "short" => "Two character form of a country, in all lower-case",
              "format" => "ISO 3166 Alpha-2",
            },
            {
              "name" => "merchant",
              "title" => "Merchant",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "sales",
              "title" => "Sales",
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "conversion_detail_merchant",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v2/conversion/detail/merchant",
                  "segments" => [
                    {
                      "lit" => "v2",
                    },
                    {
                      "lit" => "conversion",
                    },
                    {
                      "lit" => "detail",
                    },
                    {
                      "lit" => "merchant",
                    },
                  ],
                  "parts" => [
                    "v2",
                    "conversion",
                    "detail",
                    "merchant",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "from",
                        "orig" => "from",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "market",
                        "orig" => "market",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "to",
                        "orig" => "to",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "from",
                      "market",
                      "to",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "conversion_general" => {
          "fields" => [
            {
              "name" => "date",
              "title" => "Date",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "market",
              "title" => "Market",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "total",
              "title" => "Total",
              "type" => "`$OBJECT`",
            },
          ],
          "name" => "conversion_general",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v2/conversion/general",
                  "segments" => [
                    {
                      "lit" => "v2",
                    },
                    {
                      "lit" => "conversion",
                    },
                    {
                      "lit" => "general",
                    },
                  ],
                  "parts" => [
                    "v2",
                    "conversion",
                    "general",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "from",
                        "orig" => "from",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "to",
                        "orig" => "to",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "from",
                      "to",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "conversion_status" => {
          "fields" => [
            {
              "name" => "status",
              "title" => "Status",
              "type" => "`$STRING`",
            },
          ],
          "name" => "conversion_status",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v2/conversion/status",
                  "segments" => [
                    {
                      "lit" => "v2",
                    },
                    {
                      "lit" => "conversion",
                    },
                    {
                      "lit" => "status",
                    },
                  ],
                  "parts" => [
                    "v2",
                    "conversion",
                    "status",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "date",
                        "orig" => "date",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "date",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "deeplink" => {
          "fields" => [
            {
              "name" => "deeplinks",
              "title" => "Deeplinks",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "found",
              "title" => "Found",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "isCouponing",
              "title" => "Is Couponing",
              "type" => "`$BOOLEAN`",
              "short" => "If your project has in parts couponing traffic, you must use this parameter to tell the API if the click is a couponing click or not.",
            },
            {
              "name" => "market",
              "title" => "Market",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "The market to query.",
            },
            {
              "name" => "placementId",
              "title" => "Placement Id",
              "type" => "`$STRING`",
              "short" => "Your own subID for your click-tracking.",
            },
            {
              "name" => "total",
              "title" => "Total",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "urls",
              "title" => "Urls",
              "type" => "`$ARRAY`",
              "req" => true,
              "short" => "An array of URLs",
            },
          ],
          "name" => "deeplink",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/v2/deeplink",
                  "segments" => [
                    {
                      "lit" => "v2",
                    },
                    {
                      "lit" => "deeplink",
                    },
                  ],
                  "parts" => [
                    "v2",
                    "deeplink",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.result`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "deeplink_merchant" => {
          "fields" => [
            {
              "name" => "deeplinkCount",
              "title" => "Deeplink Count",
              "type" => "`$INTEGER`",
              "short" => "Even when a merchant has no deeplinks, it might still have smartlinks.",
            },
            {
              "name" => "estimatedCpc",
              "title" => "Estimated Cpc",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "hasExternalHomepage",
              "title" => "Has External Homepage",
              "type" => "`$BOOLEAN`",
              "short" => "If the merchant accept homepage deeplinks.",
            },
            {
              "name" => "hasSmartlinkHomepage",
              "title" => "Has Smartlink Homepage",
              "type" => "`$BOOLEAN`",
              "short" => "If the merchant accept homepage smartlinks.",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
            {
              "name" => "isSmartlink",
              "title" => "Is Smartlink",
              "type" => "`$BOOLEAN`",
              "short" => "If the merchant has one or more smartlinks.",
            },
            {
              "name" => "logo",
              "title" => "Logo",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
            },
            {
              "name" => "trafficTypes",
              "title" => "Traffic Types",
              "type" => "`$ARRAY`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "deeplink_merchant",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v2/deeplink/merchant",
                  "segments" => [
                    {
                      "lit" => "v2",
                    },
                    {
                      "lit" => "deeplink",
                    },
                    {
                      "lit" => "merchant",
                    },
                  ],
                  "parts" => [
                    "v2",
                    "deeplink",
                    "merchant",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.merchants`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "has_homepage",
                        "orig" => "has_homepage",
                        "type" => "`$BOOLEAN`",
                        "kind" => "query",
                      },
                      {
                        "name" => "is_couponing",
                        "orig" => "is_couponing",
                        "type" => "`$BOOLEAN`",
                        "kind" => "query",
                      },
                      {
                        "name" => "is_smartlink",
                        "orig" => "is_smartlink",
                        "type" => "`$BOOLEAN`",
                        "kind" => "query",
                      },
                      {
                        "name" => "market",
                        "orig" => "market",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "has_homepage",
                      "is_couponing",
                      "is_smartlink",
                      "market",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "dnt" => {
          "fields" => [],
          "name" => "dnt",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v2/d",
                  "segments" => [
                    {
                      "lit" => "v2",
                    },
                    {
                      "lit" => "d",
                    },
                  ],
                  "parts" => [
                    "v2",
                    "d",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "callback_url",
                        "orig" => "callback_url",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "is_couponing",
                        "orig" => "is_couponing",
                        "type" => "`$BOOLEAN`",
                        "kind" => "query",
                      },
                      {
                        "name" => "market",
                        "orig" => "market",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "merchant_id",
                        "orig" => "merchant_id",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "placement_id",
                        "orig" => "placement_id",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "project_id",
                        "orig" => "project_id",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "url",
                        "orig" => "url",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "callback_url",
                      "is_couponing",
                      "market",
                      "merchant_id",
                      "placement_id",
                      "project_id",
                      "url",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "market" => {
          "fields" => [
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "market",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v2/markets",
                  "segments" => [
                    {
                      "lit" => "v2",
                    },
                    {
                      "lit" => "markets",
                    },
                  ],
                  "parts" => [
                    "v2",
                    "markets",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.markets`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "merchant" => {
          "fields" => [
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
            {
              "name" => "logo",
              "title" => "Logo",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
            },
            {
              "name" => "offerCount",
              "title" => "Offer Count",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "trafficTypes",
              "title" => "Traffic Types",
              "type" => "`$ARRAY`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "merchant",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v2/merchant",
                  "segments" => [
                    {
                      "lit" => "v2",
                    },
                    {
                      "lit" => "merchant",
                    },
                  ],
                  "parts" => [
                    "v2",
                    "merchant",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.merchants`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "is_couponing",
                        "orig" => "is_couponing",
                        "type" => "`$BOOLEAN`",
                        "kind" => "query",
                      },
                      {
                        "name" => "market",
                        "orig" => "market",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "is_couponing",
                      "market",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "offer" => {
          "fields" => [
            {
              "name" => "availability",
              "title" => "Availability",
              "type" => "`$STRING`",
            },
            {
              "name" => "brand",
              "title" => "Brand",
              "type" => "`$STRING`",
            },
            {
              "name" => "clickUrl",
              "title" => "Click Url",
              "type" => "`$STRING`",
            },
            {
              "name" => "description",
              "title" => "Description",
              "type" => "`$STRING`",
            },
            {
              "name" => "eer",
              "title" => "Eer",
              "type" => "`$STRING`",
            },
            {
              "name" => "estimatedCpc",
              "title" => "Estimated Cpc",
              "type" => "`$OBJECT`",
              "short" => "estimatedCPC means the gross revenue per click Yadore gets from its merchants, you have to use your revenue share to get your estimatedCPC.",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
            {
              "name" => "image",
              "title" => "Image",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "merchant",
              "title" => "Merchant",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "originalPrice",
              "title" => "Original Price",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "price",
              "title" => "Price",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "promoText",
              "title" => "Promo Text",
              "type" => "`$STRING`",
            },
            {
              "name" => "shippingPrice",
              "title" => "Shipping Price",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "shippingTime",
              "title" => "Shipping Time",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "thumbnail",
              "title" => "Thumbnail",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "title",
              "title" => "Title",
              "type" => "`$STRING`",
            },
            {
              "name" => "unitPrice",
              "title" => "Unit Price",
              "type" => "`$OBJECT`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "offer",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v2/offer",
                  "segments" => [
                    {
                      "lit" => "v2",
                    },
                    {
                      "lit" => "offer",
                    },
                  ],
                  "parts" => [
                    "v2",
                    "offer",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.offers`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "ean",
                        "orig" => "ean",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "is_couponing",
                        "orig" => "is_couponing",
                        "type" => "`$BOOLEAN`",
                        "kind" => "query",
                      },
                      {
                        "name" => "keyword",
                        "orig" => "keyword",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                      },
                      {
                        "name" => "market",
                        "orig" => "market",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "merchant_id",
                        "orig" => "merchant_id",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "offer_id",
                        "orig" => "offer_id",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "placement_id",
                        "orig" => "placement_id",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "precision",
                        "orig" => "precision",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "fuzzy",
                      },
                      {
                        "name" => "sort",
                        "orig" => "sort",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "rel_desc",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
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
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v2/offer/bulk",
                  "segments" => [
                    {
                      "lit" => "v2",
                    },
                    {
                      "lit" => "offer",
                    },
                    {
                      "lit" => "bulk",
                    },
                  ],
                  "parts" => [
                    "v2",
                    "offer",
                    "bulk",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.ean`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "ean",
                        "orig" => "ean",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                        "example" => "12345678,87654321",
                      },
                      {
                        "name" => "is_couponing",
                        "orig" => "is_couponing",
                        "type" => "`$BOOLEAN`",
                        "kind" => "query",
                      },
                      {
                        "name" => "market",
                        "orig" => "market",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "merchant_id",
                        "orig" => "merchant_id",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "placement_id",
                        "orig" => "placement_id",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {
                    "$action" => "bulk",
                    "exist" => [
                      "ean",
                      "is_couponing",
                      "market",
                      "merchant_id",
                      "placement_id",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "report_detail" => {
          "fields" => [
            {
              "name" => "clickId",
              "title" => "Click Id",
              "type" => "`$STRING`",
            },
            {
              "name" => "currency",
              "title" => "Currency",
              "type" => "`$STRING`",
            },
            {
              "name" => "date",
              "title" => "Date",
              "type" => "`$STRING`",
              "format" => "date-time",
            },
            {
              "name" => "market",
              "title" => "Market",
              "type" => "`$STRING`",
            },
            {
              "name" => "merchant",
              "title" => "Merchant",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "placementId",
              "title" => "Placement Id",
              "type" => "`$STRING`",
            },
            {
              "name" => "revenue",
              "title" => "Revenue",
              "type" => "`$NUMBER`",
            },
          ],
          "name" => "report_detail",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v2/report/detail",
                  "segments" => [
                    {
                      "lit" => "v2",
                    },
                    {
                      "lit" => "report",
                    },
                    {
                      "lit" => "detail",
                    },
                  ],
                  "parts" => [
                    "v2",
                    "report",
                    "detail",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.clicks`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "date",
                        "orig" => "date",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "market",
                        "orig" => "market",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "date",
                      "format",
                      "market",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "report_general" => {
          "fields" => [
            {
              "name" => "date",
              "title" => "Date",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "market",
              "title" => "Market",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "total",
              "title" => "Total",
              "type" => "`$OBJECT`",
            },
          ],
          "name" => "report_general",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v2/report/general",
                  "segments" => [
                    {
                      "lit" => "v2",
                    },
                    {
                      "lit" => "report",
                    },
                    {
                      "lit" => "general",
                    },
                  ],
                  "parts" => [
                    "v2",
                    "report",
                    "general",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "date",
                        "orig" => "date",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "date",
                      "format",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "report_modified" => {
          "fields" => [
            {
              "name" => "date",
              "title" => "Date",
              "type" => "`$STRING`",
              "format" => "date",
            },
            {
              "name" => "modifiedDate",
              "title" => "Modified Date",
              "type" => "`$STRING`",
              "format" => "date-time",
            },
          ],
          "name" => "report_modified",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v2/report/modified",
                  "segments" => [
                    {
                      "lit" => "v2",
                    },
                    {
                      "lit" => "report",
                    },
                    {
                      "lit" => "modified",
                    },
                  ],
                  "parts" => [
                    "v2",
                    "report",
                    "modified",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.market`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "from",
                        "orig" => "from",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "market",
                        "orig" => "market",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "to",
                        "orig" => "to",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "from",
                      "market",
                      "to",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "report_status" => {
          "fields" => [
            {
              "name" => "status",
              "title" => "Status",
              "type" => "`$STRING`",
            },
          ],
          "name" => "report_status",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v2/report/status",
                  "segments" => [
                    {
                      "lit" => "v2",
                    },
                    {
                      "lit" => "report",
                    },
                    {
                      "lit" => "status",
                    },
                  ],
                  "parts" => [
                    "v2",
                    "report",
                    "status",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "date",
                        "orig" => "date",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "date",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    YadorePublisherFeatures.make_feature(name)
  end
end
