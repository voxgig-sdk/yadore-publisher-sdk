import { YadorePublisherEntityBase } from '../YadorePublisherEntityBase';
import type { YadorePublisherSDK } from '../YadorePublisherSDK';
import type { Control } from '../types';
import type { ReportGeneral, ReportGeneralLoadMatch } from '../YadorePublisherTypes';
declare class ReportGeneralEntity extends YadorePublisherEntityBase<ReportGeneral> {
    constructor(client: YadorePublisherSDK, entopts: any);
    make(this: ReportGeneralEntity): ReportGeneralEntity;
    load(this: any, reqmatch?: ReportGeneralLoadMatch, ctrl?: Control): Promise<ReportGeneralEntity>;
}
export { ReportGeneralEntity };
