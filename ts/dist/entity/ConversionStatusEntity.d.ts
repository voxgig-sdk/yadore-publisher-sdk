import { YadorePublisherEntityBase } from '../YadorePublisherEntityBase';
import type { YadorePublisherSDK } from '../YadorePublisherSDK';
import type { Control } from '../types';
import type { ConversionStatus, ConversionStatusLoadMatch } from '../YadorePublisherTypes';
declare class ConversionStatusEntity extends YadorePublisherEntityBase<ConversionStatus> {
    constructor(client: YadorePublisherSDK, entopts: any);
    make(this: ConversionStatusEntity): ConversionStatusEntity;
    load(this: any, reqmatch?: ConversionStatusLoadMatch, ctrl?: Control): Promise<ConversionStatusEntity>;
}
export { ConversionStatusEntity };
