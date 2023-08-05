import { Coords, ShipPosition } from "../types/type";
import Ship from "./ship";

const BOARD_MAX_INDEX = 9;
const MAX_SHIPS = 5;

export default class GameBoard {
  size: number;
  shipPositions: ShipPosition[];
  memBoard: (Ship | number)[][];
  enemyShots: Coords[];

  constructor(size = 10) {
    this.size = size;
    this.memBoard = [];
    this.shipPositions = [];
    this.enemyShots = [];
    this.createMemBoard(size);
  }

  private createMemBoard(size: number) {
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
    // Ensure that coords are inside board boundaries
    if (coords.row < 0 || coords.row > BOARD_MAX_INDEX) return false;
    if (coords.column < 0 || coords.column > BOARD_MAX_INDEX) return false;

    // Ensure that ship won't overflow outside the board
    if (ship.isVertical && coords.row + ship.size > BOARD_MAX_INDEX)
      return false;
    if (!ship.isVertical && coords.column + ship.size > BOARD_MAX_INDEX)
      return false;

    // Check that position isn't occupied by another ship
    for (const position of this.shipPositions) {
      const existingShip = position.ship;
      const existingCoords = position.start;

      if (ship.isVertical) {
        if (
          coords.column === existingCoords.column &&
          coords.row >= existingCoords.row &&
          coords.row < existingCoords.row + existingShip.size
        ) {
          return false;
        }
        // Check for intersection with a horizontal ship
        if (
          !existingShip.isVertical &&
          existingCoords.row <= coords.row &&
          existingCoords.row + existingShip.size > coords.row &&
          existingCoords.column <= coords.column &&
          coords.column < existingCoords.column + existingShip.size
        ) {
          return false;
        }
      } else {
        if (
          coords.row === existingCoords.row &&
          coords.column >= existingCoords.column &&
          coords.column < existingCoords.column + existingShip.size
        ) {
          return false;
        }
        // Check for intersection with a vertical ship
        if (
          existingShip.isVertical &&
          existingCoords.column <= coords.column &&
          existingCoords.column + existingShip.size > coords.column &&
          existingCoords.row <= coords.row &&
          coords.row < existingCoords.row + existingShip.size
        ) {
          return false;
        }
      }
    }

    // Check that the neighboard cells aren't occupied
    if (ship.isVertical) {
      for (let i = 0; i < ship.size; i++) {
        for (let m = -1; m <= 1; m++) {
          for (let n = -1; n <= 1; n++) {
            // Don't access array if the position is out of the board
            if (
              coords.row + m + i < 0 ||
              coords.row + m + i > BOARD_MAX_INDEX ||
              coords.column + n < 0 ||
              coords.column + n > BOARD_MAX_INDEX
            )
              continue;

            // Return false if space is occupied by ship
            if (this.memBoard[coords.row + m + i][coords.column + n])
              return false;
          }
        }
      }
    } else if (!ship.isVertical) {
      for (let i = 0; i < ship.size; i++) {
        for (let m = -1; m <= 1; m++) {
          for (let n = -1; n <= 1; n++) {
            // Don't access array if the position is out of the board
            if (
              coords.row + m < 0 ||
              coords.row + m > BOARD_MAX_INDEX ||
              coords.column + n + i < 0 ||
              coords.column + n + i > BOARD_MAX_INDEX
            )
              continue;

            // Return false if space is occupied by ship
            if (this.memBoard[coords.row + m][coords.column + n + i])
              return false;
          }
        }
      }
    }

    // All tests passed!
    return true;
  }

  // Return ship that matches the starting position or is in between the cells of its size
  findShip(coords: Coords): Ship | null {
    const shipIndex = this.shipPositions.findIndex((ship) =>
      this.isShipInArray(ship, coords)
    );
    if (shipIndex === -1) return null;
    return this.shipPositions[shipIndex].ship;
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

    const possibleShip = this.findShip(coords);

    // Didn't hit a boat
    if (possibleShip === null) return false;

    // It hitted a boat
    possibleShip.hit();
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
