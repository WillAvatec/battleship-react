import { Coords, RandomAttack } from "../types/type";
import GameBoard from "./board";

export class Player {
  name: string;
  record: Coords[];

  constructor(name = "Player") {
    if (name === "computer") {
      // Pick one randomly
      const names = ["Joey", "Mark", "Will", "The Colonel", "Beth"];
      this.name = names[Math.floor(Math.random() * names.length)];
    } else {
      this.name = name;
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

    this.record.push({ column: coords.column, row: coords.row });
    return board.receiveAttack(coords);
  }

  randomAttack(board: GameBoard): RandomAttack | false {
    if (this.record.length === 100) {
      return false;
    }

    let row = Math.floor(Math.random() * 10);
    let column = Math.floor(Math.random() * 10);

    let shouldRetry = true;

    while (shouldRetry) {
      row = Math.floor(Math.random() * 10);
      column = Math.floor(Math.random() * 10);
      if (this.wasHitBefore({ column, row }, board)) {
        shouldRetry = true;
      } else {
        shouldRetry = false;
      }
    }

    const didHit = this.attackTo({ column, row }, board); //This was value

    /* [row, column, value]; */
    return {
      coords: {
        column,
        row,
      },
      didHit,
    };
  }

  wasHitBefore(coords: Coords, board: GameBoard) {
    for (let i = 0; i < this.record.length; i += 1) {
      if (
        this.record[i].row === coords.row &&
        this.record[i].column === coords.column
      ) {
        return true;
      }
    }

    if (
      board.shots.some((coord) => {
        return JSON.stringify(coord) === JSON.stringify(coords);
      })
    )
      return true;

    return false;
  }
}
