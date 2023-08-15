import React, { PropsWithChildren } from "react";
import { Cursor } from "../../types/type";

// Shows number of row and columns as a guide
export function Marker({ pos, top }: { pos: number; top?: true }) {
  return (
    <div
      className={`marker ${
        top ? "-top-6  sm:-top-7" : " -left-4 sm:-left-5"
      } text-white absolute flex text-base font-mono sm:font-bold select-none cursor-default`}
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
  hover?: boolean;
  cursor?: Cursor;
  isOccupied?: boolean;
  wasHit?: boolean;
  isShip?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick: (e: React.MouseEvent) => void;
}

export function Cell({
  row,
  col,
  hover,
  cursor,
  children,
  isOccupied,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: PropsWithChildren<CellProps>) {
  return (
    <button
      data-row={row}
      data-column={col}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative inline-flex flex-1 justify-center items-center text-xl border border-opacity-75 border-yellow-400
      ${isOccupied && "pointer-events-none cursor-not-allowed"}
      ${isOccupied ? "bg-amber-600" : hover ? "bg-amber-100" : "bg-transparent"}
      ${cursor ? cursor : ""}
      `}
    >
      {children}
    </button>
  );
}

export function GameCell({
  row,
  col,
  cursor,
  wasHit,
  children,
  isShip,
  onClick,
}: PropsWithChildren<CellProps>) {
  return (
    <button
      data-row={row}
      data-column={col}
      onClick={onClick}
      className={`relative inline-flex flex-1 justify-center items-center text-xl border border-opacity-75 border-yellow-400 hover:outline-2 hover:z-10 hover:outline hover:outline-white
      ${cursor ? cursor : ""}
      ${wasHit ? (isShip ? "bg-amber-500" : "bg-amber-700") : ""}
      `}
    >
      {children}
    </button>
  );
}

// If its occupied, set color to bg to blue

export function DisablePatch({ show }: { show?: boolean }) {
  const shouldShow = show ? "" : "hidden";
  return (
    <div
      className={`bg-gray-900 z-50 bg-opacity-75 absolute inset-0 ${shouldShow}`}
    ></div>
  );
}

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
