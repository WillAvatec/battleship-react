import { describe, it } from "vitest";
import GameBoard from "../board";
import Ship from "../ship";

let _gameboard: GameBoard;
let _ship: Ship;

beforeEach(() => {
  _gameboard = new GameBoard();
  _ship = new Ship(3);
});

describe("Testing isAvailable method", () => {
  it("Should return true if coords are inside board", () => {
    expect(_gameboard.isAvailable({ column: 0, row: 0 }, _ship)).toBe(true);
    expect(_gameboard.isAvailable({ column: 5, row: 4 }, _ship)).toBe(true);
    expect(_gameboard.isAvailable({ column: 0, row: 0 }, _ship)).toBe(true);
  });

  it("Should return false if ship was already positioned", () => {
    expect(_gameboard.placeShip({ column: 0, row: 0 }, _ship)).toBe(true);
    expect(_gameboard.isAvailable({ column: 4, row: 4 }, _ship)).toBe(false);
    expect(_gameboard.placeShip({ column: 4, row: 4 }, _ship)).toBe(false);
  });

  it("Should return true if coordinates are inside board and touch edge", () => {
    expect(_gameboard.isAvailable({ column: 7, row: 0 }, _ship)).toBe(true);
    _ship.isVertical = !_ship.isVertical;
    expect(_gameboard.isAvailable({ column: 0, row: 7 }, _ship)).toBe(true);
  });

  it("Should return false if coords are outside board", () => {
    expect(_gameboard.isAvailable({ column: -1, row: -5 }, _ship)).toBe(false);
    expect(_gameboard.isAvailable({ column: 0, row: -5 }, _ship)).toBe(false);
    expect(_gameboard.isAvailable({ column: -5, row: -5 }, _ship)).toBe(false);
  });

  it("Should return false if ship overflows outside board", () => {
    // Horizontal ship
    expect(_gameboard.isAvailable({ column: 8, row: 6 }, _ship)).toBe(false);
    expect(_gameboard.isAvailable({ column: 9, row: 5 }, _ship)).toBe(false);
    expect(_gameboard.isAvailable({ column: 9, row: 4 }, _ship)).toBe(false);

    // Vertical ship
    const _ship2 = new Ship(3);
    _ship2.isVertical = true;
    expect(_gameboard.isAvailable({ column: 6, row: 8 }, _ship2)).toBe(false);
    expect(_gameboard.isAvailable({ column: 5, row: 9 }, _ship2)).toBe(false);
    expect(_gameboard.isAvailable({ column: 4, row: 9 }, _ship2)).toBe(false);
  });

  it("Should return false if position is already occupied", () => {
    // Horizontal ship
    const _ship2 = new Ship(3);
    _gameboard.placeShip({ column: 0, row: 0 }, _ship2);
    expect(_gameboard.isAvailable({ column: 0, row: 0 }, _ship)).toBe(false);
    expect(_gameboard.isAvailable({ column: 1, row: 0 }, _ship)).toBe(false);
    expect(_gameboard.isAvailable({ column: 2, row: 0 }, _ship)).toBe(false);

    // Vertical ship
    const _ship3 = new Ship(3);
    _ship3.isVertical = true;
    const _gameboard2 = new GameBoard();
    _gameboard2.placeShip({ column: 0, row: 0 }, _ship3);
    expect(_gameboard2.isAvailable({ column: 0, row: 0 }, _ship)).toBe(false);
    expect(_gameboard2.isAvailable({ column: 0, row: 1 }, _ship)).toBe(false);
    expect(_gameboard2.isAvailable({ column: 0, row: 2 }, _ship)).toBe(false);
  });

  it("Should evaluate correctly if neighboring cells are occupied", () => {
    const _ship2 = new Ship(3);
    _ship2.isVertical = !_ship2.isVertical;

    _gameboard.placeShip({ column: 0, row: 0 }, _ship2);
    // Available adjacents cells
    expect(_gameboard.isAvailable({ column: 2, row: 0 }, _ship)).toBe(true);
    expect(_gameboard.isAvailable({ column: 2, row: 1 }, _ship)).toBe(true);
    expect(_gameboard.isAvailable({ column: 2, row: 2 }, _ship)).toBe(true);
    expect(_gameboard.isAvailable({ column: 2, row: 3 }, _ship)).toBe(true);
    expect(_gameboard.isAvailable({ column: 1, row: 4 }, _ship)).toBe(true);
    expect(_gameboard.isAvailable({ column: 0, row: 4 }, _ship)).toBe(true);

    // Unavailable Adjacent cells
    expect(_gameboard.isAvailable({ column: 1, row: 0 }, _ship)).toBe(false);
    expect(_gameboard.isAvailable({ column: 1, row: 1 }, _ship)).toBe(false);
    expect(_gameboard.isAvailable({ column: 1, row: 2 }, _ship)).toBe(false);
    expect(_gameboard.isAvailable({ column: 1, row: 3 }, _ship)).toBe(false);
    expect(_gameboard.isAvailable({ column: 0, row: 3 }, _ship)).toBe(false);
  });
});

