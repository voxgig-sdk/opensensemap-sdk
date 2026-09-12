import { OpensensemapEntityBase } from '../OpensensemapEntityBase';
import type { OpensensemapSDK } from '../OpensensemapSDK';
import type { Control } from '../types';
import type { User, UserListMatch, UserCreateData } from '../OpensensemapTypes';
declare class UserEntity extends OpensensemapEntityBase<User> {
    constructor(client: OpensensemapSDK, entopts: any);
    make(this: UserEntity): UserEntity;
    list(this: any, reqmatch?: UserListMatch, ctrl?: Control): Promise<UserEntity[]>;
    create(this: any, reqdata?: UserCreateData, ctrl?: Control): Promise<UserEntity>;
}
export { UserEntity };
