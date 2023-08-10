import { PropsWithChildren } from "react";

// Shows number of row and columns as a guide
export function Marker({ pos, bot }: { pos: number; bot?: true }) {
  return (
    <div
      className={`marker ${
        bot ? "-top-7" : "-left-5"
      } text-white absolute flex text-sm font-mono font-bold select-none cursor-default`}
    >
      {pos}
    </div>
  );
}

// Contains all the cells that form a row
export function CellsRow({ children }: PropsWithChildren) {
  return <div className="rows w-full flex flex-1">{children}</div>;
}

interface CellProps {
  row: number;
  col: number;
  hover: boolean;
  cursor?: boolean;
  isOccupied: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function Cell({
  row,
  col,
  hover,
  isOccupied,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: CellProps) {
  return (
    <button
      data-row={row}
      data-column={col}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative inline-flex flex-1 justify-center items-center text-xl border border-opacity-75 border-pink-600 cursor-pointer
      ${isOccupied && "pointer-events-none cursor-not-allowed"}
      ${isOccupied ? "bg-blue-400" : hover ? "bg-white" : "bg-transparent"}`}
    ></button>
  );
}

// If its occupied, set color to bg to blue

// Box that represents a ship

export function BoxShip() {
  return (
    <div
      data-length="4"
      data-position="h"
      data-id="ZA2pXc4hMKpm"
      className="ship-box ship-box__h ui-draggable ship-box__draggable"
    ></div>
  );
}
