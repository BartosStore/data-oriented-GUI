import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'toLocalDateTime'})
export class ToLocalDateTimePipe implements PipeTransform {
  transform(datetime: string): string {
    if (!moment(datetime).isValid()) {
      return datetime;
    }

    return moment(datetime).locale('cs').format('lll');
  }
}
