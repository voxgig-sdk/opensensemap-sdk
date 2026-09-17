
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Opensensemap',
        slug: "opensensemap",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
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
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://api.opensensemap.org",

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        box: {
        },
  
        sensor: {
        },
  
        statistic: {
        },
  
        user: {
        },
  
    }
  }


  entity = {
    "box": {
      "fields": [
        {
          "format": "date-time",
          "name": "createdAt",
          "short": "Creation timestamp",
          "type": "`$STRING`"
        },
        {
          "name": "description",
          "short": "Description of the senseBox",
          "type": "`$STRING`"
        },
        {
          "name": "exposure",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            },
            "update": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "short": "Exposure type of the senseBox",
          "type": "`$STRING`"
        },
        {
          "name": "grouptag",
          "short": "Group tag for categorization",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Unique identifier for the senseBox",
          "type": "`$STRING`"
        },
        {
          "name": "location",
          "op": {
            "create": {
              "req": true,
              "type": "`$OBJECT`"
            },
            "update": {
              "req": true,
              "type": "`$OBJECT`"
            }
          },
          "type": "`$OBJECT`"
        },
        {
          "name": "model",
          "short": "Model of the senseBox",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            },
            "update": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "short": "Name of the senseBox",
          "type": "`$STRING`"
        },
        {
          "name": "sensors",
          "type": "`$ARRAY`"
        },
        {
          "format": "date-time",
          "name": "updatedAt",
          "short": "Last update timestamp",
          "type": "`$STRING`"
        },
        {
          "name": "value",
          "short": "Measurement value",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/boxes/{boxId}/data",
              "rename": {
                "param": {
                  "boxId": "id"
                }
              },
              "segments": [
                {
                  "lit": "boxes"
                },
                {
                  "var": "id"
                },
                {
                  "lit": "data"
                }
              ],
              "select": {
                "$action": "data",
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "boxes",
                "{id}",
                "data"
              ]
            },
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/boxes",
              "segments": [
                {
                  "lit": "boxes"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "boxes"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "sensor_id",
                    "orig": "sensor_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "example": "json",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "from_date",
                    "orig": "from_date",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "to_date",
                    "orig": "to_date",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/boxes/{boxId}/{sensorId}",
              "rename": {
                "param": {
                  "boxId": "box_id",
                  "sensorId": "sensor_id"
                }
              },
              "segments": [
                {
                  "lit": "boxes"
                },
                {
                  "var": "box_id"
                },
                {
                  "var": "sensor_id"
                }
              ],
              "select": {
                "exist": [
                  "box_id",
                  "format",
                  "from_date",
                  "sensor_id",
                  "to_date"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "boxes",
                "{box_id}",
                "{sensor_id}"
              ]
            },
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "bbox",
                    "orig": "bbox",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "exposure",
                    "orig": "exposure",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "json",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "grouptag",
                    "orig": "grouptag",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/boxes",
              "segments": [
                {
                  "lit": "boxes"
                }
              ],
              "select": {
                "exist": [
                  "bbox",
                  "exposure",
                  "format",
                  "grouptag"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "boxes"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "example": "json",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/boxes/{boxId}",
              "rename": {
                "param": {
                  "boxId": "id"
                }
              },
              "segments": [
                {
                  "lit": "boxes"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "format",
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "boxes",
                "{id}"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/boxes/{boxId}",
              "rename": {
                "param": {
                  "boxId": "id"
                }
              },
              "segments": [
                {
                  "lit": "boxes"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "boxes",
                "{id}"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "PUT",
              "orig": "/boxes/{boxId}",
              "rename": {
                "param": {
                  "boxId": "id"
                }
              },
              "segments": [
                {
                  "lit": "boxes"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "boxes",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "box"
          ]
        ]
      }
    },
    "sensor": {
      "fields": [
        {
          "name": "icon",
          "short": "Icon identifier for the sensor",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Unique identifier for the sensor",
          "type": "`$STRING`"
        },
        {
          "name": "lastMeasurement",
          "type": "`$OBJECT`"
        },
        {
          "name": "sensorType",
          "short": "Type of sensor",
          "type": "`$STRING`"
        },
        {
          "name": "title",
          "short": "Title of the sensor",
          "type": "`$STRING`"
        },
        {
          "name": "unit",
          "short": "Unit of measurement",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/boxes/{boxId}/sensors",
              "rename": {
                "param": {
                  "boxId": "box_id"
                }
              },
              "segments": [
                {
                  "lit": "boxes"
                },
                {
                  "var": "box_id"
                },
                {
                  "lit": "sensors"
                }
              ],
              "select": {
                "exist": [
                  "box_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "boxes",
                "{box_id}",
                "sensors"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "box"
          ]
        ]
      }
    },
    "statistic": {
      "fields": [
        {
          "name": "count",
          "short": "Number of measurements",
          "type": "`$INTEGER`"
        },
        {
          "name": "max",
          "short": "Maximum value",
          "type": "`$NUMBER`"
        },
        {
          "name": "mean",
          "short": "Mean value",
          "type": "`$NUMBER`"
        },
        {
          "name": "median",
          "short": "Median value",
          "type": "`$NUMBER`"
        },
        {
          "name": "min",
          "short": "Minimum value",
          "type": "`$NUMBER`"
        },
        {
          "name": "sum",
          "short": "Sum of all values",
          "type": "`$NUMBER`"
        }
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
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "from_date",
                    "orig": "from_date",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "sensor_id",
                    "orig": "sensor_id",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "to_date",
                    "orig": "to_date",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/statistics/descriptive",
              "segments": [
                {
                  "lit": "statistics"
                },
                {
                  "lit": "descriptive"
                }
              ],
              "select": {
                "$action": "descriptive",
                "exist": [
                  "box_id",
                  "from_date",
                  "sensor_id",
                  "to_date"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "statistics",
                "descriptive"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "user": {
      "fields": [
        {
          "name": "boxes",
          "short": "Array of senseBox IDs owned by the user",
          "type": "`$ARRAY`"
        },
        {
          "format": "date-time",
          "name": "createdAt",
          "short": "Account creation timestamp",
          "type": "`$STRING`"
        },
        {
          "format": "email",
          "name": "email",
          "short": "User's email address",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Unique identifier for the user",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "short": "User's name",
          "type": "`$STRING`"
        },
        {
          "name": "role",
          "short": "User's role",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                  "lit": "users"
                },
                {
                  "lit": "register"
                }
              ],
              "select": {
                "$action": "register"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "users",
                "register"
              ]
            },
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/users/sign-in",
              "segments": [
                {
                  "lit": "users"
                },
                {
                  "lit": "sign-in"
                }
              ],
              "select": {
                "$action": "sign_in"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.user`"
              },
              "parts": [
                "users",
                "sign-in"
              ]
            }
          ]
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
                  "lit": "users"
                },
                {
                  "lit": "me"
                }
              ],
              "select": {
                "$action": "me"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.boxes`"
              },
              "parts": [
                "users",
                "me"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

