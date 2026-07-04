# Typed models for the Opensensemap SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Box:
    created_at: Optional[str] = None
    description: Optional[str] = None
    exposure: Optional[str] = None
    grouptag: Optional[str] = None
    id: Optional[str] = None
    location: Optional[dict] = None
    model: Optional[str] = None
    name: Optional[str] = None
    sensor: Optional[list] = None
    updated_at: Optional[str] = None
    value: Optional[str] = None


@dataclass
class BoxLoadMatch:
    id: str


@dataclass
class BoxListMatch:
    box_id: str
    sensor_id: str


@dataclass
class BoxCreateData:
    created_at: Optional[str] = None
    description: Optional[str] = None
    exposure: Optional[str] = None
    grouptag: Optional[str] = None
    id: Optional[str] = None
    location: Optional[dict] = None
    model: Optional[str] = None
    name: Optional[str] = None
    sensor: Optional[list] = None
    updated_at: Optional[str] = None
    value: Optional[str] = None


@dataclass
class BoxUpdateData:
    id: str


@dataclass
class BoxRemoveMatch:
    id: str


@dataclass
class Measurement:
    pass


@dataclass
class MeasurementCreateData:
    box_id: str


@dataclass
class Sensor:
    icon: Optional[str] = None
    id: Optional[str] = None
    last_measurement: Optional[dict] = None
    sensor_type: Optional[str] = None
    title: Optional[str] = None
    unit: Optional[str] = None


@dataclass
class SensorListMatch:
    box_id: str


@dataclass
class Statistic:
    count: Optional[int] = None
    max: Optional[float] = None
    mean: Optional[float] = None
    median: Optional[float] = None
    min: Optional[float] = None
    sum: Optional[float] = None


@dataclass
class StatisticLoadMatch:
    count: Optional[int] = None
    max: Optional[float] = None
    mean: Optional[float] = None
    median: Optional[float] = None
    min: Optional[float] = None
    sum: Optional[float] = None


@dataclass
class User:
    email: str
    name: str
    password: str
    box: Optional[list] = None
    created_at: Optional[str] = None
    id: Optional[str] = None
    role: Optional[str] = None
    token: Optional[str] = None
    user: Optional[dict] = None


@dataclass
class UserListMatch:
    box: Optional[list] = None
    created_at: Optional[str] = None
    email: Optional[str] = None
    id: Optional[str] = None
    name: Optional[str] = None
    password: Optional[str] = None
    role: Optional[str] = None
    token: Optional[str] = None
    user: Optional[dict] = None


@dataclass
class UserCreateData:
    box: Optional[list] = None
    created_at: Optional[str] = None
    email: Optional[str] = None
    id: Optional[str] = None
    name: Optional[str] = None
    password: Optional[str] = None
    role: Optional[str] = None
    token: Optional[str] = None
    user: Optional[dict] = None

