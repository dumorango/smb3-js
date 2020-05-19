import { getStageSpritesPlacements } from "../tiled-sprites";

describe("The tiled sprites module", () => {
  const img = document.createElement("img");
  const position = {
    x: 10,
    y: 15,
  };
  const tilePosition = {
    x: 0,
    y: 0,
  };
  const tileSpecs = {
    size: 9,
    padding: 1,
  };
  it("should get a create sprite function by tilePositon and tileSpecs", () => {
    const pattern = [["TILE"]];
    const stage = {
      layers: [
        {
          img,
          layout: {
            tileSpecs,
            patterns: [
              {
                position,
                pattern,
              },
            ],
          },
          tileMap: new Map([["TILE", tilePosition]]),
        },
      ],
    };
    const tilePlacements = getStageSpritesPlacements(stage);
    expect([...tilePlacements]).toEqual([
      {
        position: {
          x: 90,
          y: 135,
        },
        sprite: {
          coordinates: {
            position: {
              x: 1,
              y: 1,
            },
            size: {
              height: 9,
              width: 9,
            },
          },
          img,
        },
      },
    ]);
  });
  it("should throw en error if the tile is not mapped on the layer tiles map", () => {
    const pattern = [["GROUND"]];
    const stage = {
      layers: [
        {
          img,
          layout: {
            tileSpecs,
            patterns: [
              {
                position,
                pattern,
              },
            ],
          },
          tileMap: new Map([["SKY", tilePosition]]),
        },
      ],
    };
    expect(() => [...getStageSpritesPlacements(stage)]).toThrowError();
  });
});
