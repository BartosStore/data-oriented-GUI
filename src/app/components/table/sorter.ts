import {Direction} from './direction';

export class Sorter {
  private _direction: Direction;
  private _column: string;

  constructor(direction: Direction, column: string) {
    this._direction = direction;
    this._column = column;
  }
  get direction(): Direction {
    return this._direction;
  }

  set direction(value: Direction) {
    this._direction = value;
  }

  get column(): string {
    return this._column;
  }

  set column(value: string) {
    this._column = value;
  }

  get matDirection(): 'asc' | 'desc' {
    return this._direction === Direction.ASC ? 'asc' : 'desc';
  }
}
