import { TileSpecs, Position, LoadedStage } from "./types";
import { getTilePlacements } from "./tiled-layout";

const getSpriteCoordinates = (
  { x, y }: Position,
  { size, padding }: TileSpecs
) => {
  const sizeWithPadding = size + padding;
  return {
    position: {
      x: x * sizeWithPadding + padding,
      y: y * sizeWithPadding + padding,
    },
    size: {
      height: size,
      width: size,
    },
  };
};

export function* getStageSpritesPlacements<Tile>(stage: LoadedStage<Tile>) {
  const { layers } = stage;
  for (const { img, layout, tileMap } of layers) {
    for (const { position, tile } of getTilePlacements(layout)) {
      const tilePosition = tileMap.get(tile);
      if (!tilePosition)
        throw new Error(`Tile ${tile} not defined on tile maps`);
      yield {
        sprite: {
          img,
          coordinates: getSpriteCoordinates(tilePosition, layout.tileSpecs),
        },
        position,
      };
    }
  }
}
