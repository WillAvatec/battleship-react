import { Coords, ShipPosition, memBoardType } from "../types/type";
import Ship from "./ship";

const BOARD_MAX_INDEX = 9;
const MAX_SHIPS = 5;

export default class GameBoard {
  size: number;
  shipPositions: ShipPosition[];
  memBoard: memBoardType;
  enemyShots: Coords[];

  constructor(size = 10) {
    this.size = size;
    this.memBoard = [];
    this.shipPositions = [];
    this.enemyShots = [];
    this.createMemBoard(size);
  }

  createMemBoard(size: number) {
    // Create board in memory to store the data
    this.memBoard = Array(size)
      .fill(undefined)
      .map(() => new Array(size).fill(0));
  }

  // Do a comparison of coords, checking if they match
  private isShipInArray(shipPos: ShipPosition, coords: Coords) {
    const { column, row } = shipPos.start;
    const { ship } = shipPos;
    // Check on rows for ship
    if (ship.isVertical) {
      for (let i = 0; i < ship.size; i++) {
        if (coords.column + i === row) return true;
      }
    }

    //Check on columns from ship
    if (!ship.isVertical) {
      for (let i = 0; i < ship.size; i++) {
        if (coords.row + i === column) return true;
      }
    }

    return false;
  }

  isAvailable(coords: Coords, ship: Ship): boolean {
    const { isVertical, size } = ship;
    const { column, row } = coords;

    // Ensure that coords are inside board boundaries
    if (row < 0 || row > BOARD_MAX_INDEX) return false;
    if (column < 0 || column > BOARD_MAX_INDEX) return false;

    // Ensure that ship won't overflow outside the board
    if (isVertical && row - 1 + ship.size > BOARD_MAX_INDEX) return false;
    if (!isVertical && column - 1 + ship.size > BOARD_MAX_INDEX) return false;

    // Check that position isn't occupied by another ship
    if (isVertical) {
      for (let i = 0; i < size; i++) {
        if (this.memBoard[row + i][column] !== 0) return false;
      }
    }
    if (!isVertical) {
      for (let i = 0; i < size; i++) {
        if (this.memBoard[row][column + i] !== 0) return false;
      }
    }

    //Check that ship isn't already in board
    const isAlreadySaved = this.shipPositions.find((shipPos) =>
      Object.is(shipPos.ship, ship)
    );
    if (isAlreadySaved) return false;

    // Check that the neighboard cells aren't occupied
    if (isVertical) {
      for (let i = 0; i < ship.size; i++) {
        for (let m = -1; m <= 1; m++) {
          for (let n = -1; n <= 1; n++) {
            // Don't access array if the position is out of the board
            if (
              row + m + i < 0 ||
              row + m + i > BOARD_MAX_INDEX ||
              column + n < 0 ||
              column + n > BOARD_MAX_INDEX
            )
              continue;

            // Return false if space is occupied by ship
            if (this.memBoard[row + m + i][column + n]) return false;
          }
        }
      }
    } else if (!isVertical) {
      for (let i = 0; i < ship.size; i++) {
        for (let m = -1; m <= 1; m++) {
          for (let n = -1; n <= 1; n++) {
            // Don't access array if the position is out of the board
            if (
              row + m < 0 ||
              row + m > BOARD_MAX_INDEX ||
              column + n + i < 0 ||
              column + n + i > BOARD_MAX_INDEX
            )
              continue;

            // Return false if space is occupied by ship
            if (this.memBoard[row + m][column + n + i]) return false;
          }
        }
      }
    }

    // All tests passed!
    return true;
  }

  // Return ship that matches the starting position or is in between the cells of its size
  findShip(coords: Coords): ShipPosition | null {
    const shipIndex = this.shipPositions.findIndex((ship) =>
      this.isShipInArray(ship, coords)
    );
    if (shipIndex === -1) return null;
    return this.shipPositions[shipIndex];
  }

  placeShip(coords: Coords, ship: Ship): boolean {
    if (!this.isAvailable(coords, ship)) return false;
    if (ship.size < 1) return false;

    // Spam ship on multiple rows
    if (ship.isVertical) {
      for (let i = 0; i < ship.size; i++) {
        this.memBoard[coords.row + i][coords.column] = ship;
      }
    }

    // Spam ship on multiple columns
    if (!ship.isVertical) {
      for (let i = 0; i < ship.size; i++) {
        this.memBoard[coords.row][coords.column + i] = ship;
      }
    }

    this.shipPositions.push({
      start: coords,
      ship,
    });

    return true;
  }

  receiveAttack(coords: Coords) {
    // Check if enemy attacked cell before
    if (
      this.enemyShots.some(
        (shot) => shot.column === coords.column && shot.row === coords.row
      )
    )
      return false;

    // Cell wasn't touch before, save enemy attack coords
    this.enemyShots.push(coords);

    const possibleShipPos = this.findShip(coords);

    // Didn't hit a boat
    if (possibleShipPos === null) return false;

    // It hitted a boat
    possibleShipPos.ship.hit();
    return true;
  }

  generateRandomBoard(shipsArray: Ship[]) {
    let actualIndex = 0;
    while (this.shipPositions.length < 5) {
      // These should return a number between 0 and 9
      const column = Math.floor(Math.random() * 10);
      const row = Math.floor(Math.random() * 10);
      // Randomly decide if ship is going to be vertical or horizontal
      const orientation = Math.ceil(Math.random() * 2) > 1;
      const newShip = shipsArray[actualIndex];
      newShip.isVertical = orientation;
      // Set new ship in position [x,y] if possible
      const isPlaced = this.placeShip({ column, row }, newShip);
      if (isPlaced) {
        if (actualIndex < 5) actualIndex += 1;
      }
    }
  }

  areAllSunked() {
    // Check that board is full of ships
    if (this.shipPositions.length < MAX_SHIPS) return false;
    for (const shipPos of this.shipPositions) {
      if (!shipPos.ship.isSunk()) return false;
    }

    return true;
  }
}
