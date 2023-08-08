import { PropsWithChildren, Fragment } from "react";
import { memBoardType } from "../types/type";

interface BoardProps {
  memBoard: memBoardType;
}

export function Board({ memBoard }: BoardProps) {
  return (
    <div className="board border-pink-600 relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 border-8 bg-slate-900 flex flex-col">
      {memBoard.map((row, i) => {
        const isFirstRow = i === 0;
        return (
          <Fragment key={i}>
            <CellsRow row={i}>
              <Marker pos={i} />
              {row.map((_, j) => (
                <Cell key={j} column={j}>
                  {isFirstRow && <Marker pos={j} bot />}
                </Cell>
              ))}
            </CellsRow>
          </Fragment>
        );
      })}
    </div>
  );
}

// Shows number of row and columns as a guide
function Marker({ pos, bot }: { pos: number; bot?: true }) {
  return (
    <div
      className={`marker ${
        bot ? "-top-7" : "-left-5"
      } text-white absolute flex text-sm font-mono font-bold cursor-default`}
    >
      {pos}
    </div>
  );
}

// Contains all the cells that form a row
function CellsRow({ row, children }: PropsWithChildren<{ row: number }>) {
  return (
    <div data-row={row} className="rows w-full flex flex-1">
      {children}
    </div>
  );
}

/*
    The basic and simple cell, the user is going to click, to interact with the game,
    if the Board is for the player, it should be clickable, if its for the Computer,
    it should be disabled, aka impossible to click
*/
function Cell({ column, children }: PropsWithChildren<{ column: number }>) {
  return (
    <button
      className="cells relative inline-flex flex-1 justify-center items-center text-xl border border-opacity-75 border-pink-600 "
      data-column={column}
    >
      {children}
    </button>
  );
}

export default Board;
