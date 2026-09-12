import { YadorePublisherEntityBase } from '../YadorePublisherEntityBase';
import type { YadorePublisherSDK } from '../YadorePublisherSDK';
import type { Control } from '../types';
import type { DeeplinkMerchant, DeeplinkMerchantListMatch } from '../YadorePublisherTypes';
declare class DeeplinkMerchantEntity extends YadorePublisherEntityBase<DeeplinkMerchant> {
    constructor(client: YadorePublisherSDK, entopts: any);
    make(this: DeeplinkMerchantEntity): DeeplinkMerchantEntity;
    list(this: any, reqmatch?: DeeplinkMerchantListMatch, ctrl?: Control): Promise<DeeplinkMerchantEntity[]>;
}
export { DeeplinkMerchantEntity };
