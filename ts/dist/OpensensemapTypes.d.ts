export interface Box {
    createdAt?: string;
    description?: string;
    exposure?: string;
    grouptag?: string;
    id?: string;
    location?: Record<string, any>;
    model?: string;
    name?: string;
    sensors?: any[];
    updatedAt?: string;
    value?: string;
}
export interface BoxLoadMatch {
    id: string;
    format?: string;
}
export interface BoxListMatch {
    box_id: string;
    sensor_id: string;
    format?: string;
    from_date?: string;
    to_date?: string;
}
export interface BoxCreateData {
    createdAt?: string;
    description?: string;
    exposure?: string;
    grouptag?: string;
    id?: string;
    location?: Record<string, any>;
    model?: string;
    name?: string;
    sensors?: any[];
    updatedAt?: string;
    value?: string;
    $action?: string;
    [action: string]: any;
}
export interface BoxUpdateData {
    id: string;
    createdAt?: string;
    description?: string;
    exposure?: string;
    grouptag?: string;
    location?: Record<string, any>;
    model?: string;
    name?: string;
    sensors?: any[];
    updatedAt?: string;
    value?: string;
}
export interface BoxRemoveMatch {
    id: string;
}
export interface Sensor {
    icon?: string;
    id?: string;
    lastMeasurement?: Record<string, any>;
    sensorType?: string;
    title?: string;
    unit?: string;
}
export interface SensorListMatch {
    box_id: string;
}
export interface Statistic {
    count?: number;
    max?: number;
    mean?: number;
    median?: number;
    min?: number;
    sum?: number;
}
export interface StatisticLoadMatch {
    box_id?: string;
    from_date?: string;
    sensor_id?: string;
    to_date?: string;
    $action?: string;
    [action: string]: any;
}
export interface User {
    boxes?: any[];
    createdAt?: string;
    email?: string;
    id?: string;
    name?: string;
    role?: string;
}
export interface UserListMatch {
    boxes?: any[];
    createdAt?: string;
    email?: string;
    id?: string;
    name?: string;
    role?: string;
    $action?: string;
    [action: string]: any;
}
export interface UserCreateData {
    boxes?: any[];
    createdAt?: string;
    email?: string;
    id?: string;
    name?: string;
    role?: string;
    $action?: string;
    [action: string]: any;
}
