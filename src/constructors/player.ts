import { Coords } from "../types/type";
import GameBoard from "./board";

export class Player {
  name: string;
  record: Coords[];

  constructor(name = "Player") {
    if (name === "computer") {
      // Pick one randomly
      const names = ["Joey", "Mark", "Will", "Colonel", "Beth"];
      this.name = names[Math.floor(Math.random() * names.length)] + "'s Board";
    } else {
      this.name = name + "'s Board";
    }

    this.record = [];
  }

  //IMPORTANT: Need to check whether the order of coords if the correct
  attackTo(coords: Coords, board: GameBoard) {
    if (
      this.record.find(
        (obj) => obj.row === coords.row && obj.column === coords.column
      )
    ) {
      return false;
    }

    this.record.push({ row: coords.row, column: coords.column });
    return board.receiveAttack(coords);
  }

  randomAttack(board: GameBoard) {
    if (this.record.length === 100) {
      return false;
    }

    let row = Math.floor(Math.random() * 10);
    let column = Math.floor(Math.random() * 10);

    while (this.hasAlreadyHit({ row, column })) {
      row = Math.floor(Math.random() * 10);
      column = Math.floor(Math.random() * 10);
    }

    const value = this.attackTo({ column, row }, board);

    return [row, column, value];
  }

  hasAlreadyHit(coords: Coords) {
    for (let i = 0; i < this.record.length; i += 1) {
      if (
        this.record[i].row === coords.row &&
        this.record[i].column === coords.column
      ) {
        return true;
      }
    }

    return false;
  }
}
