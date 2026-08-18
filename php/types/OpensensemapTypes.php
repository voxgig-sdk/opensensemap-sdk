<?php
declare(strict_types=1);

// Typed models for the Opensensemap SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Box entity data model. */
class Box
{
    public ?string $createdAt = null;
    public ?string $description = null;
    public ?string $exposure = null;
    public ?string $grouptag = null;
    public ?string $id = null;
    public ?array $location = null;
    public ?string $model = null;
    public ?string $name = null;
    public ?array $sensors = null;
    public ?string $updatedAt = null;
    public ?string $value = null;
}

/** Request payload for Box#load. */
class BoxLoadMatch
{
    public string $id;
}

/** Request payload for Box#list. */
class BoxListMatch
{
    public string $box_id;
    public string $sensor_id;
}

/** Request payload for Box#create. */
class BoxCreateData
{
    public ?string $createdAt = null;
    public ?string $description = null;
    public ?string $exposure = null;
    public ?string $grouptag = null;
    public ?string $id = null;
    public ?array $location = null;
    public ?string $model = null;
    public ?string $name = null;
    public ?array $sensors = null;
    public ?string $updatedAt = null;
    public ?string $value = null;
}

/** Request payload for Box#update. */
class BoxUpdateData
{
    public string $id;
    public ?string $createdAt = null;
    public ?string $description = null;
    public ?string $exposure = null;
    public ?string $grouptag = null;
    public ?array $location = null;
    public ?string $model = null;
    public ?string $name = null;
    public ?array $sensors = null;
    public ?string $updatedAt = null;
    public ?string $value = null;
}

/** Request payload for Box#remove. */
class BoxRemoveMatch
{
    public string $id;
}

/** Measurement entity data model. */
class Measurement
{
}

/** Request payload for Measurement#create. */
class MeasurementCreateData
{
    public string $box_id;
}

/** Sensor entity data model. */
class Sensor
{
    public ?string $icon = null;
    public ?string $id = null;
    public ?array $lastMeasurement = null;
    public ?string $sensorType = null;
    public ?string $title = null;
    public ?string $unit = null;
}

/** Request payload for Sensor#list. */
class SensorListMatch
{
    public string $box_id;
}

/** Statistic entity data model. */
class Statistic
{
    public ?int $count = null;
    public ?float $max = null;
    public ?float $mean = null;
    public ?float $median = null;
    public ?float $min = null;
    public ?float $sum = null;
}

/** Request payload for Statistic#load. */
class StatisticLoadMatch
{
    public ?int $count = null;
    public ?float $max = null;
    public ?float $mean = null;
    public ?float $median = null;
    public ?float $min = null;
    public ?float $sum = null;
}

/** User entity data model. */
class User
{
    public ?array $boxes = null;
    public ?string $createdAt = null;
    public string $email;
    public ?string $id = null;
    public string $name;
    public string $password;
    public ?string $role = null;
}

/** Request payload for User#list. */
class UserListMatch
{
    public ?array $boxes = null;
    public ?string $createdAt = null;
    public ?string $email = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?string $password = null;
    public ?string $role = null;
}

/** Request payload for User#create. */
class UserCreateData
{
    public ?array $boxes = null;
    public ?string $createdAt = null;
    public string $email;
    public ?string $id = null;
    public string $name;
    public string $password;
    public ?string $role = null;
}

