# frozen_string_literal: true

# Typed models for the Opensensemap SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Box entity data model.
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] exposure
#   @return [String, nil]
#
# @!attribute [rw] grouptag
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] location
#   @return [Hash, nil]
#
# @!attribute [rw] model
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] sensors
#   @return [Array, nil]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
#
# @!attribute [rw] value
#   @return [String, nil]
Box = Struct.new(
  :createdAt,
  :description,
  :exposure,
  :grouptag,
  :id,
  :location,
  :model,
  :name,
  :sensors,
  :updatedAt,
  :value,
  keyword_init: true
)

# Request payload for Box#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] format
#   @return [String, nil]
BoxLoadMatch = Struct.new(
  :id,
  :format,
  keyword_init: true
)

# Request payload for Box#list.
#
# @!attribute [rw] box_id
#   @return [String]
#
# @!attribute [rw] sensor_id
#   @return [String]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] from_date
#   @return [String, nil]
#
# @!attribute [rw] to_date
#   @return [String, nil]
BoxListMatch = Struct.new(
  :box_id,
  :sensor_id,
  :format,
  :from_date,
  :to_date,
  keyword_init: true
)

# Request payload for Box#create.
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] exposure
#   @return [String, nil]
#
# @!attribute [rw] grouptag
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] location
#   @return [Hash, nil]
#
# @!attribute [rw] model
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] sensors
#   @return [Array, nil]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
#
# @!attribute [rw] value
#   @return [String, nil]
BoxCreateData = Struct.new(
  :createdAt,
  :description,
  :exposure,
  :grouptag,
  :id,
  :location,
  :model,
  :name,
  :sensors,
  :updatedAt,
  :value,
  keyword_init: true
)

# Request payload for Box#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] exposure
#   @return [String, nil]
#
# @!attribute [rw] grouptag
#   @return [String, nil]
#
# @!attribute [rw] location
#   @return [Hash, nil]
#
# @!attribute [rw] model
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] sensors
#   @return [Array, nil]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
#
# @!attribute [rw] value
#   @return [String, nil]
BoxUpdateData = Struct.new(
  :id,
  :createdAt,
  :description,
  :exposure,
  :grouptag,
  :location,
  :model,
  :name,
  :sensors,
  :updatedAt,
  :value,
  keyword_init: true
)

# Request payload for Box#remove.
#
# @!attribute [rw] id
#   @return [String]
BoxRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# Measurement entity data model.
class Measurement
end

# Request payload for Measurement#create.
#
# @!attribute [rw] box_id
#   @return [String]
MeasurementCreateData = Struct.new(
  :box_id,
  keyword_init: true
)

# Sensor entity data model.
#
# @!attribute [rw] icon
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] lastMeasurement
#   @return [Hash, nil]
#
# @!attribute [rw] sensorType
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] unit
#   @return [String, nil]
Sensor = Struct.new(
  :icon,
  :id,
  :lastMeasurement,
  :sensorType,
  :title,
  :unit,
  keyword_init: true
)

# Request payload for Sensor#list.
#
# @!attribute [rw] box_id
#   @return [String]
SensorListMatch = Struct.new(
  :box_id,
  keyword_init: true
)

# Statistic entity data model.
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] max
#   @return [Float, nil]
#
# @!attribute [rw] mean
#   @return [Float, nil]
#
# @!attribute [rw] median
#   @return [Float, nil]
#
# @!attribute [rw] min
#   @return [Float, nil]
#
# @!attribute [rw] sum
#   @return [Float, nil]
Statistic = Struct.new(
  :count,
  :max,
  :mean,
  :median,
  :min,
  :sum,
  keyword_init: true
)

# Request payload for Statistic#load.
#
# @!attribute [rw] box_id
#   @return [String, nil]
#
# @!attribute [rw] from_date
#   @return [String, nil]
#
# @!attribute [rw] sensor_id
#   @return [String, nil]
#
# @!attribute [rw] to_date
#   @return [String, nil]
StatisticLoadMatch = Struct.new(
  :box_id,
  :from_date,
  :sensor_id,
  :to_date,
  keyword_init: true
)

# User entity data model.
#
# @!attribute [rw] boxes
#   @return [Array, nil]
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] password
#   @return [String]
#
# @!attribute [rw] role
#   @return [String, nil]
User = Struct.new(
  :boxes,
  :createdAt,
  :email,
  :id,
  :name,
  :password,
  :role,
  keyword_init: true
)

# Request payload for User#list.
#
# @!attribute [rw] boxes
#   @return [Array, nil]
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] password
#   @return [String, nil]
#
# @!attribute [rw] role
#   @return [String, nil]
UserListMatch = Struct.new(
  :boxes,
  :createdAt,
  :email,
  :id,
  :name,
  :password,
  :role,
  keyword_init: true
)

# Request payload for User#create.
#
# @!attribute [rw] boxes
#   @return [Array, nil]
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] password
#   @return [String]
#
# @!attribute [rw] role
#   @return [String, nil]
UserCreateData = Struct.new(
  :boxes,
  :createdAt,
  :email,
  :id,
  :name,
  :password,
  :role,
  keyword_init: true
)

