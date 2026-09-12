import { OpensensemapEntityBase } from '../OpensensemapEntityBase';
import type { OpensensemapSDK } from '../OpensensemapSDK';
import type { Control } from '../types';
import type { Sensor, SensorListMatch } from '../OpensensemapTypes';
declare class SensorEntity extends OpensensemapEntityBase<Sensor> {
    constructor(client: OpensensemapSDK, entopts: any);
    make(this: SensorEntity): SensorEntity;
    list(this: any, reqmatch?: SensorListMatch, ctrl?: Control): Promise<SensorEntity[]>;
}
export { SensorEntity };
