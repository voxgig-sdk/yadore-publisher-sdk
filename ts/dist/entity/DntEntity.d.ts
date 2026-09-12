import { YadorePublisherEntityBase } from '../YadorePublisherEntityBase';
import type { YadorePublisherSDK } from '../YadorePublisherSDK';
import type { Control } from '../types';
import type { Dnt, DntLoadMatch } from '../YadorePublisherTypes';
declare class DntEntity extends YadorePublisherEntityBase<Dnt> {
    constructor(client: YadorePublisherSDK, entopts: any);
    make(this: DntEntity): DntEntity;
    load(this: any, reqmatch?: DntLoadMatch, ctrl?: Control): Promise<DntEntity>;
}
export { DntEntity };
