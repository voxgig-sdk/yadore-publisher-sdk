<?php
declare(strict_types=1);

// YadorePublisher SDK configuration

class YadorePublisherConfig
{
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
              'active' => true,
              'name' => 'click_id',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'date',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'market',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'merchant',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'placement_id',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'sale',
              'req' => false,
              'type' => '`$NUMBER`',
              'index$' => 5,
            ],
          ],
          'name' => 'conversion_detail',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'date',
                        'orig' => 'date',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'market',
                        'orig' => 'market',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
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
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'conversion_detail_merchant' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'click',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'market',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'merchant',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'sale',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 3,
            ],
          ],
          'name' => 'conversion_detail_merchant',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'from',
                        'orig' => 'from',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'market',
                        'orig' => 'market',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'to',
                        'orig' => 'to',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'conversion_general' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'date',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'market',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'total',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 2,
            ],
          ],
          'name' => 'conversion_general',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'from',
                        'orig' => 'from',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'to',
                        'orig' => 'to',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'conversion_status' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'status',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
          ],
          'name' => 'conversion_status',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'date',
                        'orig' => 'date',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'deeplink' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'is_couponing',
              'req' => false,
              'type' => '`$BOOLEAN`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'market',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'placement_id',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'result',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'url',
              'req' => true,
              'type' => '`$ARRAY`',
              'index$' => 4,
            ],
          ],
          'name' => 'deeplink',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'active' => true,
                  'args' => [],
                  'method' => 'POST',
                  'orig' => '/v2/deeplink',
                  'parts' => [
                    'v2',
                    'deeplink',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'create',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'deeplink_merchant' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'deeplink_count',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'estimated_cpc',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'has_external_homepage',
              'req' => false,
              'type' => '`$BOOLEAN`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'has_smartlink_homepage',
              'req' => false,
              'type' => '`$BOOLEAN`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'id',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'is_smartlink',
              'req' => false,
              'type' => '`$BOOLEAN`',
              'index$' => 5,
            ],
            [
              'active' => true,
              'name' => 'logo',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 6,
            ],
            [
              'active' => true,
              'name' => 'name',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 7,
            ],
            [
              'active' => true,
              'name' => 'traffic_type',
              'req' => false,
              'type' => '`$ARRAY`',
              'index$' => 8,
            ],
          ],
          'name' => 'deeplink_merchant',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'has_homepage',
                        'orig' => 'has_homepage',
                        'reqd' => false,
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'is_couponing',
                        'orig' => 'is_couponing',
                        'reqd' => false,
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'is_smartlink',
                        'orig' => 'is_smartlink',
                        'reqd' => false,
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'market',
                        'orig' => 'market',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
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
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
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
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'callback_url',
                        'orig' => 'callback_url',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'is_couponing',
                        'orig' => 'is_couponing',
                        'reqd' => false,
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'market',
                        'orig' => 'market',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'merchant_id',
                        'orig' => 'merchant_id',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'placement_id',
                        'orig' => 'placement_id',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'url',
                        'orig' => 'url',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'market' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'id',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
          ],
          'name' => 'market',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [],
                  'method' => 'GET',
                  'orig' => '/v2/markets',
                  'parts' => [
                    'v2',
                    'markets',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'merchant' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'id',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'logo',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'name',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'offer_count',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'traffic_type',
              'req' => false,
              'type' => '`$ARRAY`',
              'index$' => 4,
            ],
          ],
          'name' => 'merchant',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'is_couponing',
                        'orig' => 'is_couponing',
                        'reqd' => false,
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'market',
                        'orig' => 'market',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
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
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'offer' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'availability',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'brand',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'click_url',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'description',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'ean',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'eer',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 5,
            ],
            [
              'active' => true,
              'name' => 'estimated_cpc',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 6,
            ],
            [
              'active' => true,
              'name' => 'id',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 7,
            ],
            [
              'active' => true,
              'name' => 'image',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 8,
            ],
            [
              'active' => true,
              'name' => 'merchant',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 9,
            ],
            [
              'active' => true,
              'name' => 'original_price',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 10,
            ],
            [
              'active' => true,
              'name' => 'price',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 11,
            ],
            [
              'active' => true,
              'name' => 'promo_text',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 12,
            ],
            [
              'active' => true,
              'name' => 'shipping_price',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 13,
            ],
            [
              'active' => true,
              'name' => 'shipping_time',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 14,
            ],
            [
              'active' => true,
              'name' => 'thumbnail',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 15,
            ],
            [
              'active' => true,
              'name' => 'title',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 16,
            ],
            [
              'active' => true,
              'name' => 'unit_price',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 17,
            ],
          ],
          'name' => 'offer',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'ean',
                        'orig' => 'ean',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'is_couponing',
                        'orig' => 'is_couponing',
                        'reqd' => false,
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'keyword',
                        'orig' => 'keyword',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'market',
                        'orig' => 'market',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'merchant_id',
                        'orig' => 'merchant_id',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'offer_id',
                        'orig' => 'offer_id',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'placement_id',
                        'orig' => 'placement_id',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => 'fuzzy',
                        'kind' => 'query',
                        'name' => 'precision',
                        'orig' => 'precision',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => 'rel_desc',
                        'kind' => 'query',
                        'name' => 'sort',
                        'orig' => 'sort',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
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
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => '12345678,87654321',
                        'kind' => 'query',
                        'name' => 'ean',
                        'orig' => 'ean',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'is_couponing',
                        'orig' => 'is_couponing',
                        'reqd' => false,
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'market',
                        'orig' => 'market',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'merchant_id',
                        'orig' => 'merchant_id',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'placement_id',
                        'orig' => 'placement_id',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
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
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'report_detail' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'click_id',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'currency',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'date',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'market',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'merchant',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'placement_id',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 5,
            ],
            [
              'active' => true,
              'name' => 'revenue',
              'req' => false,
              'type' => '`$NUMBER`',
              'index$' => 6,
            ],
          ],
          'name' => 'report_detail',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'date',
                        'orig' => 'date',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'market',
                        'orig' => 'market',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
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
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'report_general' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'date',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'market',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'total',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 2,
            ],
          ],
          'name' => 'report_general',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'date',
                        'orig' => 'date',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'report_modified' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'market',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 0,
            ],
          ],
          'name' => 'report_modified',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'from',
                        'orig' => 'from',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'market',
                        'orig' => 'market',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'to',
                        'orig' => 'to',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
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
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'report_status' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'status',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
          ],
          'name' => 'report_status',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'date',
                        'orig' => 'date',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
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
