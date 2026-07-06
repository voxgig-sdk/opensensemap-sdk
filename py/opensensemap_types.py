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
    created_at: str
    description: str
    exposure: str
    grouptag: str
    id: str
    location: dict
    model: str
    name: str
    sensor: list
    updated_at: str
    value: str


class BoxLoadMatch(TypedDict):
    id: str


class BoxListMatch(TypedDict):
    box_id: str
    sensor_id: str


class BoxCreateData(TypedDict, total=False):
    created_at: str
    description: str
    exposure: str
    grouptag: str
    id: str
    location: dict
    model: str
    name: str
    sensor: list
    updated_at: str
    value: str


class BoxUpdateData(TypedDict):
    id: str


class BoxRemoveMatch(TypedDict):
    id: str


class Measurement(TypedDict):
    pass


class MeasurementCreateData(TypedDict):
    box_id: str


class Sensor(TypedDict, total=False):
    icon: str
    id: str
    last_measurement: dict
    sensor_type: str
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
    count: int
    max: float
    mean: float
    median: float
    min: float
    sum: float


class UserRequired(TypedDict):
    email: str
    name: str
    password: str


class User(UserRequired, total=False):
    box: list
    created_at: str
    id: str
    role: str
    token: str
    user: dict


class UserListMatch(TypedDict, total=False):
    box: list
    created_at: str
    email: str
    id: str
    name: str
    password: str
    role: str
    token: str
    user: dict


class UserCreateDataRequired(TypedDict):
    email: str
    name: str
    password: str


class UserCreateData(UserCreateDataRequired, total=False):
    box: list
    created_at: str
    id: str
    role: str
    token: str
    user: dict
