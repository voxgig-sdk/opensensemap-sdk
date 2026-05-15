package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewBoxEntityFunc func(client *OpensensemapSDK, entopts map[string]any) OpensensemapEntity

var NewMeasurementEntityFunc func(client *OpensensemapSDK, entopts map[string]any) OpensensemapEntity

var NewSensorEntityFunc func(client *OpensensemapSDK, entopts map[string]any) OpensensemapEntity

var NewStatisticEntityFunc func(client *OpensensemapSDK, entopts map[string]any) OpensensemapEntity

var NewUserEntityFunc func(client *OpensensemapSDK, entopts map[string]any) OpensensemapEntity

