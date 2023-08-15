import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/data";
import { Coords, HitCell } from "../types/type";
import PlayerBoard from "../components/MainBoard";
import { useNavigate } from "react-router-dom";

function MainGame() {
  // Get data from context
  const game = useContext(DataContext);
  const {
    playerBoard,
    player,
    computerBoard,
    computer,
    updateBoard,
    gameState,
    setWinner,
  } = game;

  const [pcBoardCells, setPcBoardCells] = useState<HitCell[]>([]);
  const [playerBoardCells, setPlayerBoardCells] = useState<HitCell[]>([]);

  const goTo = useNavigate();

  useEffect(() => {
    if (gameState !== "onPlay") goTo("/");
  });

  //Player always starts the game
  const handlePlayerAttack = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    const coords: Coords = {
      column: Number(target.dataset.column),
      row: Number(target.dataset.row),
    };
    //Try to attack computerBoard
    let didHit: boolean;
    try {
      didHit = computerBoard.receiveAttack(coords);
    } catch (error) {
      console.log(error);
      return;
    }

    //Check winner
    if (computerBoard.areAllSunked()) {
      setWinner(player.name);
      goTo("/winner");
    }

    setPcBoardCells(() => {
      const hitcells: HitCell[] = computerBoard.shots.map((shotCoord) => {
        if (JSON.stringify(shotCoord) === JSON.stringify(coords)) {
          return { coords, landed: didHit };
        } else {
          return { coords: shotCoord, landed: false };
        }
      });

      return hitcells;
    });

    // Now hand to the pc
    handlePCAttack();
  };

  const handlePCAttack = () => {
    const randomAttack = computer.randomAttack(playerBoard);
    if (randomAttack) {
      const { coords, didHit } = randomAttack;
      if (playerBoard.areAllSunked()) {
        setWinner(computer.name);
        goTo("/lose");
      }
      setPlayerBoardCells(() => {
        const hitcells: HitCell[] = playerBoard.shots.map((shotCoord) => {
          if (JSON.stringify(shotCoord) === JSON.stringify(coords)) {
            return { coords, landed: didHit };
          } else {
            return { coords: shotCoord, landed: false };
          }
        });

        return hitcells;
      });
    }
  };

  return (
    <div
      id="main-game"
      className="wrapper mx-auto flex justify-center items-center flex-1 min-h-full"
    >
      <section className="boards flex flex-col gap-5 lg:gap-20 md:flex-row">
        <PlayerBoard
          memBoard={playerBoard.memBoard}
          attackedCells={playerBoardCells}
          name={player.name}
          onClick={() => {}}
        />
        <PlayerBoard
          memBoard={computerBoard.memBoard}
          attackedCells={pcBoardCells}
          onClick={handlePlayerAttack}
          name={computer.name}
        />
      </section>
    </div>
  );
}

export default MainGame;
