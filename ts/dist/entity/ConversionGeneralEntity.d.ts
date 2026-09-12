import { YadorePublisherEntityBase } from '../YadorePublisherEntityBase';
import type { YadorePublisherSDK } from '../YadorePublisherSDK';
import type { Control } from '../types';
import type { ConversionGeneral, ConversionGeneralLoadMatch } from '../YadorePublisherTypes';
declare class ConversionGeneralEntity extends YadorePublisherEntityBase<ConversionGeneral> {
    constructor(client: YadorePublisherSDK, entopts: any);
    make(this: ConversionGeneralEntity): ConversionGeneralEntity;
    load(this: any, reqmatch?: ConversionGeneralLoadMatch, ctrl?: Control): Promise<ConversionGeneralEntity>;
}
export { ConversionGeneralEntity };
