import GameBoard from "./board";
import { Player } from "./player";
import Ship from "./ship";

// Ships should be at maximum the half of board
const BOARD_SIZE = 10;
const SHIPS_AMMOUNT = 5;
const SHIP_SIZES = [4, 4, 3, 3, 2];

// TODO: Possibility to open game for 2 players in future

export class GameData {
  player: Player;
  computer: Player;
  gameState: string;
  playerBoard: GameBoard;
  computerBoard: GameBoard;
  playerShips: Ship[];
  computerShips: Ship[];

  constructor(playerName: string) {
    this.player = new Player(playerName);
    this.computer = new Player("computer");
    this.playerBoard = new GameBoard(BOARD_SIZE);
    this.computerBoard = new GameBoard(BOARD_SIZE);
    this.playerShips = this.generateShips(SHIPS_AMMOUNT);
    this.computerShips = this.generateShips(SHIPS_AMMOUNT);
    this.gameState = "start";
  }

  // Returns an array of Ships
  // The sizes are defined above
  private generateShips(ammount: number) {
    const ships = [];
    for (let i = 0; i < ammount; i++) {
      ships.push(new Ship(SHIP_SIZES[i]));
    }

    return ships;
  }
}
