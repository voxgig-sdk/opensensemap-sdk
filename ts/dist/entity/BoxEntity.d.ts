import { OpensensemapEntityBase } from '../OpensensemapEntityBase';
import type { OpensensemapSDK } from '../OpensensemapSDK';
import type { Control } from '../types';
import type { Box, BoxLoadMatch, BoxListMatch, BoxCreateData, BoxUpdateData, BoxRemoveMatch } from '../OpensensemapTypes';
declare class BoxEntity extends OpensensemapEntityBase<Box> {
    constructor(client: OpensensemapSDK, entopts: any);
    make(this: BoxEntity): BoxEntity;
    load(this: any, reqmatch?: BoxLoadMatch, ctrl?: Control): Promise<BoxEntity>;
    list(this: any, reqmatch?: BoxListMatch, ctrl?: Control): Promise<BoxEntity[]>;
    create(this: any, reqdata?: BoxCreateData, ctrl?: Control): Promise<BoxEntity>;
    update(this: any, reqdata?: BoxUpdateData, ctrl?: Control): Promise<BoxEntity>;
    remove(this: any, reqmatch?: BoxRemoveMatch, ctrl?: Control): Promise<BoxEntity>;
}
export { BoxEntity };
