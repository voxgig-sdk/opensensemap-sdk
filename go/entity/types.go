// Typed models for the Opensensemap SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Box is the typed data model for the box entity.
type Box struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Description *string `json:"description,omitempty"`
	Exposure *string `json:"exposure,omitempty"`
	Grouptag *string `json:"grouptag,omitempty"`
	Id *string `json:"id,omitempty"`
	Location *map[string]any `json:"location,omitempty"`
	Model *string `json:"model,omitempty"`
	Name *string `json:"name,omitempty"`
	Sensor *[]any `json:"sensor,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	Value *string `json:"value,omitempty"`
}

// BoxLoadMatch is the typed request payload for Box.LoadTyped.
type BoxLoadMatch struct {
	Id string `json:"id"`
}

// BoxListMatch is the typed request payload for Box.ListTyped.
type BoxListMatch struct {
	BoxId *string `json:"box_id,omitempty"`
	SensorId *string `json:"sensor_id,omitempty"`
}

// BoxCreateData is the typed request payload for Box.CreateTyped.
type BoxCreateData struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Description *string `json:"description,omitempty"`
	Exposure *string `json:"exposure,omitempty"`
	Grouptag *string `json:"grouptag,omitempty"`
	Id *string `json:"id,omitempty"`
	Location *map[string]any `json:"location,omitempty"`
	Model *string `json:"model,omitempty"`
	Name *string `json:"name,omitempty"`
	Sensor *[]any `json:"sensor,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	Value *string `json:"value,omitempty"`
}

// BoxUpdateData is the typed request payload for Box.UpdateTyped.
type BoxUpdateData struct {
	Id string `json:"id"`
}

// BoxRemoveMatch is the typed request payload for Box.RemoveTyped.
type BoxRemoveMatch struct {
	Id string `json:"id"`
}

// Measurement is the typed data model for the measurement entity.
type Measurement struct {
}

// MeasurementCreateData is the typed request payload for Measurement.CreateTyped.
type MeasurementCreateData struct {
	BoxId string `json:"box_id"`
}

// Sensor is the typed data model for the sensor entity.
type Sensor struct {
	Icon *string `json:"icon,omitempty"`
	Id *string `json:"id,omitempty"`
	LastMeasurement *map[string]any `json:"last_measurement,omitempty"`
	SensorType *string `json:"sensor_type,omitempty"`
	Title *string `json:"title,omitempty"`
	Unit *string `json:"unit,omitempty"`
}

// SensorListMatch is the typed request payload for Sensor.ListTyped.
type SensorListMatch struct {
	BoxId string `json:"box_id"`
}

// Statistic is the typed data model for the statistic entity.
type Statistic struct {
	Count *int `json:"count,omitempty"`
	Max *float64 `json:"max,omitempty"`
	Mean *float64 `json:"mean,omitempty"`
	Median *float64 `json:"median,omitempty"`
	Min *float64 `json:"min,omitempty"`
	Sum *float64 `json:"sum,omitempty"`
}

// StatisticLoadMatch is the typed request payload for Statistic.LoadTyped.
type StatisticLoadMatch struct {
	Count *int `json:"count,omitempty"`
	Max *float64 `json:"max,omitempty"`
	Mean *float64 `json:"mean,omitempty"`
	Median *float64 `json:"median,omitempty"`
	Min *float64 `json:"min,omitempty"`
	Sum *float64 `json:"sum,omitempty"`
}

// User is the typed data model for the user entity.
type User struct {
	Box *[]any `json:"box,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Email string `json:"email"`
	Id *string `json:"id,omitempty"`
	Name string `json:"name"`
	Password string `json:"password"`
	Role *string `json:"role,omitempty"`
	Token *string `json:"token,omitempty"`
	User *map[string]any `json:"user,omitempty"`
}

// UserListMatch is the typed request payload for User.ListTyped.
type UserListMatch struct {
	Box *[]any `json:"box,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Email *string `json:"email,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Password *string `json:"password,omitempty"`
	Role *string `json:"role,omitempty"`
	Token *string `json:"token,omitempty"`
	User *map[string]any `json:"user,omitempty"`
}

// UserCreateData is the typed request payload for User.CreateTyped.
type UserCreateData struct {
	Box *[]any `json:"box,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Email string `json:"email"`
	Id *string `json:"id,omitempty"`
	Name string `json:"name"`
	Password string `json:"password"`
	Role *string `json:"role,omitempty"`
	Token *string `json:"token,omitempty"`
	User *map[string]any `json:"user,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
