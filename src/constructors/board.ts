import { Coords, ShipPosition, memBoardType } from "../types/type";
import Ship from "./ship";

const BOARD_MAX_INDEX = 9;
const MAX_SHIPS = 5;

export default class GameBoard {
  size: number;
  shipPositions: ShipPosition[];
  memBoard: memBoardType;
  shots: Coords[];

  constructor(size = 10) {
    this.size = size;
    this.memBoard = [];
    this.shipPositions = [];
    this.shots = [];
    this.createMemBoard(size);
  }

  createMemBoard(size: number) {
    // Create board in memory to store the data
    this.memBoard = Array(size)
      .fill(undefined)
      .map(() => new Array(size).fill(0));
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

  placeShip(coords: Coords, ship: Ship): boolean {
    if (!this.isAvailable(coords, ship)) return false;
    if (ship.size < 1) return false;

    // Spam ship on multiple rows
    if (ship.isVertical) {
      for (let i = 0; i < ship.size; i++) {
        this.memBoard[coords.row + i][coords.column] = {
          start: coords,
          ship,
        };
      }
    }

    // Spam ship on multiple columns
    if (!ship.isVertical) {
      for (let i = 0; i < ship.size; i++) {
        this.memBoard[coords.row][coords.column + i] = {
          start: coords,
          ship,
        };
      }
    }

    this.shipPositions.push({
      start: coords,
      ship,
    });

    return true;
  }

  //Returns true if it hits a boat
  receiveAttack(coords: Coords) {
    // This cell was attack before, it is in the historial
    if (
      this.shots.some((shot) => JSON.stringify(shot) === JSON.stringify(coords))
    )
      throw new Error("This cell was attacked before");

    // Cell wasn't touch before, save coords of the attack
    this.shots.push(coords);

    // Check if there is a ship in the coords provided
    const possibleShip = this.memBoard[coords.row][coords.column];

    if (possibleShip === 0) {
      return false;
    } else {
      // It hitted a boat, search for it in the shipPositions
      const shipPos = this.shipPositions.find((shiPos) => {
        return JSON.stringify(shiPos) === JSON.stringify(possibleShip);
      }) as ShipPosition;

      shipPos.ship.hit();
      if (shipPos.ship.sunked) {
        this.blowNeighbors(shipPos);
      }
      this.areAllSunked();
      return true;
    }
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
    const length = this.shipPositions.length;
    if (length < MAX_SHIPS) return false;
    for (let i = 0; i < length; i++) {
      //If at least one ship is not sunked, then it means that not all the ships are sunked
      if (!this.shipPositions[i].ship.isSunk()) return false;
    }

    // The iteration is over and didn't found a ship that wasn't sunked
    return true;
  }

  private blowNeighbors(shipPos: ShipPosition) {
    // Get data of the ship and its position on the board
    const { isVertical, size } = shipPos.ship;
    const { column, row } = shipPos.start;

    // Iterate over orientation of ship starting point
    if (isVertical) {
      for (let i = -1; i <= size; i++) {
        for (let j = -1; j < 2; j++) {
          // Check that position doesn't goes out of the board
          const cJ = column + j;
          const rI = row + i;

          if (cJ < 0 || cJ > BOARD_MAX_INDEX) continue;
          if (rI < 0 || rI > BOARD_MAX_INDEX) continue;

          // Ensure that position is not in shots array
          const newCoord: Coords = { column: cJ, row: rI };
          const wasShot = this.shots.some((coords) => {
            JSON.stringify(coords) === JSON.stringify(newCoord);
          });
          if (wasShot) {
            continue;
          } else {
            this.shots.push(newCoord);
          }
        }
      }
    } else if (!isVertical) {
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j <= size; j++) {
          // Check that position doesn't goes out of the board
          const cJ = column + j;
          const rI = row + i;

          if (cJ < 0 || cJ > BOARD_MAX_INDEX) continue;
          if (rI < 0 || rI > BOARD_MAX_INDEX) continue;

          // Ensure that position is not in shots array
          const newCoord: Coords = { column: cJ, row: rI };
          const wasShot = this.shots.some((coords) => {
            JSON.stringify(coords) === JSON.stringify(newCoord);
          });
          if (wasShot) {
            continue;
          } else {
            this.shots.push(newCoord);
          }
        }
      }
    }
  }
}
