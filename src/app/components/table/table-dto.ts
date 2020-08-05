import { Sorter } from './sorter';
import { Paging } from './paging';
import { Filter } from './filter';
import { BatchColumn } from 'src/app/models/batch.model';
import { Operator } from './operator';

export class TableDto {
  private _sorter: Sorter;
  private _paging: Paging;
  private _filter: Array<Filter>;
  private _items: any;

  constructor() {
    this._paging = new Paging();
    this._filter = [];
    this._items = [];
  }

  get sorter(): Sorter {
    return this._sorter;
  }

  set sorter(value: Sorter) {
    this._sorter = value;
  }

  get paging(): Paging {
    return this._paging;
  }

  set paging(value: Paging) {
    this._paging = value;
  }

  get items(): any {
    return this._items;
  }

  set items(value: any) {
    this._items = value;
  }

  get filter(): Array<Filter> {
    return this._filter;
  }

  set filter(value: Array<Filter>) {
    this._filter = value;
  }

  public copy(): TableDto {
    const table = new TableDto();
    table.sorter = new Sorter(this._sorter.direction, this._sorter.column);

    table.paging = new Paging(this._paging.page, this._paging.size);

    for (const item of this.filter) {
      table.filter.push(new Filter(item.column, item.operator, item.value));
    }

    return table;
  }
}
