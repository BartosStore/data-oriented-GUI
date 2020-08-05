import { Component, Input } from '@angular/core';
import { Direction, Paging, Sorter, TableDto } from '../../table';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { Filter } from '../../table/filter';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  template: ''
})
export abstract class BaseTableComponent {
  @Input() tableLoading: boolean;
  @Input() tableDto: TableDto;
  @Input() tableOnChange: (dto: TableDto) => void;

  rowPerPage: number[] = [5, 10, 25, 100];
  visibleColumns: string[] = [];
  selection: SelectionModel<object>;

  SELECTION_ID = 'select';

  protected constructor() {
    this.visibleColumns = this.getVisibleColumn();
    this.selection = new SelectionModel<object>(true, []);
  }

  protected allowSelection() {
    const columns = this.getVisibleColumn();
    columns.unshift(this.SELECTION_ID);
    this.visibleColumns = columns;
  }

  onChangeSort(sort: Sort) {
    const dto = this.tableDto.copy();
    dto.sorter = new Sorter(sort.direction === 'asc' ? Direction.ASC : Direction.DESC, sort.active);
    this.tableOnChange(dto);
  }

  onChangePaging(pageEvent: PageEvent) {
    const dto = this.tableDto.copy();
    const paging = new Paging();
    paging.matPage = pageEvent.pageIndex;
    paging.size = pageEvent.pageSize;

    dto.paging = paging;
    this.tableOnChange(dto);
  }

  onChangeFilter = (values: object) => {
    const dto = this.tableDto.copy();

    dto.filter = this.prepareFilter(values);

    this.tableOnChange(dto);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tableDto.items.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.tableDto.items.forEach(row => this.selection.select(row));
  }

  public abstract prepareFilter(values: object): Array<Filter>;

  public abstract getVisibleColumn(): string[];
}
