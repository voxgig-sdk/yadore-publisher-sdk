import { YadorePublisherEntityBase } from '../YadorePublisherEntityBase';
import type { YadorePublisherSDK } from '../YadorePublisherSDK';
import type { Control } from '../types';
import type { ConversionDetailMerchant, ConversionDetailMerchantListMatch } from '../YadorePublisherTypes';
declare class ConversionDetailMerchantEntity extends YadorePublisherEntityBase<ConversionDetailMerchant> {
    constructor(client: YadorePublisherSDK, entopts: any);
    make(this: ConversionDetailMerchantEntity): ConversionDetailMerchantEntity;
    list(this: any, reqmatch?: ConversionDetailMerchantListMatch, ctrl?: Control): Promise<ConversionDetailMerchantEntity[]>;
}
export { ConversionDetailMerchantEntity };
