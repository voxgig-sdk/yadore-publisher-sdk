import { YadorePublisherEntityBase } from '../YadorePublisherEntityBase';
import type { YadorePublisherSDK } from '../YadorePublisherSDK';
import type { Control } from '../types';
import type { Offer, OfferLoadMatch, OfferListMatch } from '../YadorePublisherTypes';
declare class OfferEntity extends YadorePublisherEntityBase<Offer> {
    constructor(client: YadorePublisherSDK, entopts: any);
    make(this: OfferEntity): OfferEntity;
    load(this: any, reqmatch?: OfferLoadMatch, ctrl?: Control): Promise<OfferEntity>;
    list(this: any, reqmatch?: OfferListMatch, ctrl?: Control): Promise<OfferEntity[]>;
}
export { OfferEntity };
