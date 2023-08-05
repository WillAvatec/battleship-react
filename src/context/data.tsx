import { createContext, useState } from "react";
import { GameData } from "../constructors/gameData";
import { GameDataContextValue } from "../types/type";

/*
    The context should be initialized to null, only after, 
    getting the player's name; it should be initialize a new GameData 
*/

// Create context
export const DataContext = createContext<GameDataContextValue | null>(null);

// Create provider (it's wrapped inside GameDataProvider)
export function GameDataProvider({ children }: { children: React.ReactNode }) {
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [winner, setWinner] = useState("");

  const initGameData = (name?: string) => {
    setGameData(new GameData(name));
    setWinner("");
  };

  return (
    <DataContext.Provider
      value={{
        data: gameData,
        initGameData,
        winner,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
