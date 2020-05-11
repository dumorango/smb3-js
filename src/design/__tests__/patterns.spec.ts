import { Tile } from "../tiles";
import { createGroundPattern, createSkyPattern } from "../patterns";

describe("The pattern module", () => {
  describe("the createGroundPattern function", () => {
    it("should create a ground pattern", () => {
      const groundPattern = createGroundPattern(4);
      expect(groundPattern).toEqual([
        [
          Tile.GROUND_TOP_LEFT,
          Tile.GROUND_TOP_MIDDLE,
          Tile.GROUND_TOP_MIDDLE,
          Tile.GROUND_TOP_RIGHT,
        ],
      ]);
    });
    it("should create a ground pattern with no middle tile", () => {
      const groundPattern = createGroundPattern(2);
      expect(groundPattern).toEqual([
        [Tile.GROUND_TOP_LEFT, Tile.GROUND_TOP_RIGHT],
      ]);
    });
  });
  describe("the createSky pattern function", () => {
    it("should create a sky pattern", () => {
      const groundPattern = createSkyPattern({
        length: 3,
        height: 2,
      });
      expect(groundPattern).toEqual([
        [Tile.SKY, Tile.SKY, Tile.SKY],
        [Tile.SKY, Tile.SKY, Tile.SKY],
      ]);
    });
  });
});
