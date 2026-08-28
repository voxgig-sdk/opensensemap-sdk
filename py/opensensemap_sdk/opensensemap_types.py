# Typed models for the Opensensemap SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Box(TypedDict, total=False):
    createdAt: str
    description: str
    exposure: str
    grouptag: str
    id: str
    location: dict
    model: str
    name: str
    sensors: list
    updatedAt: str
    value: str


class BoxLoadMatchRequired(TypedDict):
    id: str


class BoxLoadMatch(BoxLoadMatchRequired, total=False):
    format: str


class BoxListMatchRequired(TypedDict):
    box_id: str
    sensor_id: str


class BoxListMatch(BoxListMatchRequired, total=False):
    format: str
    from_date: str
    to_date: str


class BoxCreateData(TypedDict, total=False):
    createdAt: str
    description: str
    exposure: str
    grouptag: str
    id: str
    location: dict
    model: str
    name: str
    sensors: list
    updatedAt: str
    value: str


class BoxUpdateDataRequired(TypedDict):
    id: str


class BoxUpdateData(BoxUpdateDataRequired, total=False):
    createdAt: str
    description: str
    exposure: str
    grouptag: str
    location: dict
    model: str
    name: str
    sensors: list
    updatedAt: str
    value: str


class BoxRemoveMatch(TypedDict):
    id: str


class Measurement(TypedDict):
    pass


class MeasurementCreateData(TypedDict):
    box_id: str


class Sensor(TypedDict, total=False):
    icon: str
    id: str
    lastMeasurement: dict
    sensorType: str
    title: str
    unit: str


class SensorListMatch(TypedDict):
    box_id: str


class Statistic(TypedDict, total=False):
    count: int
    max: float
    mean: float
    median: float
    min: float
    sum: float


class StatisticLoadMatch(TypedDict, total=False):
    box_id: str
    from_date: str
    sensor_id: str
    to_date: str


class UserRequired(TypedDict):
    email: str
    name: str
    password: str


class User(UserRequired, total=False):
    boxes: list
    createdAt: str
    id: str
    role: str


class UserListMatch(TypedDict, total=False):
    boxes: list
    createdAt: str
    email: str
    id: str
    name: str
    password: str
    role: str


class UserCreateDataRequired(TypedDict):
    email: str
    name: str
    password: str


class UserCreateData(UserCreateDataRequired, total=False):
    boxes: list
    createdAt: str
    id: str
    role: str
