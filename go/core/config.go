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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api.yadore.com/",
			"auth": map[string]any{
				"prefix": "",
				"name": "API-Key",
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
						"title": "Click Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "date",
						"title": "Date",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "market",
						"title": "Market",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "merchant",
						"title": "Merchant",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "placementId",
						"title": "Placement Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sales",
						"title": "Sales",
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
								"parts": []any{
									"v2",
									"conversion",
									"detail",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.clicks`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "market",
											"orig": "market",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"date",
										"format",
										"market",
									},
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
						"title": "Clicks",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "market",
						"title": "Market",
						"type": "`$STRING`",
						"short": "Two character form of a country, in all lower-case",
						"format": "ISO 3166 Alpha-2",
					},
					map[string]any{
						"name": "merchant",
						"title": "Merchant",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "sales",
						"title": "Sales",
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
								"parts": []any{
									"v2",
									"conversion",
									"detail",
									"merchant",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "from",
											"orig": "from",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "market",
											"orig": "market",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "to",
											"orig": "to",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
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
						"title": "Date",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "market",
						"title": "Market",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "total",
						"title": "Total",
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
								"parts": []any{
									"v2",
									"conversion",
									"general",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "from",
											"orig": "from",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "to",
											"orig": "to",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"format",
										"from",
										"to",
									},
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
						"title": "Status",
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
								"parts": []any{
									"v2",
									"conversion",
									"status",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"date",
									},
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
						"title": "Deeplinks",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "found",
						"title": "Found",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "isCouponing",
						"title": "Is Couponing",
						"type": "`$BOOLEAN`",
						"short": "If your project has in parts couponing traffic, you must use this parameter to tell the API if the click is a couponing click or not.",
					},
					map[string]any{
						"name": "market",
						"title": "Market",
						"type": "`$STRING`",
						"req": true,
						"short": "The market to query.",
					},
					map[string]any{
						"name": "placementId",
						"title": "Placement Id",
						"type": "`$STRING`",
						"short": "Your own subID for your click-tracking.",
					},
					map[string]any{
						"name": "total",
						"title": "Total",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "urls",
						"title": "Urls",
						"type": "`$ARRAY`",
						"req": true,
						"short": "An array of URLs",
					},
				},
				"name": "deeplink",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"v2",
									"deeplink",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.result`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Deeplink Count",
						"type": "`$INTEGER`",
						"short": "Even when a merchant has no deeplinks, it might still have smartlinks.",
					},
					map[string]any{
						"name": "estimatedCpc",
						"title": "Estimated Cpc",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "hasExternalHomepage",
						"title": "Has External Homepage",
						"type": "`$BOOLEAN`",
						"short": "If the merchant accept homepage deeplinks.",
					},
					map[string]any{
						"name": "hasSmartlinkHomepage",
						"title": "Has Smartlink Homepage",
						"type": "`$BOOLEAN`",
						"short": "If the merchant accept homepage smartlinks.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "isSmartlink",
						"title": "Is Smartlink",
						"type": "`$BOOLEAN`",
						"short": "If the merchant has one or more smartlinks.",
					},
					map[string]any{
						"name": "logo",
						"title": "Logo",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "trafficTypes",
						"title": "Traffic Types",
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
								"parts": []any{
									"v2",
									"deeplink",
									"merchant",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.merchants`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "has_homepage",
											"orig": "has_homepage",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "is_couponing",
											"orig": "is_couponing",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "is_smartlink",
											"orig": "is_smartlink",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "market",
											"orig": "market",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
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
								"parts": []any{
									"v2",
									"d",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "callback_url",
											"orig": "callback_url",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "is_couponing",
											"orig": "is_couponing",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "market",
											"orig": "market",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "merchant_id",
											"orig": "merchant_id",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "placement_id",
											"orig": "placement_id",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "project_id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "url",
											"orig": "url",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
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
						"title": "Id",
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
								"parts": []any{
									"v2",
									"markets",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.markets`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "logo",
						"title": "Logo",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "offerCount",
						"title": "Offer Count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "trafficTypes",
						"title": "Traffic Types",
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
								"parts": []any{
									"v2",
									"merchant",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.merchants`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "is_couponing",
											"orig": "is_couponing",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "market",
											"orig": "market",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"is_couponing",
										"market",
									},
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
						"title": "Availability",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "brand",
						"title": "Brand",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "clickUrl",
						"title": "Click Url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "eer",
						"title": "Eer",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "estimatedCpc",
						"title": "Estimated Cpc",
						"type": "`$OBJECT`",
						"short": "estimatedCPC means the gross revenue per click Yadore gets from its merchants, you have to use your revenue share to get your estimatedCPC.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "image",
						"title": "Image",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "merchant",
						"title": "Merchant",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "originalPrice",
						"title": "Original Price",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "price",
						"title": "Price",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "promoText",
						"title": "Promo Text",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "shippingPrice",
						"title": "Shipping Price",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "shippingTime",
						"title": "Shipping Time",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "thumbnail",
						"title": "Thumbnail",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "unitPrice",
						"title": "Unit Price",
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
								"parts": []any{
									"v2",
									"offer",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.offers`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "ean",
											"orig": "ean",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "is_couponing",
											"orig": "is_couponing",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "keyword",
											"orig": "keyword",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "market",
											"orig": "market",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "merchant_id",
											"orig": "merchant_id",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "offer_id",
											"orig": "offer_id",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "placement_id",
											"orig": "placement_id",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "precision",
											"orig": "precision",
											"type": "`$STRING`",
											"kind": "query",
											"example": "fuzzy",
										},
										map[string]any{
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
											"kind": "query",
											"example": "rel_desc",
										},
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
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"v2",
									"offer",
									"bulk",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.ean`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "ean",
											"orig": "ean",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "12345678,87654321",
										},
										map[string]any{
											"name": "is_couponing",
											"orig": "is_couponing",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "market",
											"orig": "market",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "merchant_id",
											"orig": "merchant_id",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "placement_id",
											"orig": "placement_id",
											"type": "`$STRING`",
											"kind": "query",
										},
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
						"title": "Click Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "currency",
						"title": "Currency",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "date",
						"title": "Date",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "market",
						"title": "Market",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "merchant",
						"title": "Merchant",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "placementId",
						"title": "Placement Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "revenue",
						"title": "Revenue",
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
								"parts": []any{
									"v2",
									"report",
									"detail",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.clicks`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "market",
											"orig": "market",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"date",
										"format",
										"market",
									},
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
						"title": "Date",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "market",
						"title": "Market",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "total",
						"title": "Total",
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
								"parts": []any{
									"v2",
									"report",
									"general",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"date",
										"format",
									},
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
						"name": "date",
						"title": "Date",
						"type": "`$STRING`",
						"format": "date",
					},
					map[string]any{
						"name": "modifiedDate",
						"title": "Modified Date",
						"type": "`$STRING`",
						"format": "date-time",
					},
				},
				"name": "report_modified",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"v2",
									"report",
									"modified",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.market`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "from",
											"orig": "from",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "market",
											"orig": "market",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "to",
											"orig": "to",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"from",
										"market",
										"to",
									},
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
						"title": "Status",
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
								"parts": []any{
									"v2",
									"report",
									"status",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"date",
									},
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
