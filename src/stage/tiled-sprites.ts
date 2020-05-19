import { SpriteImage } from "../sprite/types";
import {
  Position,
  SpritePlacement,
  PatternState,
  Tile,
  Pattern,
} from "./types";
import { getPatternTiles } from "./patterns";
import { TILE_SPRITES_MAP, TILE_PADDING, TILE_SIZE } from "./tiles";

const getSpriteCoordinates = ({ x, y }: Position) => {
  const sizeWithPadding = TILE_SIZE + TILE_PADDING;
  return {
    position: {
      x: x * sizeWithPadding + TILE_PADDING,
      y: y * sizeWithPadding + TILE_PADDING,
    },
    size: {
      height: TILE_SIZE,
      width: TILE_SIZE,
    },
  };
};

const getTileSprite = (tile: Tile) => {
  const tilePosition = TILE_SPRITES_MAP.get(tile);
  if (!tilePosition) throw new Error(`Tile not mapped ${tile}`);
  const coordinates = getSpriteCoordinates(tilePosition);
  return {
    image: SpriteImage.BACKGROUND,
    coordinates,
  };
};

function* getTilesSpricePlacements(tiles: Tile[][], position: Position) {  
  const startingPosition = {
    x: position.x,
    y: position.y,
  };
  for (let [j, line] of tiles.entries()) {
    for (let [i, tile] of line.entries()) {
      const sprite = getTileSprite(tile);
      const offset = {
        x: i * TILE_SIZE,
        y: j * TILE_SIZE,
      };
      const position = {
        x: startingPosition.x + offset.x,
        y: startingPosition.y + offset.y,
      };
      yield {
        sprite,
        position,
      };
    }
  }
}

export function* getPatternStateSpritePlacements(
  patternsState: PatternState[]
): Generator<SpritePlacement> {
  for (const {
    movement: { position },
    pattern,
  } of patternsState) {
    const tiles = getPatternTiles(pattern);
    yield* getTilesSpricePlacements(tiles, position);
  }
}
