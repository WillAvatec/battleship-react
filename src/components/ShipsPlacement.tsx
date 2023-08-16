import { PropsWithChildren, useState } from "react";
import Ship from "../constructors/ship";

interface ShipContainerProps {
  shipsArray: Ship[];
  placedShips: Ship[];
  changeDirection: (index: number) => void;
  select: (index: number) => void;
}

function ShipPlacementContainer({
  select,
  children,
  shipsArray,
  placedShips,
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

  const shouldDisable = (ship: Ship) => {
    return placedShips.some((placed) => Object.is(placed, ship));
  };

  return (
    <div className="flex flex-col gap-4">
      {children}
      <div
        onClick={selectShip}
        onDoubleClick={() => changeDirection(shipIndex)}
        className="tree-border-2 mt-4 h-80 grid auto-cols-fr auto-rows-auto gap-5 md:gap-4 pl-8 md:pl-4  content-center  bg-gradient-to-bl from-amber-200 to-amber-100 shadow-lg rounded-xl"
      >
        {shipsArray.map((ship, index) => {
          const size = ship.size;
          const isVertical = ship.isVertical;
          return (
            <ShipGrid key={index} size={size}>
              <ShipSelector
                disable={shouldDisable(ship)}
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
  disable,
}: {
  pos: number;
  size: number;
  selected?: boolean;
  isVertical: boolean;
  disable: boolean;
}) {
  const cells = [];
  for (let i = 0; i < size; i++) {
    cells.push(<ShipCells disable={disable} isVertical={isVertical} key={i} />);
  }
  const evaluate = selected
    ? isVertical
      ? "selected-vertical"
      : "selected"
    : "";
  return (
    <button
      data-shiporder={pos}
      disabled={disable}
      className={`ship-selector disabled:bg-slate-300 group rounded inline-flex relative z-10 w-max cursor-pointer ${evaluate}`}
    >
      {cells}
    </button>
  );
}

function ShipCells({
  isVertical,
  disable,
}: {
  isVertical: boolean;
  disable: boolean;
}) {
  const shouldDisable = disable ? "" : "bg-green-500";
  const shouldVertical = isVertical
    ? "group-hover:bg-amber-700"
    : "group-hover:bg-green-800";
  return (
    <div
      className={`ship-cells w-6 h-6 md:w-8 md:h-8 ${shouldDisable} ${shouldVertical}  relative pointer-events-none transition-colors`}
    ></div>
  );
}

export default ShipPlacementContainer;
