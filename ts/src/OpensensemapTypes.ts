// Typed models for the Opensensemap SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Box {
  created_at?: string
  description?: string
  exposure?: string
  grouptag?: string
  id?: string
  location?: Record<string, any>
  model?: string
  name?: string
  sensor?: any[]
  updated_at?: string
  value?: string
}

export interface BoxLoadMatch {
  id: string
}

export interface BoxListMatch {
  box_id?: string
  sensor_id?: string
}

export interface BoxCreateData {
  created_at?: string
  description?: string
  exposure?: string
  grouptag?: string
  id?: string
  location?: Record<string, any>
  model?: string
  name?: string
  sensor?: any[]
  updated_at?: string
  value?: string
}

export interface BoxUpdateData {
  id: string
}

export interface BoxRemoveMatch {
  id: string
}

export interface Measurement {
}

export interface MeasurementCreateData {
  box_id: string
}

export interface Sensor {
  icon?: string
  id?: string
  last_measurement?: Record<string, any>
  sensor_type?: string
  title?: string
  unit?: string
}

export interface SensorListMatch {
  box_id: string
}

export interface Statistic {
  count?: number
  max?: number
  mean?: number
  median?: number
  min?: number
  sum?: number
}

export interface StatisticLoadMatch {
  count?: number
  max?: number
  mean?: number
  median?: number
  min?: number
  sum?: number
}

export interface User {
  box?: any[]
  created_at?: string
  email: string
  id?: string
  name: string
  password: string
  role?: string
  token?: string
  user?: Record<string, any>
}

export interface UserListMatch {
  box?: any[]
  created_at?: string
  email?: string
  id?: string
  name?: string
  password?: string
  role?: string
  token?: string
  user?: Record<string, any>
}

export interface UserCreateData {
  box?: any[]
  created_at?: string
  email: string
  id?: string
  name: string
  password: string
  role?: string
  token?: string
  user?: Record<string, any>
}

