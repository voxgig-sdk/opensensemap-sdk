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
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
				"measurement": map[string]any{},
				"sensor": map[string]any{},
				"statistic": map[string]any{},
				"user": map[string]any{},
			},
		},
		"entity": map[string]any{
			"box": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "createdAt",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "grouptag",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sensors",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "updatedAt",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "value",
						"type": "`$STRING`",
					},
				},
				"name": "box",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/boxes",
								"parts": []any{
									"boxes",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
								"parts": []any{
									"boxes",
									"{box_id}",
									"{sensor_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"boxId": "box_id",
										"sensorId": "sensor_id",
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
								"parts": []any{
									"boxes",
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
								"parts": []any{
									"boxes",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"boxId": "id",
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
								"parts": []any{
									"boxes",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"boxId": "id",
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
								"parts": []any{
									"boxes",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"boxId": "id",
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
			"measurement": map[string]any{
				"fields": []any{},
				"name": "measurement",
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
											"name": "box_id",
											"orig": "box_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/boxes/{boxId}/data",
								"parts": []any{
									"boxes",
									"{box_id}",
									"data",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"boxId": "box_id",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lastMeasurement",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "sensorType",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "unit",
						"type": "`$STRING`",
					},
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
								"parts": []any{
									"boxes",
									"{box_id}",
									"sensors",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"boxId": "box_id",
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
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "max",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "mean",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "median",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "min",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "sum",
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
								"parts": []any{
									"statistics",
									"descriptive",
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
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "createdAt",
						"type": "`$STRING`",
					},
					map[string]any{
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "password",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "role",
						"type": "`$STRING`",
					},
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
								"parts": []any{
									"users",
									"register",
								},
								"select": map[string]any{
									"$action": "register",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/users/sign-in",
								"parts": []any{
									"users",
									"sign-in",
								},
								"select": map[string]any{
									"$action": "sign_in",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.user`",
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
								"parts": []any{
									"users",
									"me",
								},
								"select": map[string]any{
									"$action": "me",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.boxes`",
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
