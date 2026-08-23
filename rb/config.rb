# Opensensemap SDK configuration

module OpensensemapConfig
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
        "name" => "Opensensemap",
        "slug" => "opensensemap",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://api.opensensemap.org",
        "auth" => {
          "prefix" => "Bearer",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "box" => {},
          "measurement" => {},
          "sensor" => {},
          "statistic" => {},
          "user" => {},
        },
      },
      "entity" => {
        "box" => {
          "fields" => [
            {
              "name" => "createdAt",
              "short" => "Creation timestamp",
              "type" => "`$STRING`",
            },
            {
              "name" => "description",
              "short" => "Description of the senseBox",
              "type" => "`$STRING`",
            },
            {
              "name" => "exposure",
              "op" => {
                "create" => {
                  "req" => true,
                  "type" => "`$STRING`",
                },
                "update" => {
                  "req" => true,
                  "type" => "`$STRING`",
                },
              },
              "short" => "Exposure type of the senseBox",
              "type" => "`$STRING`",
            },
            {
              "name" => "grouptag",
              "short" => "Group tag for categorization",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "short" => "Unique identifier for the senseBox",
              "type" => "`$STRING`",
            },
            {
              "name" => "location",
              "op" => {
                "create" => {
                  "req" => true,
                  "type" => "`$OBJECT`",
                },
                "update" => {
                  "req" => true,
                  "type" => "`$OBJECT`",
                },
              },
              "type" => "`$OBJECT`",
            },
            {
              "name" => "model",
              "short" => "Model of the senseBox",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "op" => {
                "create" => {
                  "req" => true,
                  "type" => "`$STRING`",
                },
                "update" => {
                  "req" => true,
                  "type" => "`$STRING`",
                },
              },
              "short" => "Name of the senseBox",
              "type" => "`$STRING`",
            },
            {
              "name" => "sensors",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "updatedAt",
              "short" => "Last update timestamp",
              "type" => "`$STRING`",
            },
            {
              "name" => "value",
              "short" => "Measurement value",
              "type" => "`$STRING`",
            },
          ],
          "name" => "box",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/boxes",
                  "parts" => [
                    "boxes",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "box_id",
                        "orig" => "box_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "param",
                        "name" => "sensor_id",
                        "orig" => "sensor_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "example" => "json",
                        "kind" => "query",
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "from_date",
                        "orig" => "from_date",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "to_date",
                        "orig" => "to_date",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/boxes/{boxId}/{sensorId}",
                  "parts" => [
                    "boxes",
                    "{box_id}",
                    "{sensor_id}",
                  ],
                  "rename" => {
                    "param" => {
                      "boxId" => "box_id",
                      "sensorId" => "sensor_id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "box_id",
                      "format",
                      "from_date",
                      "sensor_id",
                      "to_date",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "bbox",
                        "orig" => "bbox",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "exposure",
                        "orig" => "exposure",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "json",
                        "kind" => "query",
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "grouptag",
                        "orig" => "grouptag",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/boxes",
                  "parts" => [
                    "boxes",
                  ],
                  "select" => {
                    "exist" => [
                      "bbox",
                      "exposure",
                      "format",
                      "grouptag",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "box_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "example" => "json",
                        "kind" => "query",
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/boxes/{boxId}",
                  "parts" => [
                    "boxes",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "boxId" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "remove" => {
              "input" => "data",
              "name" => "remove",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "box_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/boxes/{boxId}",
                  "parts" => [
                    "boxes",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "boxId" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "update" => {
              "input" => "data",
              "name" => "update",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "box_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "PUT",
                  "orig" => "/boxes/{boxId}",
                  "parts" => [
                    "boxes",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "boxId" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "box",
              ],
            ],
          },
        },
        "measurement" => {
          "fields" => [],
          "name" => "measurement",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "box_id",
                        "orig" => "box_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/boxes/{boxId}/data",
                  "parts" => [
                    "boxes",
                    "{box_id}",
                    "data",
                  ],
                  "rename" => {
                    "param" => {
                      "boxId" => "box_id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "box_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "box",
              ],
            ],
          },
        },
        "sensor" => {
          "fields" => [
            {
              "name" => "icon",
              "short" => "Icon identifier for the sensor",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "short" => "Unique identifier for the sensor",
              "type" => "`$STRING`",
            },
            {
              "name" => "lastMeasurement",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "sensorType",
              "short" => "Type of sensor",
              "type" => "`$STRING`",
            },
            {
              "name" => "title",
              "short" => "Title of the sensor",
              "type" => "`$STRING`",
            },
            {
              "name" => "unit",
              "short" => "Unit of measurement",
              "type" => "`$STRING`",
            },
          ],
          "name" => "sensor",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "box_id",
                        "orig" => "box_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/boxes/{boxId}/sensors",
                  "parts" => [
                    "boxes",
                    "{box_id}",
                    "sensors",
                  ],
                  "rename" => {
                    "param" => {
                      "boxId" => "box_id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "box_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "box",
              ],
            ],
          },
        },
        "statistic" => {
          "fields" => [
            {
              "name" => "count",
              "short" => "Number of measurements",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "max",
              "short" => "Maximum value",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "mean",
              "short" => "Mean value",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "median",
              "short" => "Median value",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "min",
              "short" => "Minimum value",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "sum",
              "short" => "Sum of all values",
              "type" => "`$NUMBER`",
            },
          ],
          "name" => "statistic",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "box_id",
                        "orig" => "box_id",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "from_date",
                        "orig" => "from_date",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "sensor_id",
                        "orig" => "sensor_id",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "to_date",
                        "orig" => "to_date",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/statistics/descriptive",
                  "parts" => [
                    "statistics",
                    "descriptive",
                  ],
                  "select" => {
                    "$action" => "descriptive",
                    "exist" => [
                      "box_id",
                      "from_date",
                      "sensor_id",
                      "to_date",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "user" => {
          "fields" => [
            {
              "name" => "boxes",
              "short" => "Array of senseBox IDs owned by the user",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "createdAt",
              "short" => "Account creation timestamp",
              "type" => "`$STRING`",
            },
            {
              "name" => "email",
              "op" => {
                "create" => {
                  "type" => "`$STRING`",
                },
                "list" => {
                  "type" => "`$STRING`",
                },
              },
              "req" => true,
              "short" => "User's email address",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "short" => "Unique identifier for the user",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "op" => {
                "create" => {
                  "type" => "`$STRING`",
                },
                "list" => {
                  "type" => "`$STRING`",
                },
              },
              "req" => true,
              "short" => "User's name",
              "type" => "`$STRING`",
            },
            {
              "name" => "password",
              "req" => true,
              "short" => "User's password",
              "type" => "`$STRING`",
            },
            {
              "name" => "role",
              "short" => "User's role",
              "type" => "`$STRING`",
            },
          ],
          "name" => "user",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/users/register",
                  "parts" => [
                    "users",
                    "register",
                  ],
                  "select" => {
                    "$action" => "register",
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/users/sign-in",
                  "parts" => [
                    "users",
                    "sign-in",
                  ],
                  "select" => {
                    "$action" => "sign_in",
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.user`",
                  },
                },
              ],
            },
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/users/me",
                  "parts" => [
                    "users",
                    "me",
                  ],
                  "select" => {
                    "$action" => "me",
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.boxes`",
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
    OpensensemapFeatures.make_feature(name)
  end
end
