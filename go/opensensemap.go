package voxgigopensensemapsdk

import (
	"github.com/voxgig-sdk/opensensemap-sdk/go/core"
	"github.com/voxgig-sdk/opensensemap-sdk/go/entity"
	"github.com/voxgig-sdk/opensensemap-sdk/go/feature"
	_ "github.com/voxgig-sdk/opensensemap-sdk/go/utility"
)

// Type aliases preserve external API.
type OpensensemapSDK = core.OpensensemapSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type OpensensemapEntity = core.OpensensemapEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type OpensensemapError = core.OpensensemapError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewBoxEntityFunc = func(client *core.OpensensemapSDK, entopts map[string]any) core.OpensensemapEntity {
		return entity.NewBoxEntity(client, entopts)
	}
	core.NewMeasurementEntityFunc = func(client *core.OpensensemapSDK, entopts map[string]any) core.OpensensemapEntity {
		return entity.NewMeasurementEntity(client, entopts)
	}
	core.NewSensorEntityFunc = func(client *core.OpensensemapSDK, entopts map[string]any) core.OpensensemapEntity {
		return entity.NewSensorEntity(client, entopts)
	}
	core.NewStatisticEntityFunc = func(client *core.OpensensemapSDK, entopts map[string]any) core.OpensensemapEntity {
		return entity.NewStatisticEntity(client, entopts)
	}
	core.NewUserEntityFunc = func(client *core.OpensensemapSDK, entopts map[string]any) core.OpensensemapEntity {
		return entity.NewUserEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewOpensensemapSDK = core.NewOpensensemapSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
