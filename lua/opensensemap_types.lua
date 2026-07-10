-- Typed models for the Opensensemap SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Box
---@field created_at? string
---@field description? string
---@field exposure? string
---@field grouptag? string
---@field id? string
---@field location? table
---@field model? string
---@field name? string
---@field sensor? table
---@field updated_at? string
---@field value? string

---@class BoxLoadMatch
---@field id string

---@class BoxListMatch
---@field box_id? string
---@field sensor_id? string

---@class BoxCreateData
---@field created_at? string
---@field description? string
---@field exposure? string
---@field grouptag? string
---@field id? string
---@field location? table
---@field model? string
---@field name? string
---@field sensor? table
---@field updated_at? string
---@field value? string

---@class BoxUpdateData
---@field id string

---@class BoxRemoveMatch
---@field id string

---@class Measurement

---@class MeasurementCreateData
---@field box_id string

---@class Sensor
---@field icon? string
---@field id? string
---@field last_measurement? table
---@field sensor_type? string
---@field title? string
---@field unit? string

---@class SensorListMatch
---@field box_id string

---@class Statistic
---@field count? number
---@field max? number
---@field mean? number
---@field median? number
---@field min? number
---@field sum? number

---@class StatisticLoadMatch
---@field count? number
---@field max? number
---@field mean? number
---@field median? number
---@field min? number
---@field sum? number

---@class User
---@field box? table
---@field created_at? string
---@field email string
---@field id? string
---@field name string
---@field password string
---@field role? string
---@field token? string
---@field user? table

---@class UserListMatch
---@field box? table
---@field created_at? string
---@field email? string
---@field id? string
---@field name? string
---@field password? string
---@field role? string
---@field token? string
---@field user? table

---@class UserCreateData
---@field box? table
---@field created_at? string
---@field email string
---@field id? string
---@field name string
---@field password string
---@field role? string
---@field token? string
---@field user? table

local M = {}

return M
