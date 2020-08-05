import {TableDto} from './table-dto';
import {Sorter} from './sorter';
import {Paging} from './paging';
import {Direction} from './direction';
import {Operator} from './operator';
import {Filter} from './filter';

interface ISorter {
  column: string;
  direction: Direction;
}

interface IFilter {
  column: string;
  operator: Operator;
  value: any;
}

export interface IGridResponse {
  items: Array<object>;
  filters: Array<IFilter>;
  sorters: Array<ISorter>;
  paging: {
    page: number;
    size: number;
    total: number;
  };
}


export class TableUtils {
  public static toQuery(dto: TableDto): {}  {
    const q = {};

    if (dto.sorter) {
      q[`_sorter:${dto.sorter.column}`] = dto.sorter.direction;
    }

    if (dto.paging) {
      q[`_page`] = dto.paging.page;
      q[`_size`] = dto.paging.size;
    }

    if (dto.filter) {
      dto.filter.forEach((item, index) => {
        q[`_filter:${item.column}:${item.operator}:${index}`] = Array.isArray(item.value) ? item.value.join(',') : item.value;
      });
    }

    return q;
  }

  public static fromData(data: IGridResponse): TableDto {
    const dto = new TableDto();
    dto.items = data.items;
    dto.sorter = new Sorter(data.sorters[0].direction, data.sorters[0].column);

    const paging = new Paging(data.paging.page, data.paging.size);
    paging.total = data.paging.total;
    dto.paging = paging;

    for (const item of data.filters) {
      dto.filter.push(new Filter(item.column, item.operator, item.value));
    }

    return dto;
  }
}
