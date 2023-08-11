import { createContext, useState } from "react";
import { GameDataContextValue, gameState } from "../types/type";
import GameBoard from "../constructors/board";
import Ship from "../constructors/ship";
import { Player } from "../constructors/player";

const BOARD_SIZE = 10;
const SHIPS_AMMOUNT = 5;
const SHIP_SIZES = [4, 4, 3, 3, 2];

// Create context
export const DataContext = createContext<GameDataContextValue>(
  {} as GameDataContextValue
);

// Create provider (it's wrapped inside GameDataProvider)
export function GameDataProvider({ children }: { children: React.ReactNode }) {
  const [player, setPlayer] = useState<Player>(new Player());
  const [playerBoard, setPlayerBoard] = useState(new GameBoard(10));
  const [playerShips, setPlayerShips] = useState<Ship[]>([]);
  const [computer, setComputer] = useState<Player>(new Player("computer"));
  const [computerBoard, setComputerBoard] = useState(new GameBoard(10));
  const [computerShips, setComputerShips] = useState<Ship[]>([]);
  const [gameState, setGameState] = useState<gameState>("start");
  const [winner, setWinner] = useState("");

  const initGameData = (name?: string) => {
    //PC DATA
    const newShips = generateShips(SHIPS_AMMOUNT);
    setComputer(new Player("computer"));
    setComputerShips(newShips);
    setComputerBoard(() => {
      const newBoard = new GameBoard(BOARD_SIZE);
      newBoard.generateRandomBoard(newShips);
      return newBoard;
    });

    //Player DATA
    setPlayer(new Player(name));
    setPlayerShips(generateShips(SHIPS_AMMOUNT));
    setPlayerBoard(new GameBoard(BOARD_SIZE));

    //General DATA
    setGameState("setup");
    setWinner("");
  };

  const updateState = (state: gameState) => {
    setGameState(state);
  };

  const generateShips = (ammount: number) => {
    const ships = [];
    for (let i = 0; i < ammount; i++) {
      ships.push(new Ship(SHIP_SIZES[i]));
    }

    return ships;
  };

  const updateBoard = (board: GameBoard) => {
    setComputerBoard(() => board);
  };

  return (
    <DataContext.Provider
      value={{
        computerBoard,
        computerShips,
        playerBoard,
        playerShips,
        updateState,
        updateBoard,
        initGameData,
        gameState,
        computer,
        player,
        winner,
        setWinner,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
