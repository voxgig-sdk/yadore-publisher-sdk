import { YadorePublisherEntityBase } from '../YadorePublisherEntityBase';
import type { YadorePublisherSDK } from '../YadorePublisherSDK';
import type { Control } from '../types';
import type { ReportModified, ReportModifiedLoadMatch } from '../YadorePublisherTypes';
declare class ReportModifiedEntity extends YadorePublisherEntityBase<ReportModified> {
    constructor(client: YadorePublisherSDK, entopts: any);
    make(this: ReportModifiedEntity): ReportModifiedEntity;
    load(this: any, reqmatch?: ReportModifiedLoadMatch, ctrl?: Control): Promise<ReportModifiedEntity>;
}
export { ReportModifiedEntity };
