import {TestBed, getTestBed, fakeAsync} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import {BatchService} from './batch.service';
import {IBatch} from 'src/app/models/batch.model';
import {IGridResponse} from '../../components/table/table-utils';
import {Direction, TableDto} from '../../components/table';
import {BatchType} from '../../enums/batch-type';

describe('BatchService', () => {
  let injector: TestBed;
  let service: BatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BatchService]
    });
    injector = getTestBed();
    service = injector.inject(BatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<IBatchResponse>', fakeAsync((done: DoneFn) => {
    // given
    const dummyBatches: IBatch[] = [
      {
        id: 1, casZalozeni: '', pocet: 100, stav: '', typ: 'TP' as BatchType,
        duvodZmenyStavu: '', pozastaveno: null
      },
      {
        id: 2, casZalozeni: '', pocet: 100, stav: '', typ: 'ONL' as BatchType,
        duvodZmenyStavu: '', pozastaveno: null
      }
    ];
    const dummyResponse: IGridResponse = {
      items: dummyBatches,
      filters: [],
      paging: {page: 1, size: 5, total: 10},
      sorters: [{column: 'pocet', direction: Direction.ASC}]
    };

    // when
    service.fetchBatch(new TableDto()).subscribe(batches => {
      // then
      expect(batches.items.length).toBe(2);
      expect(batches).toEqual(dummyResponse);
      done();
    });

  }));
});
