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

export type gameState = "start" | "onPlay" | "end";

export interface GameDataContextValue {
  data: GameData | null;
  winner: string;
  initGameData: (name?: string) => void;
}
