<?php
declare(strict_types=1);

// YadorePublisher SDK configuration

class YadorePublisherConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "YadorePublisher",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://api.yadore.com/",
                "auth" => [
                    "prefix" => "",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "conversion_detail" => [],
                    "conversion_detail_merchant" => [],
                    "conversion_general" => [],
                    "conversion_status" => [],
                    "deeplink" => [],
                    "deeplink_merchant" => [],
                    "dnt" => [],
                    "market" => [],
                    "merchant" => [],
                    "offer" => [],
                    "report_detail" => [],
                    "report_general" => [],
                    "report_modified" => [],
                    "report_status" => [],
                ],
            ],
            "entity" => [
        'conversion_detail' => [
          'fields' => [
            [
              'name' => 'clickId',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'date',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'market',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'merchant',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'placementId',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'sales',
              'type' => '`$NUMBER`',
            ],
          ],
          'name' => 'conversion_detail',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'date',
                        'orig' => 'date',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'market',
                        'orig' => 'market',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v2/conversion/detail',
                  'parts' => [
                    'v2',
                    'conversion',
                    'detail',
                  ],
                  'select' => [
                    'exist' => [
                      'date',
                      'format',
                      'market',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.clicks`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'conversion_detail_merchant' => [
          'fields' => [
            [
              'name' => 'clicks',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'market',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'merchant',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'sales',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'conversion_detail_merchant',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'from',
                        'orig' => 'from',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'market',
                        'orig' => 'market',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'to',
                        'orig' => 'to',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v2/conversion/detail/merchant',
                  'parts' => [
                    'v2',
                    'conversion',
                    'detail',
                    'merchant',
                  ],
                  'select' => [
                    'exist' => [
                      'format',
                      'from',
                      'market',
                      'to',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'conversion_general' => [
          'fields' => [
            [
              'name' => 'date',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'market',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'total',
              'type' => '`$OBJECT`',
            ],
          ],
          'name' => 'conversion_general',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'from',
                        'orig' => 'from',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'to',
                        'orig' => 'to',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v2/conversion/general',
                  'parts' => [
                    'v2',
                    'conversion',
                    'general',
                  ],
                  'select' => [
                    'exist' => [
                      'format',
                      'from',
                      'to',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'conversion_status' => [
          'fields' => [
            [
              'name' => 'status',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'conversion_status',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'date',
                        'orig' => 'date',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v2/conversion/status',
                  'parts' => [
                    'v2',
                    'conversion',
                    'status',
                  ],
                  'select' => [
                    'exist' => [
                      'date',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'deeplink' => [
          'fields' => [
            [
              'name' => 'deeplinks',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'found',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'isCouponing',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'market',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'placementId',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'total',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'urls',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'deeplink',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/v2/deeplink',
                  'parts' => [
                    'v2',
                    'deeplink',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.result`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'deeplink_merchant' => [
          'fields' => [
            [
              'name' => 'deeplinkCount',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'estimatedCpc',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'hasExternalHomepage',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'hasSmartlinkHomepage',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'isSmartlink',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'logo',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'trafficTypes',
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'deeplink_merchant',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'has_homepage',
                        'orig' => 'has_homepage',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'is_couponing',
                        'orig' => 'is_couponing',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'is_smartlink',
                        'orig' => 'is_smartlink',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'market',
                        'orig' => 'market',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v2/deeplink/merchant',
                  'parts' => [
                    'v2',
                    'deeplink',
                    'merchant',
                  ],
                  'select' => [
                    'exist' => [
                      'has_homepage',
                      'is_couponing',
                      'is_smartlink',
                      'market',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.merchants`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'dnt' => [
          'fields' => [],
          'name' => 'dnt',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'callback_url',
                        'orig' => 'callback_url',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'is_couponing',
                        'orig' => 'is_couponing',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'market',
                        'orig' => 'market',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'merchant_id',
                        'orig' => 'merchant_id',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'placement_id',
                        'orig' => 'placement_id',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'url',
                        'orig' => 'url',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v2/d',
                  'parts' => [
                    'v2',
                    'd',
                  ],
                  'select' => [
                    'exist' => [
                      'callback_url',
                      'is_couponing',
                      'market',
                      'merchant_id',
                      'placement_id',
                      'project_id',
                      'url',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'market' => [
          'fields' => [
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'market',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v2/markets',
                  'parts' => [
                    'v2',
                    'markets',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.markets`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'merchant' => [
          'fields' => [
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'logo',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'offerCount',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'trafficTypes',
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'merchant',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'is_couponing',
                        'orig' => 'is_couponing',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'market',
                        'orig' => 'market',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v2/merchant',
                  'parts' => [
                    'v2',
                    'merchant',
                  ],
                  'select' => [
                    'exist' => [
                      'is_couponing',
                      'market',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.merchants`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'offer' => [
          'fields' => [
            [
              'name' => 'availability',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'brand',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'clickUrl',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'count',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'description',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'eer',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'estimatedCpc',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'image',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'merchant',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'offers',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'originalPrice',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'price',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'promoText',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'shippingPrice',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'shippingTime',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'thumbnail',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'title',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'unitPrice',
              'type' => '`$OBJECT`',
            ],
          ],
          'name' => 'offer',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'ean',
                        'orig' => 'ean',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'is_couponing',
                        'orig' => 'is_couponing',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'keyword',
                        'orig' => 'keyword',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'market',
                        'orig' => 'market',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'merchant_id',
                        'orig' => 'merchant_id',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'offer_id',
                        'orig' => 'offer_id',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'placement_id',
                        'orig' => 'placement_id',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'fuzzy',
                        'kind' => 'query',
                        'name' => 'precision',
                        'orig' => 'precision',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'rel_desc',
                        'kind' => 'query',
                        'name' => 'sort',
                        'orig' => 'sort',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v2/offer',
                  'parts' => [
                    'v2',
                    'offer',
                  ],
                  'select' => [
                    'exist' => [
                      'ean',
                      'is_couponing',
                      'keyword',
                      'limit',
                      'market',
                      'merchant_id',
                      'offer_id',
                      'placement_id',
                      'precision',
                      'sort',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.offers`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '12345678,87654321',
                        'kind' => 'query',
                        'name' => 'ean',
                        'orig' => 'ean',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'is_couponing',
                        'orig' => 'is_couponing',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'market',
                        'orig' => 'market',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'merchant_id',
                        'orig' => 'merchant_id',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'placement_id',
                        'orig' => 'placement_id',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v2/offer/bulk',
                  'parts' => [
                    'v2',
                    'offer',
                    'bulk',
                  ],
                  'select' => [
                    '$action' => 'bulk',
                    'exist' => [
                      'ean',
                      'is_couponing',
                      'market',
                      'merchant_id',
                      'placement_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.ean`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'report_detail' => [
          'fields' => [
            [
              'name' => 'clickId',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'currency',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'date',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'market',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'merchant',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'placementId',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'revenue',
              'type' => '`$NUMBER`',
            ],
          ],
          'name' => 'report_detail',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'date',
                        'orig' => 'date',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'market',
                        'orig' => 'market',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v2/report/detail',
                  'parts' => [
                    'v2',
                    'report',
                    'detail',
                  ],
                  'select' => [
                    'exist' => [
                      'date',
                      'format',
                      'market',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.clicks`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'report_general' => [
          'fields' => [
            [
              'name' => 'date',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'market',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'total',
              'type' => '`$OBJECT`',
            ],
          ],
          'name' => 'report_general',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'date',
                        'orig' => 'date',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v2/report/general',
                  'parts' => [
                    'v2',
                    'report',
                    'general',
                  ],
                  'select' => [
                    'exist' => [
                      'date',
                      'format',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'report_modified' => [
          'fields' => [
            [
              'name' => 'date',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'modifiedDate',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'report_modified',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'from',
                        'orig' => 'from',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'market',
                        'orig' => 'market',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'to',
                        'orig' => 'to',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v2/report/modified',
                  'parts' => [
                    'v2',
                    'report',
                    'modified',
                  ],
                  'select' => [
                    'exist' => [
                      'from',
                      'market',
                      'to',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.market`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'report_status' => [
          'fields' => [
            [
              'name' => 'status',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'report_status',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'date',
                        'orig' => 'date',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v2/report/status',
                  'parts' => [
                    'v2',
                    'report',
                    'status',
                  ],
                  'select' => [
                    'exist' => [
                      'date',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return YadorePublisherFeatures::make_feature($name);
    }
}
