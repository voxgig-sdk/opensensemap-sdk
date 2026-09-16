package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewBoxEntityFunc func(client *OpensensemapSDK, entopts map[string]any) OpensensemapEntity

var NewSensorEntityFunc func(client *OpensensemapSDK, entopts map[string]any) OpensensemapEntity

var NewStatisticEntityFunc func(client *OpensensemapSDK, entopts map[string]any) OpensensemapEntity

var NewUserEntityFunc func(client *OpensensemapSDK, entopts map[string]any) OpensensemapEntity

