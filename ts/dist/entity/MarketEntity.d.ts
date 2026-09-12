import { YadorePublisherEntityBase } from '../YadorePublisherEntityBase';
import type { YadorePublisherSDK } from '../YadorePublisherSDK';
import type { Control } from '../types';
import type { Market, MarketListMatch } from '../YadorePublisherTypes';
declare class MarketEntity extends YadorePublisherEntityBase<Market> {
    constructor(client: YadorePublisherSDK, entopts: any);
    make(this: MarketEntity): MarketEntity;
    list(this: any, reqmatch?: MarketListMatch, ctrl?: Control): Promise<MarketEntity[]>;
}
export { MarketEntity };
