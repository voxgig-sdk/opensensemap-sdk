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
			"name": "Opensensemap",
			"slug": "opensensemap",
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
			"base": "https://api.opensensemap.org",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"box": map[string]any{},
				"sensor": map[string]any{},
				"statistic": map[string]any{},
				"user": map[string]any{},
			},
		},
		"entity": map[string]any{
			"box": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "date-time",
						"name": "createdAt",
						"short": "Creation timestamp",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "Description of the senseBox",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "exposure",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "Exposure type of the senseBox",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "grouptag",
						"short": "Group tag for categorization",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the senseBox",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "location",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$OBJECT`",
							},
							"update": map[string]any{
								"req": true,
								"type": "`$OBJECT`",
							},
						},
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "model",
						"short": "Model of the senseBox",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
							"update": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "Name of the senseBox",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sensors",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"format": "date-time",
						"name": "updatedAt",
						"short": "Last update timestamp",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "value",
						"short": "Measurement value",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "box",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "box_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/boxes/{boxId}/data",
								"rename": map[string]any{
									"param": map[string]any{
										"boxId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "boxes",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "data",
									},
								},
								"select": map[string]any{
									"$action": "data",
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"boxes",
									"{id}",
									"data",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/boxes",
								"segments": []any{
									map[string]any{
										"lit": "boxes",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"boxes",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "box_id",
											"orig": "box_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "sensor_id",
											"orig": "sensor_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "json",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "from_date",
											"orig": "from_date",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "to_date",
											"orig": "to_date",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/boxes/{boxId}/{sensorId}",
								"rename": map[string]any{
									"param": map[string]any{
										"boxId": "box_id",
										"sensorId": "sensor_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "boxes",
									},
									map[string]any{
										"var": "box_id",
									},
									map[string]any{
										"var": "sensor_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"box_id",
										"format",
										"from_date",
										"sensor_id",
										"to_date",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"boxes",
									"{box_id}",
									"{sensor_id}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "bbox",
											"orig": "bbox",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "exposure",
											"orig": "exposure",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "json",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "grouptag",
											"orig": "grouptag",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/boxes",
								"segments": []any{
									map[string]any{
										"lit": "boxes",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"bbox",
										"exposure",
										"format",
										"grouptag",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"boxes",
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
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "box_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "json",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/boxes/{boxId}",
								"rename": map[string]any{
									"param": map[string]any{
										"boxId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "boxes",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"format",
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"boxes",
									"{id}",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "box_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/boxes/{boxId}",
								"rename": map[string]any{
									"param": map[string]any{
										"boxId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "boxes",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"boxes",
									"{id}",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "box_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PUT",
								"orig": "/boxes/{boxId}",
								"rename": map[string]any{
									"param": map[string]any{
										"boxId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "boxes",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"boxes",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"box",
						},
					},
				},
			},
			"sensor": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "icon",
						"short": "Icon identifier for the sensor",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the sensor",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lastMeasurement",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "sensorType",
						"short": "Type of sensor",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"short": "Title of the sensor",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "unit",
						"short": "Unit of measurement",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "sensor",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "box_id",
											"orig": "box_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/boxes/{boxId}/sensors",
								"rename": map[string]any{
									"param": map[string]any{
										"boxId": "box_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "boxes",
									},
									map[string]any{
										"var": "box_id",
									},
									map[string]any{
										"lit": "sensors",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"box_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"boxes",
									"{box_id}",
									"sensors",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"box",
						},
					},
				},
			},
			"statistic": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "count",
						"short": "Number of measurements",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "max",
						"short": "Maximum value",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "mean",
						"short": "Mean value",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "median",
						"short": "Median value",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "min",
						"short": "Minimum value",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "sum",
						"short": "Sum of all values",
						"type": "`$NUMBER`",
					},
				},
				"name": "statistic",
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
											"name": "box_id",
											"orig": "box_id",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "from_date",
											"orig": "from_date",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "sensor_id",
											"orig": "sensor_id",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "to_date",
											"orig": "to_date",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/statistics/descriptive",
								"segments": []any{
									map[string]any{
										"lit": "statistics",
									},
									map[string]any{
										"lit": "descriptive",
									},
								},
								"select": map[string]any{
									"$action": "descriptive",
									"exist": []any{
										"box_id",
										"from_date",
										"sensor_id",
										"to_date",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"statistics",
									"descriptive",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"user": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "boxes",
						"short": "Array of senseBox IDs owned by the user",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"format": "date-time",
						"name": "createdAt",
						"short": "Account creation timestamp",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "email",
						"name": "email",
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
							"list": map[string]any{
								"type": "`$STRING`",
							},
						},
						"req": true,
						"short": "User's email address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the user",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
							"list": map[string]any{
								"type": "`$STRING`",
							},
						},
						"req": true,
						"short": "User's name",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "password",
						"name": "password",
						"req": true,
						"short": "User's password",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "role",
						"short": "User's role",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "user",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/users/register",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"lit": "register",
									},
								},
								"select": map[string]any{
									"$action": "register",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"users",
									"register",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/users/sign-in",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"lit": "sign-in",
									},
								},
								"select": map[string]any{
									"$action": "sign_in",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.user`",
								},
								"parts": []any{
									"users",
									"sign-in",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/users/me",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"lit": "me",
									},
								},
								"select": map[string]any{
									"$action": "me",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.boxes`",
								},
								"parts": []any{
									"users",
									"me",
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
