import { test } from "vitest";
import Ship from "../ship";

test("Test initialized ship variables", () => {
  expect(new Ship(4).hits).toBe(0);
  expect(new Ship(3).sunked).toBe(false);
  expect(new Ship().isVertical).toBe(false);
  expect(new Ship(2).size).toBe(2);
});

test("Increment hits property when called method hit", () => {
  const ship = new Ship(4);
  expect(ship.hits).toBe(0);

  expect(ship.hit()).toBe(1);
  expect(ship.hit()).toBe(2);
  expect(ship.hit()).toBe(3);
  expect(ship.hit()).toBe(4);
});

test("Check if the ship was sunked", () => {
  const ship = new Ship(2);
  ship.hit();
  ship.hit();

  expect(ship.isSunk()).toBe(true);

  const ship2 = new Ship(2);
  expect(ship2.isSunk()).toBe(false);
});
