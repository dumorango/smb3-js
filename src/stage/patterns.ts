import { TILE_SIZE } from './tiles';
import {
  PatternSpawnPoint,
  Pattern,
  PatternType,
  Size,
  Tile,
  Trait,
  PatternState,
} from "./types";

const createSkyPattern = ({ width, height }: Size) => {
  const skySpritePattern = Array< Tile[]>(height).fill(
    Array<Tile>(width).fill(Tile.SKY, 0, width),
    0,
    height
  );
  return skySpritePattern;
};

const createPipePattern = (height: number) => {
  const base = Array<Tile[]>(height).fill([
    Tile.PIPE_BOTTOM_LEFT,
    Tile.PIPE_BOTTOM_RIGHT,
  ]);
  return [[Tile.PIPE_TOP_LEFT, Tile.PIPE_TOP_RIGHT], ...base];
};

const createBrickPattern = () => {
  return [[Tile.BRICK1]];
};

const createGroundPattern = (length: number) => {
  const middleLength = length > 2 ? length - 2 : 0;
  const tilesArray = Array<Tile.GROUND_TOP_MIDDLE>(middleLength).fill(
    Tile.GROUND_TOP_MIDDLE,
    0,
    middleLength
  );
  return [[Tile.GROUND_TOP_LEFT, ...tilesArray, Tile.GROUND_TOP_RIGHT]];
};

const getPatternTraits = (patternType: PatternType) => {
  switch (patternType) {
    case PatternType.GROUND:
    case PatternType.PIPE:
      return [Trait.SOLID];
    case PatternType.BRICK:
      return [Trait.SOLID, Trait.BREAKABLE];
  }
};

export const getPatternState = ({
  pattern,
  position,
}: PatternSpawnPoint): PatternState => {
  return {
    pattern,
    movement: {
      position: {
        x: position.x * TILE_SIZE,
        y: position.y * TILE_SIZE
      },
      velocity: { x: 0, y: 0 },
      acceleration: { x: 0, y: 0 },
    },
    traits: getPatternTraits(pattern.type),    
  };
};

export const getPatternTiles = (pattern: Pattern) => {
  if (pattern.type === PatternType.GROUND) {
    return createGroundPattern(pattern.length);
  } else if (pattern.type === PatternType.SKY) {
    return createSkyPattern(pattern.size);
  } else if (pattern.type === PatternType.PIPE) {
    return createPipePattern(pattern.height);
  } else if (pattern.type === PatternType.BRICK) {
    return createBrickPattern();
  }
  throw new Error(`Pattern Type not mapped`);
};


export const getPatternSize = (pattern: Pattern) => {
  const tiles = getPatternTiles(pattern);
  return {    
    width: (tiles[0].length) * TILE_SIZE,    
    height: (tiles.length) * TILE_SIZE,
  };
};
