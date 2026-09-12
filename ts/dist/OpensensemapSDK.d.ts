import { BoxEntity } from './entity/BoxEntity';
import { SensorEntity } from './entity/SensorEntity';
import { StatisticEntity } from './entity/StatisticEntity';
import { UserEntity } from './entity/UserEntity';
export type * from './OpensensemapTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { OpensensemapEntityBase } from './OpensensemapEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class OpensensemapSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Box(entopts?: Record<string, any>): BoxEntity;
    Sensor(entopts?: Record<string, any>): SensorEntity;
    Statistic(entopts?: Record<string, any>): StatisticEntity;
    User(entopts?: Record<string, any>): UserEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): OpensensemapSDK;
    tester(testopts?: any, sdkopts?: any): OpensensemapSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof OpensensemapSDK;
export { stdutil, config, BaseFeature, OpensensemapEntityBase, OpensensemapSDK, SDK, };
