import { PropsWithChildren } from "react";

// Shows number of row and columns as a guide
export function Marker({ pos, bot }: { pos: number; bot?: true }) {
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
export function CellsRow({
  row,
  children,
}: PropsWithChildren<{ row: number }>) {
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
export function Cell({
  column,
  children,
}: PropsWithChildren<{ column: number }>) {
  return (
    <button
      className="cells relative inline-flex flex-1 justify-center items-center text-xl border border-opacity-75 border-pink-600 "
      data-column={column}
    >
      {children}
    </button>
  );
}
