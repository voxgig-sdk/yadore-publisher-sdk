import { YadorePublisherEntityBase } from '../YadorePublisherEntityBase';
import type { YadorePublisherSDK } from '../YadorePublisherSDK';
import type { Control } from '../types';
import type { ReportStatus, ReportStatusLoadMatch } from '../YadorePublisherTypes';
declare class ReportStatusEntity extends YadorePublisherEntityBase<ReportStatus> {
    constructor(client: YadorePublisherSDK, entopts: any);
    make(this: ReportStatusEntity): ReportStatusEntity;
    load(this: any, reqmatch?: ReportStatusLoadMatch, ctrl?: Control): Promise<ReportStatusEntity>;
}
export { ReportStatusEntity };
