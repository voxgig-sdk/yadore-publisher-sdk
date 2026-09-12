package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "YadorePublisher",
			"slug": "yadore-publisher",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://api.yadore.com/",
			"auth": map[string]any{
				"prefix": "",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"conversion_detail": map[string]any{},
				"conversion_detail_merchant": map[string]any{},
				"conversion_general": map[string]any{},
				"conversion_status": map[string]any{},
				"deeplink": map[string]any{},
				"deeplink_merchant": map[string]any{},
				"dnt": map[string]any{},
				"market": map[string]any{},
				"merchant": map[string]any{},
				"offer": map[string]any{},
				"report_detail": map[string]any{},
				"report_general": map[string]any{},
				"report_modified": map[string]any{},
				"report_status": map[string]any{},
			},
		},
		"entity": map[string]any{
			"conversion_detail": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "clickId",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "market",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "merchant",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "placementId",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sales",
						"type": "`$NUMBER`",
					},
				},
				"name": "conversion_detail",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "date",
											"orig": "date",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "format",
											"orig": "format",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "market",
											"orig": "market",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v2/conversion/detail",
								"segments": []any{
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "conversion",
									},
									map[string]any{
										"lit": "detail",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"date",
										"format",
										"market",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.clicks`",
								},
								"parts": []any{
									"v2",
									"conversion",
									"detail",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"conversion_detail_merchant": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "clicks",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "ISO 3166 Alpha-2",
						"name": "market",
						"short": "Two character form of a country, in all lower-case",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "merchant",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "sales",
						"type": "`$INTEGER`",
					},
				},
				"name": "conversion_detail_merchant",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "format",
											"orig": "format",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "from",
											"orig": "from",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "market",
											"orig": "market",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "to",
											"orig": "to",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v2/conversion/detail/merchant",
								"segments": []any{
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "conversion",
									},
									map[string]any{
										"lit": "detail",
									},
									map[string]any{
										"lit": "merchant",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"format",
										"from",
										"market",
										"to",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"v2",
									"conversion",
									"detail",
									"merchant",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"conversion_general": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "date",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "market",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "total",
						"type": "`$OBJECT`",
					},
				},
				"name": "conversion_general",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "format",
											"orig": "format",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "from",
											"orig": "from",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "to",
											"orig": "to",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v2/conversion/general",
								"segments": []any{
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "conversion",
									},
									map[string]any{
										"lit": "general",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"format",
										"from",
										"to",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"v2",
									"conversion",
									"general",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"conversion_status": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "status",
						"type": "`$STRING`",
					},
				},
				"name": "conversion_status",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "date",
											"orig": "date",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v2/conversion/status",
								"segments": []any{
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "conversion",
									},
									map[string]any{
										"lit": "status",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"date",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"v2",
									"conversion",
									"status",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"deeplink": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "deeplinks",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "found",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "isCouponing",
						"short": "If your project has in parts couponing traffic, you must use this parameter to tell the API if the click is a couponing click or not.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "market",
						"req": true,
						"short": "The market to query.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "placementId",
						"short": "Your own subID for your click-tracking.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "total",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "urls",
						"req": true,
						"short": "An array of URLs",
						"type": "`$ARRAY`",
					},
				},
				"name": "deeplink",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/v2/deeplink",
								"segments": []any{
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "deeplink",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.result`",
								},
								"parts": []any{
									"v2",
									"deeplink",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"deeplink_merchant": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "deeplinkCount",
						"short": "Even when a merchant has no deeplinks, it might still have smartlinks.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "estimatedCpc",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "hasExternalHomepage",
						"short": "If the merchant accept homepage deeplinks.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "hasSmartlinkHomepage",
						"short": "If the merchant accept homepage smartlinks.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "isSmartlink",
						"short": "If the merchant has one or more smartlinks.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "logo",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "trafficTypes",
						"type": "`$ARRAY`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "deeplink_merchant",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "has_homepage",
											"orig": "has_homepage",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "is_couponing",
											"orig": "is_couponing",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "is_smartlink",
											"orig": "is_smartlink",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "market",
											"orig": "market",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v2/deeplink/merchant",
								"segments": []any{
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "deeplink",
									},
									map[string]any{
										"lit": "merchant",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"has_homepage",
										"is_couponing",
										"is_smartlink",
										"market",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.merchants`",
								},
								"parts": []any{
									"v2",
									"deeplink",
									"merchant",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"dnt": map[string]any{
				"fields": []any{},
				"name": "dnt",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "callback_url",
											"orig": "callback_url",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "is_couponing",
											"orig": "is_couponing",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "market",
											"orig": "market",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "merchant_id",
											"orig": "merchant_id",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "placement_id",
											"orig": "placement_id",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "project_id",
											"orig": "project_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "url",
											"orig": "url",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v2/d",
								"segments": []any{
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "d",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"callback_url",
										"is_couponing",
										"market",
										"merchant_id",
										"placement_id",
										"project_id",
										"url",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"v2",
									"d",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"market": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "market",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/v2/markets",
								"segments": []any{
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "markets",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.markets`",
								},
								"parts": []any{
									"v2",
									"markets",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"merchant": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "logo",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "offerCount",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "trafficTypes",
						"type": "`$ARRAY`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "merchant",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "is_couponing",
											"orig": "is_couponing",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "market",
											"orig": "market",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v2/merchant",
								"segments": []any{
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "merchant",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"is_couponing",
										"market",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.merchants`",
								},
								"parts": []any{
									"v2",
									"merchant",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"offer": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "availability",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "brand",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "clickUrl",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "eer",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "estimatedCpc",
						"short": "estimatedCPC means the gross revenue per click Yadore gets from its merchants, you have to use your revenue share to get your estimatedCPC.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "image",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "merchant",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "offers",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "originalPrice",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "price",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "promoText",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "shippingPrice",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "shippingTime",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "thumbnail",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "unitPrice",
						"type": "`$OBJECT`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "offer",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "ean",
											"orig": "ean",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "is_couponing",
											"orig": "is_couponing",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "keyword",
											"orig": "keyword",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "market",
											"orig": "market",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "merchant_id",
											"orig": "merchant_id",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "offer_id",
											"orig": "offer_id",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "placement_id",
											"orig": "placement_id",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "fuzzy",
											"kind": "query",
											"name": "precision",
											"orig": "precision",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "rel_desc",
											"kind": "query",
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v2/offer",
								"segments": []any{
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "offer",
									},
								},
								"select": map[string]any{
									"exist": []any{
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
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.offers`",
								},
								"parts": []any{
									"v2",
									"offer",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "12345678,87654321",
											"kind": "query",
											"name": "ean",
											"orig": "ean",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "is_couponing",
											"orig": "is_couponing",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "market",
											"orig": "market",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "merchant_id",
											"orig": "merchant_id",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "placement_id",
											"orig": "placement_id",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v2/offer/bulk",
								"segments": []any{
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "offer",
									},
									map[string]any{
										"lit": "bulk",
									},
								},
								"select": map[string]any{
									"$action": "bulk",
									"exist": []any{
										"ean",
										"is_couponing",
										"market",
										"merchant_id",
										"placement_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.ean`",
								},
								"parts": []any{
									"v2",
									"offer",
									"bulk",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"report_detail": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "clickId",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "currency",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "market",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "merchant",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "placementId",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "revenue",
						"type": "`$NUMBER`",
					},
				},
				"name": "report_detail",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "date",
											"orig": "date",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "format",
											"orig": "format",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "market",
											"orig": "market",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v2/report/detail",
								"segments": []any{
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "report",
									},
									map[string]any{
										"lit": "detail",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"date",
										"format",
										"market",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.clicks`",
								},
								"parts": []any{
									"v2",
									"report",
									"detail",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"report_general": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "date",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "market",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "total",
						"type": "`$OBJECT`",
					},
				},
				"name": "report_general",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "date",
											"orig": "date",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "format",
											"orig": "format",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v2/report/general",
								"segments": []any{
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "report",
									},
									map[string]any{
										"lit": "general",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"date",
										"format",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"v2",
									"report",
									"general",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"report_modified": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "date",
						"name": "date",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "modifiedDate",
						"type": "`$STRING`",
					},
				},
				"name": "report_modified",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "from",
											"orig": "from",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "market",
											"orig": "market",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "to",
											"orig": "to",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v2/report/modified",
								"segments": []any{
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "report",
									},
									map[string]any{
										"lit": "modified",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"from",
										"market",
										"to",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.market`",
								},
								"parts": []any{
									"v2",
									"report",
									"modified",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"report_status": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "status",
						"type": "`$STRING`",
					},
				},
				"name": "report_status",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "date",
											"orig": "date",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v2/report/status",
								"segments": []any{
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "report",
									},
									map[string]any{
										"lit": "status",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"date",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"v2",
									"report",
									"status",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
