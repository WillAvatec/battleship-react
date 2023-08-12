import { PropsWithChildren, useState } from "react";
import Ship from "../constructors/ship";

interface ShipContainerProps {
  shipsArray: Ship[];
  changeDirection: () => void;
  select: (index: number) => void;
}

function ShipPlacementContainer({
  select,
  children,
  shipsArray,
  changeDirection,
}: PropsWithChildren<ShipContainerProps>) {
  const [shipIndex, setIndex] = useState(0);

  const selectShip = (e: React.MouseEvent) => {
    const target = e.target as HTMLDivElement;
    if (target.classList.contains("ship-selector")) {
      const orderIndex = Number(target.dataset.shiporder);
      // Select ship from Ships[] on parent component
      select(orderIndex);
      // Set new index
      setIndex(orderIndex);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {children}
      <div
        onClick={selectShip}
        onDoubleClick={changeDirection}
        className="grid auto-cols-fr auto-rows-auto gap-5 md:gap-4 justify-center content-center px-6 py-3 h-64 md:px-7 md:py-4 bg-slate-700  shadow-lg shadow-cyan-500/50 rounded-xl"
      >
        {shipsArray.map((ship, index) => {
          const size = ship.size;
          const isVertical = ship.isVertical;
          return (
            <ShipGrid key={index} size={size}>
              <ShipSelector
                pos={index}
                size={size}
                isVertical={isVertical}
                selected={shipIndex === index}
              />
            </ShipGrid>
          );
        })}
      </div>
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

function ShipSelector({
  pos,
  size = 1,
  selected,
  isVertical,
}: {
  pos: number;
  size: number;
  selected?: boolean;
  isVertical: boolean;
}) {
  const cells = [];
  for (let i = 0; i < size; i++) {
    cells.push(<ShipCells isVertical={isVertical} key={i} />);
  }
  return (
    <div
      data-shiporder={pos}
      className={`ship-selector
      } group inline-flex relative z-10 w-max cursor-pointer ${
        selected ? (isVertical ? "selected-vertical" : "selected") : ""
      }`}
    >
      {cells}
    </div>
  );
}

function ShipCells({ isVertical }: { isVertical: boolean }) {
  return (
    <div
      className={`ship-cells w-6 h-6 md:w-8 md:h-8 bg-indigo-50  relative pointer-events-none ${
        isVertical ? "group-hover:bg-orange-400" : "group-hover:bg-cyan-600"
      }`}
    ></div>
  );
}

export default ShipPlacementContainer;
