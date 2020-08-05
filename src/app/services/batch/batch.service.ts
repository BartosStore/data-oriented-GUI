import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IBatch } from 'src/app/models/batch.model';
import { catchError } from 'rxjs/operators';
import { HttpService, IStatus } from '../http-service';
import { TableDto } from '../../components/table';
import { IGridResponse, TableUtils } from '../../components/table/table-utils';
import { BatchType } from '../../enums/batch-type';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BatchService {
  private url: string = environment.backend.apiBaseUrl;

  constructor(private client: HttpClient) {
  }

  fetchBatch(dto: TableDto): Observable<IGridResponse> {
    return this.client
      .get<IGridResponse>(`${this.url}/grids/batches`, { params: TableUtils.toQuery(dto) })
      .pipe(catchError(HttpService.handleError));
  }

  fetchBatchDetail(batchId: number, type: BatchType): Observable<IBatch> {
    return this.client
      .get<IBatch>(`${this.url}/${type.toLowerCase()}-batches/${batchId}`)
      .pipe(catchError(HttpService.handleError));
  }

  startBatch(batch: IBatch): Observable<IStatus> {
    return this.client
      .get<IStatus>(`${this.url}/${batch.typ.toLowerCase()}-batches/start/${batch.id}`)
      .pipe(catchError(HttpService.handleError));
  }
}
