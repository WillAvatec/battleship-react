import { PropsWithChildren, useContext, useEffect, useState } from "react";
import ShipPlacementContainer from "../components/ShipsPlacement";
import { PlacementBoard } from "../components/PlacementBoard";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/data";
import { Coords } from "../types/type";
import Ship from "../constructors/ship";
import GameBoard from "../constructors/board";

function Placement() {
  //Get global data
  const game = useContext(DataContext);
  const data = game;
  const {
    playerBoard,
    playerShips,
    updateShips,
    resetPlayerData,
    generatePlayerRandom,
  } = data;

  const goTo = useNavigate();
  useEffect(() => {
    if (game.gameState !== "setup") goTo("/");
    getBusyCells(playerBoard);
  }, [playerBoard, game.gameState, goTo]);

  const startGame = () => {
    if (playerBoard.shipPositions.length === 5) {
      game.updateState("onPlay");
      goTo("/game");
    }
  };

  //Define the selected ship
  const [selected, setSelected] = useState<Ship>(playerShips[0]);
  const [placedShips, setPlacedShips] = useState<Ship[]>([]);
  const [placedShipsCells, setPlacedShipsCells] = useState<Coords[]>([]);

  //Selects the ship inside the players board
  const handleSelect = (index: number) => {
    setSelected(() => playerShips[index]);
  };

  const setShip = (coords: Coords) => {
    const isSet = playerBoard.placeShip(coords, selected);
    if (isSet) {
      // Get hovered cells
      getBusyCells(playerBoard);
      // Disable changeDirection and Select ships on ShipsContainer
      setPlacedShips((prevState) => [...prevState, selected]);
    }
  };

  // Check if cell is occupied or not
  const getBusyCells = (playerBoard: GameBoard) => {
    const cells = [];
    // Find ship
    for (const shipPos of playerBoard.shipPositions) {
      const { isVertical, size } = shipPos.ship;
      const { column, row } = shipPos.start;
      for (let i = 0; i < size; i++) {
        if (isVertical) {
          cells.push({ column, row: row + i });
        } else {
          cells.push({ column: column + i, row });
        }
      }
    }
    setPlacedShipsCells(cells);
  };

  // Change direction and update context
  const handleDirection = (index: number) => {
    const newShips = [...playerShips];
    const selected = newShips[index];
    selected.isVertical = !selected.isVertical;
    updateShips(newShips);
  };

  //Const reset board
  const resetBoard = () => {
    resetPlayerData();
    setPlacedShipsCells([]);
  };

  return (
    <div className="flex gap-7 flex-col items-center justify-around min-h-full my-10 pb-20">
      <ConsiderationsTable />
      <MainTable>
        <PlacementBoard
          currentShip={selected}
          board={playerBoard.memBoard}
          placedShips={placedShipsCells}
          setOnBoard={(coords) => setShip(coords)}
          isAvailable={(coords) => playerBoard.isAvailable(coords, selected)}
        />
        <ShipPlacementContainer
          select={handleSelect}
          shipsArray={playerShips}
          placedShips={placedShips}
          changeDirection={handleDirection}
        >
          <ControlButton
            id="generateRandom"
            text="Random Board"
            onClick={() => {
              generatePlayerRandom();
            }}
          />
          <ControlButton
            id="resetBtn"
            text="Reset Board"
            onClick={resetBoard}
          />
        </ShipPlacementContainer>
      </MainTable>
      <div className="p-5 pb-10 md:p-0">
        <ControlButton text="Play" id="playBtn" onClick={startGame} />
      </div>
    </div>
  );
}

function ConsiderationsTable() {
  return (
    <div className="border-double m-6 md:m-0 light-box-border bg-amber-100 p-3 text-slate-950">
      <h1 className="text-xl text-center sm:text-3xl">
        Place your ships!
      </h1>
      <h2 className="text-lg font-semibold">Some considerations:</h2>
      <ol>
        <li>
          - When a ship can't be placed, it won't be highlighted when you hover
          on the board
        </li>
        <li>- You can't put a ship next to each other</li>
        <li>
          - Double-click a ship in the container to change its orientation
        </li>
      </ol>
    </div>
  );
}

function MainTable({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-7 sm:flex-row items-center justify-around">
      {children}
    </div>
  );
}

function ControlButton({
  id,
  text,
  onClick,
}: {
  id: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      id={id}
      onClick={onClick}
      className="bg-yellow-600 text-white py-1 px-8 text-xl"
    >
      {text}
    </button>
  );
}

export default Placement;