describe("Testing placeShip method", () => {
  beforeEach(() => {
    _gameboard = new GameBoard();
    _ship = new Ship(3);
  });
  it("should place ship on Horizontal", () => {
    expect(_gameboard.placeShip({ column: 0, row: 0 }, _ship)).toBe(true);
  });
  it("should save shipPosition in array", () => {
    _gameboard.placeShip({ column: 0, row: 0 }, _ship);
    expect(_gameboard.shipPositions.length).toBe(1);
    expect(_gameboard.memBoard[0][0]).toBeInstanceOf(Ship);
    expect(_gameboard.memBoard[0][1]).toBeInstanceOf(Ship);
    expect(_gameboard.memBoard[0][2]).toBeInstanceOf(Ship);
  });
  it("should set ship references on the memory of the board", () => {
    // Horizontal ship
    _gameboard.placeShip({ column: 0, row: 0 }, _ship);
    for (let i = 0; i < _ship.size; i++) {
      expect(_gameboard.memBoard[0][i]).toBeInstanceOf(Ship);
    }

    // Vertical ship
    const _ship2 = new Ship(3);
    _ship2.isVertical = true;
    _gameboard.placeShip({ column: 3, row: 3 }, _ship2);
    for (let i = 3; i < _ship.size + 3; i++) {
      expect(_gameboard.memBoard[i][3]).toBeInstanceOf(Ship);
    }
  });

  describe("Should return false if position cannot be used to place ship", () => {
    test("When position is occupied", () => {
      const _ship2 = new Ship(3);
      _ship2.isVertical = true;
      _gameboard.placeShip({ column: 0, row: 0 }, _ship);
      expect(_gameboard.placeShip({ column: 2, row: 0 }, _ship2)).toBe(false);
    });
    test("When coordinates are invalid", () => {
      const coord = { column: -50, row: -12 };
      const coord2 = { column: -2, row: 1 };
      const coord3 = { column: 2, row: -1 };
      const coord4 = { column: 10, row: 30 };

      expect(_gameboard.placeShip(coord, _ship)).toBe(false);
      expect(_gameboard.placeShip(coord2, _ship)).toBe(false);
      expect(_gameboard.placeShip(coord3, _ship)).toBe(false);
      expect(_gameboard.placeShip(coord4, _ship)).toBe(false);

      expect(_gameboard.shipPositions.length).toBe(0);
    });
  });
});

describe("Testing receiveAttack method", () => {
  it("Should exists", () => {
    expect(_gameboard).toHaveProperty("receiveAttack");
  });

  describe("Situation: Missed", () => {
    it("Should return false if missed", () => {
      expect(_gameboard.receiveAttack({ column: 0, row: 0 })).toBe(false);
    });
    it("Should save missed shot in enemyArrays", () => {
      expect(_gameboard.receiveAttack({ column: 0, row: 0 })).toBe(false);
      expect(_gameboard.enemyShots.length).toBe(1);
    });
  });

  describe("Situation: Hitted Ship", () => {
    it("Should return true if hitted ship", () => {
      _gameboard.placeShip({ column: 0, row: 0 }, _ship);
      expect(_gameboard.receiveAttack({ column: 0, row: 0 })).toBe(true);
    });

    it("Should increment hits property of ship", () => {
      _gameboard.placeShip({ column: 0, row: 0 }, _ship);
      // Attack all the positions of boat
      _gameboard.receiveAttack({ column: 0, row: 0 });
      expect(_ship.hits).toBe(1);
      _gameboard.receiveAttack({ column: 1, row: 0 });
      expect(_ship.hits).toBe(2);
      _gameboard.receiveAttack({ column: 2, row: 0 });
      expect(_ship.hits).toBe(3);
    });
  });

  describe("Situation: spot was already attacked", () => {
    it("Already attacked that cell,return false", () => {
      _gameboard.placeShip({ column: 0, row: 0 }, _ship);
      //Attacked ship succesfully
      expect(_gameboard.receiveAttack({ column: 0, row: 0 })).toBe(true);
      expect(_ship.hits).toBe(1);
      // Attack again same spot
      _gameboard.receiveAttack({ column: 0, row: 0 });
      expect(_gameboard.receiveAttack({ column: 0, row: 0 })).toBe(false);
      expect(_ship.hits).toBe(1);
    });
  });
});

describe("Generate random board using method", () => {
  test("method should exists", () => {
    expect(_gameboard).toHaveProperty("generateRandomBoard");
  });

  it("should create board with 5 ships", () => {
    const ships = [
      new Ship(4),
      new Ship(4),
      new Ship(3),
      new Ship(3),
      new Ship(2),
    ];
    _gameboard.generateRandomBoard(ships);

    expect(_gameboard.shipPositions.length).toBe(5);
  });
});

describe("Test areAllSunked method", () => {
  test("method should exists", () => {
    expect(_gameboard).toHaveProperty("areAllSunked");
  });

  it("Return false if the board doesn't have all the required ships", () => {
    expect(_gameboard.areAllSunked()).toBe(false);
  });

  it("Return true if all the ships are sunked", () => {
    const ships = [
      new Ship(4),
      new Ship(4),
      new Ship(3),
      new Ship(3),
      new Ship(2),
    ];
    ships.forEach((ship) => {
      for (let i = 0; i < ship.size; i++) {
        ship.hit();
      }
      expect(ship.isSunk()).toBe(true);
    });
    _gameboard.generateRandomBoard(ships);
    expect(_gameboard.areAllSunked()).toBe(true);
  });
  it("Return false if all the ships are NOT sunked", () => {
    const ships = [
      new Ship(4),
      new Ship(4),
      new Ship(3),
      new Ship(3),
      new Ship(2),
    ];
    ships.forEach((ship) => {
      for (let i = 0; i < ship.size; i++) {
        ship.hit();
      }
      expect(ship.isSunk()).toBe(true);
    });
    ships[0].hits = 0;
    expect(ships[0].isSunk()).toBe(false);
    _gameboard.generateRandomBoard(ships);
    expect(_gameboard.areAllSunked()).toBe(false);
  });
});
