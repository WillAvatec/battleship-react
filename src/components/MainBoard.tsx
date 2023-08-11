import { Fragment } from "react";
import { Coords, HitCell, memBoardType } from "../types/type";
import { CellsRow, GameCell, Marker } from "./utility/BoardRelated";

interface PlayerBoardProps {
  onClick: (e: React.MouseEvent) => void;
  attackedCells: HitCell[];
  memBoard: memBoardType;
  name: string;
}

function PlayerBoard({
  memBoard,
  name,
  attackedCells,
  onClick,
}: PlayerBoardProps) {
  return (
    <div className="player-side p-5 relative">
      <div className="bg-pink-600 -z-10 absolute inset-0 blur" />
      <div className="player-name overflow-hidden whitespace-nowrap text-violet-50 max-w-sm text-ellipsis drop-shadow-2xl inline-block text-xl absolute -top-4 sm:-top-8">
        {name}
      </div>
      {/* Here starts the board */}
      <div className="board border-pink-600 relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 border-8 bg-slate-900 flex flex-col">
        {memBoard.map((row, rowID) => {
          const isFirstRow = rowID === 0;
          return (
            <Fragment key={rowID}>
              <CellsRow>
                <Marker pos={rowID} />
                {row.map((_, colID) => {
                  //console.table(attackedCells);
                  const cellCoords: Coords = { column: colID, row: rowID };
                  const wasHit = attackedCells.some(
                    (hitCell) =>
                      JSON.stringify(hitCell.coords) ===
                      JSON.stringify(cellCoords)
                  );
                  return (
                    <GameCell
                      key={colID}
                      row={rowID}
                      col={colID}
                      isShip={memBoard[rowID][colID] !== 0}
                      wasHit={wasHit}
                      cursor={
                        wasHit ? "cursor-not-allowed" : "cursor-crosshair"
                      }
                      onClick={onClick}
                    >
                      {isFirstRow && <Marker pos={colID} top />}
                    </GameCell>
                  );
                })}
              </CellsRow>
            </Fragment>
          );
        })}
        {/* Here ends the board */}
      </div>
    </div>
  );
}

export default PlayerBoard;
