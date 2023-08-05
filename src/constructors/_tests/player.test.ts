import { describe } from "vitest";
import { Player } from "../player";
import GameBoard from "../board";

let player: Player;
beforeEach(() => {
  player = new Player();
});

describe("Testing player Class", () => {
  test("default name for player", () => {
    expect(player.name).toBe("Player's Board");
  });
  it("should change a name if passed", () => {
    player = new Player("Rodrigo");
    expect(player.name).toBe("Rodrigo's Board");
  });
  it("should have a record of past attacks", () => {
    expect(player.record).toBeInstanceOf(Array);
  });
});

describe("Testing attacks to board", () => {
  it("should attack to a board", () => {
    const coordenadas = { column: 1, row: 1 };
    const board = new GameBoard();
    expect(player.attackTo(coordenadas, board)).toBe(false);
  });
  it("should register an attack into the record", () => {
    const coordenadas = { column: 1, row: 1 };
    const board = new GameBoard();
    player.attackTo(coordenadas, board);
    expect(player.record.length).toBe(1);
  });
  it("should hit randomly and don't hit the same spot twice.", () => {
    const board = new GameBoard();
    for (let i = 0; i < 100; i += 1) {
      player.randomAttack(board);
    }

    expect(player.record.length).toBe(100);
  });
});
