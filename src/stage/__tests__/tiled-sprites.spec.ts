import { Tile, PatternType, PatternState } from "../types";
import { getPatternStateSpritePlacements } from "../tiled-sprites";
import { SpriteImage } from "../../sprite/types";

import { getPatternTiles } from "../patterns";

jest.mock("../patterns");

describe("The tiled sprites module", () => {
  const patternStates = [
    {
      movement: {
        position: { x: 0, y: 0 },
      },
    },
  ] as PatternState[];

  it("should get a create sprite function by tilePositon and tileSpecs", () => {
    (getPatternTiles as jest.Mock).mockReturnValue([[Tile.SKY]]);

    const tilePlacements = getPatternStateSpritePlacements(patternStates);
    expect([...tilePlacements]).toEqual([
      {
        position: { x: 0, y: 0 },
        sprite: {
          coordinates: {
            position: { x: 647, y: 18 },
            size: { height: 16, width: 16 },
          },
          image: SpriteImage.BACKGROUND,
        },
      },
    ]);
  });
  it("should throw en error if the tile is not mapped on the layer tiles map", () => {
    (getPatternTiles as jest.Mock).mockReturnValue([["TILE_NOT_MAPPED"]]);
    expect(() => [
      ...getPatternStateSpritePlacements(patternStates),
    ]).toThrowError();
  });
});
