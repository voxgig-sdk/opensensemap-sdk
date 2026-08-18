<?php
declare(strict_types=1);

// Opensensemap SDK configuration

class OpensensemapConfig
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
                "name" => "Opensensemap",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://api.opensensemap.org",
                "auth" => [
                    "prefix" => "Bearer",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "box" => [],
                    "measurement" => [],
                    "sensor" => [],
                    "statistic" => [],
                    "user" => [],
                ],
            ],
            "entity" => [
        'box' => [
          'fields' => [
            [
              'name' => 'createdAt',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'description',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'exposure',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$STRING`',
                ],
                'update' => [
                  'req' => true,
                  'type' => '`$STRING`',
                ],
              ],
              'type' => '`$STRING`',
            ],
            [
              'name' => 'grouptag',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'location',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$OBJECT`',
                ],
                'update' => [
                  'req' => true,
                  'type' => '`$OBJECT`',
                ],
              ],
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'model',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$STRING`',
                ],
                'update' => [
                  'req' => true,
                  'type' => '`$STRING`',
                ],
              ],
              'type' => '`$STRING`',
            ],
            [
              'name' => 'sensors',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'updatedAt',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'value',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'box',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/boxes',
                  'parts' => [
                    'boxes',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'box_id',
                        'orig' => 'box_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'sensor_id',
                        'orig' => 'sensor_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'example' => 'json',
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'from_date',
                        'orig' => 'from_date',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'to_date',
                        'orig' => 'to_date',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/boxes/{boxId}/{sensorId}',
                  'parts' => [
                    'boxes',
                    '{box_id}',
                    '{sensor_id}',
                  ],
                  'rename' => [
                    'param' => [
                      'boxId' => 'box_id',
                      'sensorId' => 'sensor_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'box_id',
                      'format',
                      'from_date',
                      'sensor_id',
                      'to_date',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'bbox',
                        'orig' => 'bbox',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'exposure',
                        'orig' => 'exposure',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'json',
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'grouptag',
                        'orig' => 'grouptag',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/boxes',
                  'parts' => [
                    'boxes',
                  ],
                  'select' => [
                    'exist' => [
                      'bbox',
                      'exposure',
                      'format',
                      'grouptag',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
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
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'box_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'example' => 'json',
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/boxes/{boxId}',
                  'parts' => [
                    'boxes',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'boxId' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'format',
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'box_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/boxes/{boxId}',
                  'parts' => [
                    'boxes',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'boxId' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'update' => [
              'input' => 'data',
              'name' => 'update',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'box_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'PUT',
                  'orig' => '/boxes/{boxId}',
                  'parts' => [
                    'boxes',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'boxId' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
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
            'ancestors' => [
              [
                'box',
              ],
            ],
          ],
        ],
        'measurement' => [
          'fields' => [],
          'name' => 'measurement',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'box_id',
                        'orig' => 'box_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/boxes/{boxId}/data',
                  'parts' => [
                    'boxes',
                    '{box_id}',
                    'data',
                  ],
                  'rename' => [
                    'param' => [
                      'boxId' => 'box_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'box_id',
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
            'ancestors' => [
              [
                'box',
              ],
            ],
          ],
        ],
        'sensor' => [
          'fields' => [
            [
              'name' => 'icon',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'lastMeasurement',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'sensorType',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'title',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'unit',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'sensor',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'box_id',
                        'orig' => 'box_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/boxes/{boxId}/sensors',
                  'parts' => [
                    'boxes',
                    '{box_id}',
                    'sensors',
                  ],
                  'rename' => [
                    'param' => [
                      'boxId' => 'box_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'box_id',
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
            'ancestors' => [
              [
                'box',
              ],
            ],
          ],
        ],
        'statistic' => [
          'fields' => [
            [
              'name' => 'count',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'max',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'mean',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'median',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'min',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'sum',
              'type' => '`$NUMBER`',
            ],
          ],
          'name' => 'statistic',
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
                        'name' => 'box_id',
                        'orig' => 'box_id',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'from_date',
                        'orig' => 'from_date',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'sensor_id',
                        'orig' => 'sensor_id',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'to_date',
                        'orig' => 'to_date',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/statistics/descriptive',
                  'parts' => [
                    'statistics',
                    'descriptive',
                  ],
                  'select' => [
                    '$action' => 'descriptive',
                    'exist' => [
                      'box_id',
                      'from_date',
                      'sensor_id',
                      'to_date',
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
        'user' => [
          'fields' => [
            [
              'name' => 'boxes',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'createdAt',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'email',
              'op' => [
                'create' => [
                  'type' => '`$STRING`',
                ],
                'list' => [
                  'type' => '`$STRING`',
                ],
              ],
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'op' => [
                'create' => [
                  'type' => '`$STRING`',
                ],
                'list' => [
                  'type' => '`$STRING`',
                ],
              ],
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'password',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'role',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'user',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/users/register',
                  'parts' => [
                    'users',
                    'register',
                  ],
                  'select' => [
                    '$action' => 'register',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/users/sign-in',
                  'parts' => [
                    'users',
                    'sign-in',
                  ],
                  'select' => [
                    '$action' => 'sign_in',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.user`',
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/users/me',
                  'parts' => [
                    'users',
                    'me',
                  ],
                  'select' => [
                    '$action' => 'me',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.boxes`',
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
        return OpensensemapFeatures::make_feature($name);
    }
}
