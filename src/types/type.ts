import GameBoard from "../constructors/board";
import { Player } from "../constructors/player";
import Ship from "../constructors/ship";

// Board Related

export type Coords = {
  row: number;
  column: number;
};

export type ShipPosition = {
  start: Coords;
  ship: Ship;
};

export type memBoardType = (ShipPosition | number)[][];

export type gameState = "start" | "setup" | "onPlay" | "end";

// General Interfaces / Types

export interface GameDataContextValue {
  winner: string;
  gameState: gameState;
  initGameData: (name?: string) => void;
  updateState: (state: gameState) => void;
  player: Player;
  computer: Player;
  playerShips: Ship[];
  computerShips: Ship[];
  playerBoard: GameBoard;
  computerBoard: GameBoard;
  updateBoard: (board: GameBoard) => void;
  setWinner: (name: string) => void;
}

export type Cursor =
  | "cursor-default"
  | "cursor-not-allowed"
  | "cursor-crosshair";

export interface HitCell {
  coords: Coords;
  landed: boolean;
}

export type RandomAttack = {
  coords: Coords;
  didHit: boolean;
};
