import { Context } from './Context';
declare class OpensensemapError extends Error {
    isOpensensemapError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { OpensensemapError };
