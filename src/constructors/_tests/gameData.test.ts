import { describe, test } from "vitest";
import { GameData } from "../gameData";

describe("Test gameData constructor", () => {
  const noParam_gameData = new GameData();

  describe("When no parameter is given", () => {
    test("Player name to be default", () => {
      expect(noParam_gameData.player.name).toBe("Player");
    });

    test("gameState should be initialized to 'start'", () => {
      expect(noParam_gameData.gameState).toBe("start");
    });
  });

  const gameData = new GameData("Arturo");

  describe("When parameter is given", () => {
    test("Player name must be initialized to 'Arturo'", () => {
      expect(gameData.player.name).toBe("Arturo");
    });

    test("gameState should be initialized to 'start'", () => {
      expect(gameData.gameState).toBe("start");
    });
  });
});
