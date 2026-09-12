import { YadorePublisherEntityBase } from '../YadorePublisherEntityBase';
import type { YadorePublisherSDK } from '../YadorePublisherSDK';
import type { Control } from '../types';
import type { Merchant, MerchantListMatch } from '../YadorePublisherTypes';
declare class MerchantEntity extends YadorePublisherEntityBase<Merchant> {
    constructor(client: YadorePublisherSDK, entopts: any);
    make(this: MerchantEntity): MerchantEntity;
    list(this: any, reqmatch?: MerchantListMatch, ctrl?: Control): Promise<MerchantEntity[]>;
}
export { MerchantEntity };
