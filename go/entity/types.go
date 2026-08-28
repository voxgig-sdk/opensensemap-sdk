// Typed models for the Opensensemap SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/opensensemap-sdk/go/core"
)

// Box is the typed data model for the box entity.
type Box struct {
	CreatedAt *string `json:"createdAt,omitempty"`
	Description *string `json:"description,omitempty"`
	Exposure *string `json:"exposure,omitempty"`
	Grouptag *string `json:"grouptag,omitempty"`
	Id *string `json:"id,omitempty"`
	Location *map[string]any `json:"location,omitempty"`
	Model *string `json:"model,omitempty"`
	Name *string `json:"name,omitempty"`
	Sensors *[]any `json:"sensors,omitempty"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
	Value *string `json:"value,omitempty"`
}

// BoxLoadMatch is the typed request payload for Box.LoadTyped.
type BoxLoadMatch struct {
	Id string `json:"id"`
	Format *string `json:"format,omitempty"`
}

// BoxListMatch is the typed request payload for Box.ListTyped.
type BoxListMatch struct {
	BoxId string `json:"box_id"`
	SensorId string `json:"sensor_id"`
	Format *string `json:"format,omitempty"`
	FromDate *string `json:"from_date,omitempty"`
	ToDate *string `json:"to_date,omitempty"`
}

// BoxCreateData is the typed request payload for Box.CreateTyped.
type BoxCreateData struct {
	CreatedAt *string `json:"createdAt,omitempty"`
	Description *string `json:"description,omitempty"`
	Exposure *string `json:"exposure,omitempty"`
	Grouptag *string `json:"grouptag,omitempty"`
	Id *string `json:"id,omitempty"`
	Location *map[string]any `json:"location,omitempty"`
	Model *string `json:"model,omitempty"`
	Name *string `json:"name,omitempty"`
	Sensors *[]any `json:"sensors,omitempty"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
	Value *string `json:"value,omitempty"`
}

// BoxUpdateData is the typed request payload for Box.UpdateTyped.
type BoxUpdateData struct {
	Id string `json:"id"`
	CreatedAt *string `json:"createdAt,omitempty"`
	Description *string `json:"description,omitempty"`
	Exposure *string `json:"exposure,omitempty"`
	Grouptag *string `json:"grouptag,omitempty"`
	Location *map[string]any `json:"location,omitempty"`
	Model *string `json:"model,omitempty"`
	Name *string `json:"name,omitempty"`
	Sensors *[]any `json:"sensors,omitempty"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
	Value *string `json:"value,omitempty"`
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
	LastMeasurement *map[string]any `json:"lastMeasurement,omitempty"`
	SensorType *string `json:"sensorType,omitempty"`
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
	BoxId *string `json:"box_id,omitempty"`
	FromDate *string `json:"from_date,omitempty"`
	SensorId *string `json:"sensor_id,omitempty"`
	ToDate *string `json:"to_date,omitempty"`
}

// User is the typed data model for the user entity.
type User struct {
	Boxes *[]any `json:"boxes,omitempty"`
	CreatedAt *string `json:"createdAt,omitempty"`
	Email string `json:"email"`
	Id *string `json:"id,omitempty"`
	Name string `json:"name"`
	Password string `json:"password"`
	Role *string `json:"role,omitempty"`
}

// UserListMatch is the typed request payload for User.ListTyped.
type UserListMatch struct {
	Boxes *[]any `json:"boxes,omitempty"`
	CreatedAt *string `json:"createdAt,omitempty"`
	Email *string `json:"email,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Password *string `json:"password,omitempty"`
	Role *string `json:"role,omitempty"`
}

// UserCreateData is the typed request payload for User.CreateTyped.
type UserCreateData struct {
	Boxes *[]any `json:"boxes,omitempty"`
	CreatedAt *string `json:"createdAt,omitempty"`
	Email string `json:"email"`
	Id *string `json:"id,omitempty"`
	Name string `json:"name"`
	Password string `json:"password"`
	Role *string `json:"role,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
