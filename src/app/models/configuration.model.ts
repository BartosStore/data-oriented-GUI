import { BatchType } from '../enums/batch-type';
import { BatchStatus } from './batch.model';

export interface IConfigurationDto {
  autoStart: string;
  manualStart: string;
  qualityCheck: string;
}

export interface IConfiguration {
  autoStart: IConfigRecord[];
  manualStart: IConfigRecord[];
  qualityCheck: QualityCheck;
}

export interface IConfigRecord {
  batchType: BatchType;
  jobType: BatchStatus;
}

export interface ConfigTableRecordsDto {
  [key: string]: [];
}

export interface QualityCheck {
  akceptacniKriteria: AkceptacniKriteria;
  vzorekStranABVV: number;
  vzorekStranOstatni: number;
  celyVzorek: boolean;
  testovaciKriterium: number;
}

export interface AkceptacniKriteria {
  CK: number;
  VV: number;
  V: number;
  S: number;
  N: number;
}

export interface QualityControlParams {
  CK: number;
  N: number;
  S: number;
  V: number;
  VV: number;
  vzorekStranABVV: number;
  vzorekStranOstatni: number;
  celyVzorek: boolean;
  testovaciKriterium: number;
}

export enum ManualColumns {
  selectionManual = 'selectionManual',
  batchType = 'batchType',
  batchActivity = 'batchActivity',
}

export enum AutomatColumns {
  selectionManual = 'selectionAutomat',
  batchType = 'batchType',
  batchActivity = 'batchActivity',
}
