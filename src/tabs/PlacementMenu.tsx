import { useContext } from "react";
import Board from "../components/Board";
import ShipPlacementContainer from "../components/ShipsPlacement";
import GameBoard from "../constructors/board";
import { DataContext } from "../context/data";
import { useNavigate } from "react-router-dom";

function PlacementMenu() {
  const temp_board = new GameBoard(10);
  const game = useContext(DataContext);

  // Link to go to the main game screen
  const goTo = useNavigate();
  return (
    <div className="flex flex-row gap-7 md:flex-col items-center justify-around min-h-full">
      <div>
        <h1 className="text-xl text-center text-white sm:text-3xl">
          Place your ships!
        </h1>
        <p>Move the ships into the grid, when all are set; press the button</p>
      </div>
      <div className="flex flex-col gap-7 sm:flex-row items-center justify-around">
        <Board memBoard={temp_board.memBoard} />
        <ShipPlacementContainer shipsArray={game.data.playerShips} />
      </div>
      <button
        onClick={() => {
          goTo("/game");
        }}
        id="playBtn"
        className="bg-pink-700 text-white py-1 px-3 text-xl"
      >
        All in order
      </button>
    </div>
  );
}

export default PlacementMenu;
