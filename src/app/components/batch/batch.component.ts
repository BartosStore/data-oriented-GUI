import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

import {
  BatchColumn,
  LsfBatchStatus,
  IBatch,
  IBatchFilter,
  EfsBatchStatus,
  DupBatchStatus
} from 'src/app/models/batch.model';
import { ControlStateDialogComponent } from './control-state-dialog/control-state-dialog.component';
import { BaseTableComponent } from '../common/table/base-table.component';
import { Operator } from '../table';
import { Filter } from '../table/filter';
import { RouterService } from '../../services/router.service';
import { ROUTES } from '../../enums/routes';
import { BatchType } from '../../enums/batch-type';

const FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss']
})
export class BatchComponent extends BaseTableComponent implements OnInit {
  @Input() batchStartRequest: (batch: IBatch) => void;
  ROUTES = ROUTES;
  colums = BatchColumn;

  constructor(public dialog: MatDialog, public rs: RouterService) {
    super();
  }

  getVisibleColumn(): string[] {
    return [
      BatchColumn.casZalozeni,
      BatchColumn.typ,
      BatchColumn.cislo,
      BatchColumn.pocet,
      BatchColumn.stav,
      BatchColumn.souvisejiciUdaje
    ];
  }

  ngOnInit(): void {
  }

  prepareFilter(values: IBatchFilter): Array<Filter> {
    const filters = [];

    if (values.batchType) {
      filters.push(new Filter(BatchColumn.typ, Operator.EQ, values.batchType));
    }

    if (values.dateFrom && values.dateTo) {
      filters.push(new Filter(
        BatchColumn.casZalozeni,
        Operator.BETWEEN,
        [
          moment(values.dateFrom).startOf('day').format(FORMAT),
          moment(values.dateTo).endOf('day').format(FORMAT)
        ]
      ));
    }

    if (values.isPaused) {
      filters.push(new Filter(BatchColumn.pozastaveno, Operator.EQ, values.isPaused));
    }

    if (values.isNotProcessed) {
      filters.push(new Filter(BatchColumn.typ, Operator.NIN, []));
    }

    return filters;
  }

  batchStart(batch: IBatch) {
    this.batchStartRequest(batch);
  }

  calculateProgress(batch: IBatch): number {
    switch (batch.typ) {
      case BatchType.LSF:
        switch (batch.stav) {
          case LsfBatchStatus.ZALOZENA:
            return 20;
          case LsfBatchStatus.PRIJATA:
            return 40;
          case LsfBatchStatus.FORMALNE_OK:
            return 60;
          case LsfBatchStatus.KONTROLA_KVALITY:
            return 80;
          default:
            throw new Error(`Unsupported lsf batch status ${batch.stav}.`);
        }
      case BatchType.ESF:
        switch (batch.stav) {
          case EfsBatchStatus.ZALOZENA:
            return 25;
          case EfsBatchStatus.PRIJATA:
            return 50;
          case EfsBatchStatus.FORMALNE_OK:
            return 75;
          default:
            throw new Error(`Unsupported efs batch status ${batch.stav}.`);
        }
      case BatchType.DUP:
        switch (batch.stav) {
          case DupBatchStatus.ZALOZENA:
            return 25;
          case DupBatchStatus.PRIJATA:
            return 50;
          case DupBatchStatus.FORMALNE_OK:
            return 75;
          default:
            throw new Error(`Unsupported dup batch status ${batch.stav}.`);
        }
      default:
        throw new Error(`Unsupported batch type ${batch.typ}.`);
    }
  }

  displayControlState(batch: IBatch) {
    this.dialog.open(ControlStateDialogComponent, {
      width: '400px',
      data: batch
    });
  }

  isFinalStatus(batch: IBatch): boolean {
    switch (batch.typ) {
      case BatchType.LSF:
        return [
          LsfBatchStatus.CHYBA_PREDANI,
          LsfBatchStatus.CHYBA_XSD,
          LsfBatchStatus.CHYBA_POLE,
          LsfBatchStatus.CHYBA_OBSAHU,
          LsfBatchStatus.CHYBA_KVALITA,
          LsfBatchStatus.PREVZATA
        ].includes(batch.stav as LsfBatchStatus);
      case BatchType.ESF:
        return [
          EfsBatchStatus.CHYBA_PREDANI,
          EfsBatchStatus.CHYBA_OBSAHU,
          EfsBatchStatus.PREVZATA
        ].includes(batch.stav as EfsBatchStatus);
      case BatchType.DUP:
        return [
          DupBatchStatus.CHYBA_PRED,
          DupBatchStatus.CHYBA_OBSAHU,
          DupBatchStatus.PREVZATA
        ].includes(batch.stav as DupBatchStatus);
      default:
        throw new Error(`Unsupported batch type ${batch.typ}.`);
    }
  }

  isControlData(batch: IBatch): boolean {
    return batch.typ === BatchType.LSF && [LsfBatchStatus.FORMALNE_OK].includes(batch.stav as LsfBatchStatus);
  }
}
