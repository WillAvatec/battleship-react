import { Fragment, useState } from "react";
import { Coords, memBoardType } from "../types/type";
import { Cell, CellsRow, Marker } from "./utility/BoardRelated";
import Ship from "../constructors/ship";

interface PlacementBoardProps {
  currentShip: Ship;
  board: memBoardType;
  placedShips: Coords[];
  setOnBoard: (coords: Coords) => void;
  isAvailable: (coords: Coords) => boolean;
}

function PlacementBoard({
  board,
  currentShip,
  placedShips,
  setOnBoard,
  isAvailable,
}: PlacementBoardProps) {
  const [hoveredCells, setHoveredCells] = useState<Coords[]>([]);

  // Get target cell and adjacents
  const getHoveredCells = (coords: Coords) => {
    //Information of the coords
    const { column, row } = coords;
    const cells = [];
    //Destructure information of the ship
    const isVertical = currentShip.isVertical;
    const size = currentShip.size;

    //Check if it's possible to set a ship on the board
    if (!isAvailable(coords)) return;
    for (let i = 0; i < size; i++) {
      if (isVertical) {
        cells.push({ column, row: row + i });
      } else {
        cells.push({ column: column + i, row });
      }
    }
    setHoveredCells(cells);
  };

  return (
    <div className="board border-pink-600 relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 border-8 bg-slate-900 flex flex-col">
      {board.map((row, rowID) => (
        <CellsRow key={rowID}>
          {row.map((_, colID) => {
            const coords: Coords = { column: colID, row: rowID };
            const isOccupied = placedShips.some(
              (coord) => JSON.stringify(coord) === JSON.stringify(coords)
            );
            const shouldHighlight = hoveredCells.some(
              (coord) => JSON.stringify(coord) === JSON.stringify(coords)
            );
            return (
              <Fragment key={colID}>
                {colID === 0 && <Marker pos={rowID} />}
                <Cell
                  key={colID}
                  row={rowID}
                  col={colID}
                  isOccupied={isOccupied}
                  hover={shouldHighlight && true}
                  onClick={() => setOnBoard(coords)}
                  onMouseEnter={() => getHoveredCells(coords)}
                  onMouseLeave={() => setHoveredCells([])}
                >
                  {rowID === 0 && <Marker pos={colID} top />}
                </Cell>
              </Fragment>
            );
          })}
        </CellsRow>
      ))}
    </div>
  );
}

export { PlacementBoard };
