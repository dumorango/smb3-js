import { TiledPatternPlacement, TileSpecs, TiledLayout } from "./types";

function* tiledPatternPlacementToTilePlacement<Tile>(
  { pattern, position }: TiledPatternPlacement<Tile>,
  tileSpecs: TileSpecs
) {
  const startingPosition = {
    x: position.x * tileSpecs.size,
    y: position.y * tileSpecs.size,
  };
  for (let [j, line] of pattern.entries()) {
    for (let [i, tile] of line.entries()) {
      const offset = {
        x: i * tileSpecs.size,
        y: j * tileSpecs.size,
      };
      const tilePlacement = {
        tile,
        position: {
          x: startingPosition.x + offset.x,
          y: startingPosition.y + offset.y,
        },
      };
      yield tilePlacement;
    }
  }
}

export function* getTilePlacements<Tile>(layout: TiledLayout<Tile>) {
  for (const pattern of layout.patterns) {
    const tilePlacement = tiledPatternPlacementToTilePlacement(
      pattern,
      layout.tileSpecs
    );
    yield* tilePlacement;
  }
}
