import { OpensensemapEntityBase } from '../OpensensemapEntityBase';
import type { OpensensemapSDK } from '../OpensensemapSDK';
import type { Control } from '../types';
import type { Statistic, StatisticLoadMatch } from '../OpensensemapTypes';
declare class StatisticEntity extends OpensensemapEntityBase<Statistic> {
    constructor(client: OpensensemapSDK, entopts: any);
    make(this: StatisticEntity): StatisticEntity;
    load(this: any, reqmatch?: StatisticLoadMatch, ctrl?: Control): Promise<StatisticEntity>;
}
export { StatisticEntity };
