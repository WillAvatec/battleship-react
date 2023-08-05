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
