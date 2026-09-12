import { YadorePublisherEntityBase } from '../YadorePublisherEntityBase';
import type { YadorePublisherSDK } from '../YadorePublisherSDK';
import type { Control } from '../types';
import type { Deeplink, DeeplinkCreateData } from '../YadorePublisherTypes';
declare class DeeplinkEntity extends YadorePublisherEntityBase<Deeplink> {
    constructor(client: YadorePublisherSDK, entopts: any);
    make(this: DeeplinkEntity): DeeplinkEntity;
    create(this: any, reqdata?: DeeplinkCreateData, ctrl?: Control): Promise<DeeplinkEntity>;
}
export { DeeplinkEntity };
