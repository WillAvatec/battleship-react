import { GameData } from "../constructors/gameData";
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

export type memBoardType = (Ship | number)[][];

export type gameState = "start" | "onPlay" | "end";

// General Interfaces / Types

export interface GameDataContextValue {
  data: GameData;
  winner: string;
  initGameData: (name?: string) => void;
}
