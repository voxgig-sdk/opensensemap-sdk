# Opensensemap SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Opensensemap",
            "slug": "opensensemap",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api.opensensemap.org",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "box": {},
                "sensor": {},
                "statistic": {},
                "user": {},
            },
        },
        "entity": {
      "box": {
        "fields": [
          {
            "format": "date-time",
            "name": "createdAt",
            "short": "Creation timestamp",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "short": "Description of the senseBox",
            "type": "`$STRING`",
          },
          {
            "name": "exposure",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
              "update": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "Exposure type of the senseBox",
            "type": "`$STRING`",
          },
          {
            "name": "grouptag",
            "short": "Group tag for categorization",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the senseBox",
            "type": "`$STRING`",
          },
          {
            "name": "location",
            "op": {
              "create": {
                "req": True,
                "type": "`$OBJECT`",
              },
              "update": {
                "req": True,
                "type": "`$OBJECT`",
              },
            },
            "type": "`$OBJECT`",
          },
          {
            "name": "model",
            "short": "Model of the senseBox",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
              "update": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "Name of the senseBox",
            "type": "`$STRING`",
          },
          {
            "name": "sensors",
            "type": "`$ARRAY`",
          },
          {
            "format": "date-time",
            "name": "updatedAt",
            "short": "Last update timestamp",
            "type": "`$STRING`",
          },
          {
            "name": "value",
            "short": "Measurement value",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "box",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "box_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/boxes/{boxId}/data",
                "rename": {
                  "param": {
                    "boxId": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "boxes",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "data",
                  },
                ],
                "select": {
                  "$action": "data",
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "boxes",
                  "{id}",
                  "data",
                ],
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/boxes",
                "segments": [
                  {
                    "lit": "boxes",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "boxes",
                ],
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "box_id",
                      "orig": "box_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "sensor_id",
                      "orig": "sensor_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": "json",
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "from_date",
                      "orig": "from_date",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "to_date",
                      "orig": "to_date",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/boxes/{boxId}/{sensorId}",
                "rename": {
                  "param": {
                    "boxId": "box_id",
                    "sensorId": "sensor_id",
                  },
                },
                "segments": [
                  {
                    "lit": "boxes",
                  },
                  {
                    "var": "box_id",
                  },
                  {
                    "var": "sensor_id",
                  },
                ],
                "select": {
                  "exist": [
                    "box_id",
                    "format",
                    "from_date",
                    "sensor_id",
                    "to_date",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "boxes",
                  "{box_id}",
                  "{sensor_id}",
                ],
              },
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "bbox",
                      "orig": "bbox",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "exposure",
                      "orig": "exposure",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "json",
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "grouptag",
                      "orig": "grouptag",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/boxes",
                "segments": [
                  {
                    "lit": "boxes",
                  },
                ],
                "select": {
                  "exist": [
                    "bbox",
                    "exposure",
                    "format",
                    "grouptag",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "boxes",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "box_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": "json",
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/boxes/{boxId}",
                "rename": {
                  "param": {
                    "boxId": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "boxes",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "format",
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "boxes",
                  "{id}",
                ],
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "box_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/boxes/{boxId}",
                "rename": {
                  "param": {
                    "boxId": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "boxes",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "boxes",
                  "{id}",
                ],
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "box_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PUT",
                "orig": "/boxes/{boxId}",
                "rename": {
                  "param": {
                    "boxId": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "boxes",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "boxes",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "box",
            ],
          ],
        },
      },
      "sensor": {
        "fields": [
          {
            "name": "icon",
            "short": "Icon identifier for the sensor",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the sensor",
            "type": "`$STRING`",
          },
          {
            "name": "lastMeasurement",
            "type": "`$OBJECT`",
          },
          {
            "name": "sensorType",
            "short": "Type of sensor",
            "type": "`$STRING`",
          },
          {
            "name": "title",
            "short": "Title of the sensor",
            "type": "`$STRING`",
          },
          {
            "name": "unit",
            "short": "Unit of measurement",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "sensor",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "box_id",
                      "orig": "box_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/boxes/{boxId}/sensors",
                "rename": {
                  "param": {
                    "boxId": "box_id",
                  },
                },
                "segments": [
                  {
                    "lit": "boxes",
                  },
                  {
                    "var": "box_id",
                  },
                  {
                    "lit": "sensors",
                  },
                ],
                "select": {
                  "exist": [
                    "box_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "boxes",
                  "{box_id}",
                  "sensors",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "box",
            ],
          ],
        },
      },
      "statistic": {
        "fields": [
          {
            "name": "count",
            "short": "Number of measurements",
            "type": "`$INTEGER`",
          },
          {
            "name": "max",
            "short": "Maximum value",
            "type": "`$NUMBER`",
          },
          {
            "name": "mean",
            "short": "Mean value",
            "type": "`$NUMBER`",
          },
          {
            "name": "median",
            "short": "Median value",
            "type": "`$NUMBER`",
          },
          {
            "name": "min",
            "short": "Minimum value",
            "type": "`$NUMBER`",
          },
          {
            "name": "sum",
            "short": "Sum of all values",
            "type": "`$NUMBER`",
          },
        ],
        "name": "statistic",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "box_id",
                      "orig": "box_id",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "from_date",
                      "orig": "from_date",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "sensor_id",
                      "orig": "sensor_id",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "to_date",
                      "orig": "to_date",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/statistics/descriptive",
                "segments": [
                  {
                    "lit": "statistics",
                  },
                  {
                    "lit": "descriptive",
                  },
                ],
                "select": {
                  "$action": "descriptive",
                  "exist": [
                    "box_id",
                    "from_date",
                    "sensor_id",
                    "to_date",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "statistics",
                  "descriptive",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "user": {
        "fields": [
          {
            "name": "boxes",
            "short": "Array of senseBox IDs owned by the user",
            "type": "`$ARRAY`",
          },
          {
            "format": "date-time",
            "name": "createdAt",
            "short": "Account creation timestamp",
            "type": "`$STRING`",
          },
          {
            "format": "email",
            "name": "email",
            "op": {
              "create": {
                "type": "`$STRING`",
              },
              "list": {
                "type": "`$STRING`",
              },
            },
            "req": True,
            "short": "User's email address",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the user",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "op": {
              "create": {
                "type": "`$STRING`",
              },
              "list": {
                "type": "`$STRING`",
              },
            },
            "req": True,
            "short": "User's name",
            "type": "`$STRING`",
          },
          {
            "format": "password",
            "name": "password",
            "req": True,
            "short": "User's password",
            "type": "`$STRING`",
          },
          {
            "name": "role",
            "short": "User's role",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "user",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/users/register",
                "segments": [
                  {
                    "lit": "users",
                  },
                  {
                    "lit": "register",
                  },
                ],
                "select": {
                  "$action": "register",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "users",
                  "register",
                ],
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/users/sign-in",
                "segments": [
                  {
                    "lit": "users",
                  },
                  {
                    "lit": "sign-in",
                  },
                ],
                "select": {
                  "$action": "sign_in",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.user`",
                },
                "parts": [
                  "users",
                  "sign-in",
                ],
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/users/me",
                "segments": [
                  {
                    "lit": "users",
                  },
                  {
                    "lit": "me",
                  },
                ],
                "select": {
                  "$action": "me",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.boxes`",
                },
                "parts": [
                  "users",
                  "me",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
