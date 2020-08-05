export class Paging {
  private _page: number;
  private _size: number;
  private _total: number;

  constructor(page?: number, size?: number) {
    this._page = page || 1;
    this._size = size || 10;
  }

  get page(): number {
    return this._page;
  }

  set page(value: number) {
    this._page = value;
  }

  get size(): number {
    return this._size;
  }

  set size(value: number) {
    this._size = value;
  }

  get total(): number {
    return this._total;
  }

  set total(value: number) {
    this._total = value;
  }

  get matPage(): number {
    return this._page - 1;
  }

  set matPage(page: number) {
    this._page = page + 1;
  }
}
