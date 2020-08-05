import { BatchType } from '../enums/batch-type';

export interface IBatch {
  id: number;
  stav: string;
  casZalozeni: string;
  pocet: number;
  typ: BatchType;
  duvodZmenyStavu: string;
  pozastaveno: boolean;
}

export type IBatchFilter = {
  isNotProcessed: boolean;
  isPaused: boolean;
  batchType: string;
  dateFrom: string;
  dateTo: string;
};

export enum BatchColumn {
  casZalozeni = 'casZalozeni',
  typ = 'typ',
  cislo = 'cislo',
  pocet = 'pocet',
  stav = 'stav',
  souvisejiciUdaje = 'souvisejiciUdaje',
  pozastaveno = 'pozastaveno',
}

export enum BatchStatus {
  ZALOZENA = 'ZALOZENA',
  PRIJATA = 'PRIJATA',
  FORMALNE_OK = 'FORMALNE_OK',
  KONTROLA_KVALITY = 'KONTROLA_KVALITY',
  PREVZATA = 'PREVZATA',
  CHYBA_PREDANI = 'CHYBA_PREDANI',
  CHYBA_PRED = 'CHYBA_PRED',
  CHYBA_XSD = 'CHYBA_XSD',
  CHYBA_POLE = 'CHYBA_POLE',
  CHYBA_OBSAHU = 'CHYBA_OBSAHU',
  CHYBA_KVALITA = 'CHYBA_KVALITA'
}

export enum LsfBatchStatus {
  ZALOZENA = 'ZALOZENA',
  PRIJATA = 'PRIJATA',
  FORMALNE_OK = 'FORMALNE_OK',
  KONTROLA_KVALITY = 'KONTROLA_KVALITY',
  PREVZATA = 'PREVZATA',
  CHYBA_PREDANI = 'CHYBA_PREDANI',
  CHYBA_XSD = 'CHYBA_XSD',
  CHYBA_POLE = 'CHYBA_POLE',
  CHYBA_OBSAHU = 'CHYBA_OBSAHU',
  CHYBA_KVALITA = 'CHYBA_KVALITA'
}

export enum EfsBatchStatus {
  ZALOZENA = 'ZALOZENA',
  PRIJATA = 'PRIJATA',
  CHYBA_PREDANI = 'CHYBA_PREDANI',
  FORMALNE_OK = 'FORMALNE_OK',
  CHYBA_OBSAHU = 'CHYBA_OBSAHU',
  PREVZATA = 'PREVZATA',
}

export enum DupBatchStatus {
  ZALOZENA = 'ZALOZENA',
  PRIJATA = 'PRIJATA',
  CHYBA_PRED = 'CHYBA_PRED',
  FORMALNE_OK = 'FORMALNE_OK',
  CHYBA_OBSAHU = 'CHYBA_OBSAHU',
  PREVZATA = 'PREVZATA',
}
