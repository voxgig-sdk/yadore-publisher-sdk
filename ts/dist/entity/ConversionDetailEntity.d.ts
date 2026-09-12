import { YadorePublisherEntityBase } from '../YadorePublisherEntityBase';
import type { YadorePublisherSDK } from '../YadorePublisherSDK';
import type { Control } from '../types';
import type { ConversionDetail, ConversionDetailListMatch } from '../YadorePublisherTypes';
declare class ConversionDetailEntity extends YadorePublisherEntityBase<ConversionDetail> {
    constructor(client: YadorePublisherSDK, entopts: any);
    make(this: ConversionDetailEntity): ConversionDetailEntity;
    list(this: any, reqmatch?: ConversionDetailListMatch, ctrl?: Control): Promise<ConversionDetailEntity[]>;
}
export { ConversionDetailEntity };
