export default class Ship {
  isVertical: boolean;
  size: number;
  hits: number;
  sunked: boolean;

  constructor(size = 1) {
    this.size = size;
    this.hits = 0;
    this.sunked = false;
    this.isVertical = false;
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
