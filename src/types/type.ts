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

// General Types

export type gameData = {
  player: Player;
  computer: Player;
};
