import { PropsWithChildren } from "react";
import ShipType from "../constructors/ship";

function ShipPlacementContainer({ shipsArray }: { shipsArray: ShipType[] }) {
  return (
    <div className="grid auto-cols-fr auto-rows-auto gap-5 md:gap-4 justify-center content-center px-6 py-3 h-64 md:px-7 md:py-4 bg-slate-700  shadow-lg shadow-cyan-500/50 rounded-xl">
      {shipsArray.map((ship, index) => {
        const size = ship.size;
        return (
          <ShipGrid key={index} size={size}>
            <ShipSelector pos={index} size={size} />
          </ShipGrid>
        );
      })}
    </div>
  );
}

function ShipGrid({ size, children }: PropsWithChildren<{ size: number }>) {
  return (
    <div className="inline-grid" data-shipsize={size}>
      {children}
    </div>
  );
}

function ShipSelector({ pos, size = 1 }: { pos: number; size: number }) {
  const cells = [];
  for (let i = 0; i < size; i++) {
    cells.push(<ShipCells key={i} />);
  }
  return (
    <div
      data-shiporder={pos}
      className={`ship-selector group inline-flex relative z-10 w-max cursor-pointer ${
        pos === 0 ? "selected" : ""
      }`}
    >
      {cells}
    </div>
  );
}

function ShipCells() {
  return (
    <div className="ship-cells w-6 h-6 md:w-8 md:h-8 bg-indigo-50 group-hover:bg-cyan-600 relative pointer-events-none"></div>
  );
}

export default ShipPlacementContainer;
