import {Operator} from './operator';

export class Filter {
  private _column: string;
  private _operator: Operator;
  private _value: Array<any> | string | number | boolean;

  constructor(column?: string, operator?: Operator, value?: Array<any> | string | number | boolean) {
    this._column = column;
    this._operator = operator;
    this._value = value;
  }

  get column(): string {
    return this._column;
  }

  set column(value: string) {
    this._column = value;
  }

  get operator(): Operator {
    return this._operator;
  }

  set operator(value: Operator) {
    this._operator = value;
  }

  get value(): Array<any> | string | number | boolean {
    return this._value;
  }

  set value(value: Array<any> | string | number | boolean) {
    this._value = value;
  }
}
