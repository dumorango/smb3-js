import { getTilePlacements } from "../tiled-layout";

describe("The tiled layout module", () => {
  it("should getTilePlacements by layout", () => {
    const tileSpecs = {
      size: 10,
      padding: Infinity,
    };
    const pattern = [
      ["SKY", "SKY"],
      ["GROUND_TOP_LEFT", "GROUND_TOP_RIGHT"],
    ];
    const tiledPatternPlacement = {
      position: {
        x: 2,
        y: 3,
      },
      pattern,
    };
    const layout = {
      tileSpecs,
      patterns: [tiledPatternPlacement],
    };

    const tilePlacements = getTilePlacements(layout);
    expect([...tilePlacements]).toEqual([
      {
        position: {
          x: 20,
          y: 30,
        },
        tile: "SKY",
      },
      {
        position: {
          x: 30,
          y: 30,
        },
        tile: "SKY",
      },
      {
        position: {
          x: 20,
          y: 40,
        },
        tile: "GROUND_TOP_LEFT",
      },
      {
        position: {
          x: 30,
          y: 40,
        },
        tile: "GROUND_TOP_RIGHT",
      },
    ]);
  });
});
