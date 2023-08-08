import { Fragment } from "react";
import { memBoardType } from "../types/type";
import { Cell, CellsRow, Marker } from "./utility/utility";

interface BoardProps {
  memBoard: memBoardType;
  placement?: true;
}

interface Behaviours {
  lighten?: (e: React.MouseEvent) => void;
  clean?: (e: React.MouseEvent) => void;
  set?: (e: React.MouseEvent) => void;
}

const createBoard = (behaviours: Behaviours | undefined) => {
  return function Board({ memBoard, placement }: BoardProps) {
    return (
      <div
        onClick={placement ? behaviours?.set : undefined}
        onMouseOver={placement ? behaviours?.lighten : undefined}
        onMouseOut={placement ? behaviours?.clean : undefined}
        className="board border-pink-600 relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 border-8 bg-slate-900 flex flex-col"
      >
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
  };
};

export { createBoard };
