import { YadorePublisherEntityBase } from '../YadorePublisherEntityBase';
import type { YadorePublisherSDK } from '../YadorePublisherSDK';
import type { Control } from '../types';
import type { ReportDetail, ReportDetailListMatch } from '../YadorePublisherTypes';
declare class ReportDetailEntity extends YadorePublisherEntityBase<ReportDetail> {
    constructor(client: YadorePublisherSDK, entopts: any);
    make(this: ReportDetailEntity): ReportDetailEntity;
    list(this: any, reqmatch?: ReportDetailListMatch, ctrl?: Control): Promise<ReportDetailEntity[]>;
}
export { ReportDetailEntity };
