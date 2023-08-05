export default class Ship {
  private _isVertical: boolean;
  private _size: number;
  hits: number;
  sunked: boolean;

  get isVertical() {
    return this._isVertical;
  }

  set isVertical(value: boolean) {
    this._isVertical = value;
  }

  get size() {
    return this._size;
  }

  constructor(size = 1) {
    this._size = size;
    this.hits = 0;
    this.sunked = false;
    this._isVertical = false;
  }

  // Increment the hits of the ship
  hit() {
    if (this.hits < this.size) {
      this.hits += 1;
    }
    return this.hits;
  }

  // Check if boat was sunked
  isSunk() {
    if (this.hits === this.size) return true;
    return false;
  }
}
