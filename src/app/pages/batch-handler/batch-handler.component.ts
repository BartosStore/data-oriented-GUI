import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BatchService } from 'src/app/services/batch/batch.service';
import { environment } from 'src/environments/environment';
import { Direction, Sorter, TableDto, Operator } from '../../components/table';
import { TableUtils } from '../../components/table/table-utils';
import { BatchColumn, IBatch, BatchStatus } from '../../models/batch.model';
import { Filter } from 'src/app/components/table/filter';
import { BatchType } from 'src/app/enums/batch-type';

@Component({
  selector: 'app-batch-handler',
  templateUrl: './batch-handler.component.html',
})
export class BatchHandlerComponent implements OnInit, OnDestroy {
  timer: NodeJS.Timer;
  loading = false;

  tableDto: TableDto = new TableDto();

  constructor(private batchService: BatchService, private route: ActivatedRoute) {
    this.tableDto.sorter = new Sorter(Direction.DESC, BatchColumn.casZalozeni);
  }

  ngOnInit(): void {
    this.fetchBatchData(this.tableDto);
  }

  ngOnDestroy() {
    this.stopPeriodicFetching();
  }

  batchOnChange = (table: TableDto) => {
    this.fetchBatchData(table);
  }

  private fetchBatchData(table: TableDto) {
    this.stopPeriodicFetching();
    this.loading = true;

    const { queryParamMap } = this.route.snapshot;

    if (queryParamMap.has('batchId') && queryParamMap.has('batchType')) {
      table.filter.push(new Filter('id', Operator.EQ, queryParamMap.get('batchId')));
      table.filter.push(new Filter('typ', Operator.EQ, queryParamMap.get('batchType')));
    }

    setTimeout(() => {
      const container = new TableDto();
      const audits: object[] = [
        { id: 1, cislo: '1rrfxvsd89sa', casZalozeni: '08/01/2020', duvodZmenyStavu: 'test', pocet: 718, pozastaveno: false, stav: BatchStatus.PREVZATA, typ: BatchType.ESF },
        { id: 2, cislo: 'ar7fxvsd89sa', casZalozeni: '08/02/2020', duvodZmenyStavu: 'test', pocet: 644, pozastaveno: true, stav: BatchStatus.PREVZATA, typ: BatchType.DUP },
        { id: 3, cislo: 'grrf8vsd89sa', casZalozeni: '08/03/2020', duvodZmenyStavu: 'test', pocet: 644, pozastaveno: true, stav: BatchStatus.PREVZATA, typ: BatchType.DUP },
        { id: 4, cislo: 'vrrfxvsd89sa', casZalozeni: '08/04/2020', duvodZmenyStavu: 'test', pocet: 644, pozastaveno: true, stav: BatchStatus.CHYBA_POLE, typ: BatchType.DUP },
        { id: 5, cislo: 'hrr6xvsd89sa', casZalozeni: '08/05/2020', duvodZmenyStavu: 'test', pocet: 644, pozastaveno: true, stav: BatchStatus.PREVZATA, typ: BatchType.DUP },
        { id: 6, cislo: 'rrrfxv4d89sa', casZalozeni: '08/06/2020', duvodZmenyStavu: 'test', pocet: 644, pozastaveno: true, stav: BatchStatus.ZALOZENA, typ: BatchType.DUP }
      ];
      container.items = audits;
      this.tableDto = container;
      this.loading = false;
    }, 2000);

    /*
    this.batchService.fetchBatch(table).subscribe(batchData => {
      this.tableDto = TableUtils.fromData(batchData);
      this.startPeriodicFetching();
    }).add(() => {
      this.loading = false;
    });
    */
  }

  batchStartRequest = (batch: IBatch) => {
    this.batchService.startBatch(batch).subscribe(() => {
      this.fetchBatchData(this.tableDto);
    });
  }

  private startPeriodicFetching() {
    this.timer = setInterval(() => this.fetchBatchData(this.tableDto), environment.batchesFetchInterval);
  }

  private stopPeriodicFetching() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
