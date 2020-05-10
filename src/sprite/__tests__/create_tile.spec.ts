import { createTileSprite } from "./../create-tile";
import { img } from "./type-mocks";

describe("The create tile module", () => {
  it("should create tile sprite", () => {
    const tileSize = 16;
    const tileBorder = 1;
    const createTestTileSprite = createTileSprite(img, tileSize, tileBorder);
    const testSprite = createTestTileSprite({
      x: 3,
      y: 2,
    });
    expect(testSprite).toEqual({
      img,
      position: {
        x: 3 * 17 + 1,
        y: 2 * 17 + 1,
      },
      size: {
        height: 16,
        width: 16,
      },
    });
  });
});
