import {
  Position,  
  Pattern,
  Size,  
} from "./types";

export const TILE_SIZE = 16;

const TILE_PADDING = 1;
const TILE_SPRITES_MAP = {
    "SKY":
    {
      x: 38,
      y: 1,
    },  
    "GROUND_TOP_LEFT":
    {
      x: 26,
      y: 9,
    },    
    "GROUND_TOP_MIDDLE":
    {
      x: 27,
      y: 9,
    },    
    "GROUND_TOP_RIGHT":
    {
      x: 28,
      y: 9,
    },    
    "PIPE_TOP_LEFT":
    {
      x: 4,
      y: 2,
    },    
    "PIPE_TOP_RIGHT":
    {
      x: 5,
      y: 2,
    },    
    "PIPE_BOTTOM_LEFT":
    {
      x: 4,
      y: 3,
    },    
    "PIPE_BOTTOM_RIGHT":
    {
      x: 5,
      y: 3,
    }, 
    "BRICK1":
    {
      x: 61,
      y: 0,
    },  
  };

type Tile = keyof typeof TILE_SPRITES_MAP; 

const createSkyPattern = ({ width, height }: Size) => {
  const skySpritePattern = Array< Tile[]>(height).fill(
    Array<Tile>(width).fill("SKY" as const, 0, width),
    0,
    height
  );
  return skySpritePattern;
};

const createPipePattern = (height: number) => {
  const base = Array<Tile[]>(height).fill([
    "PIPE_BOTTOM_LEFT" as const,
    "PIPE_BOTTOM_RIGHT" as const,
  ]);
  return [["PIPE_TOP_LEFT" as const, "PIPE_TOP_RIGHT" as const], ...base];
};

const createBrickPattern = () => {
  return [["BRICK1" as const]];
};

const createGroundPattern = (length: number) => {
  const middleLength = length > 2 ? length - 2 : 0;
  const tilesArray = Array<"GROUND_TOP_MIDDLE">(middleLength).fill(
    "GROUND_TOP_MIDDLE" as const,
    0,
    middleLength
  );
  return [["GROUND_TOP_LEFT" as const, ...tilesArray, "GROUND_TOP_RIGHT" as const]];
};

export const getPatternTiles = (pattern: Pattern) => {
  if (pattern.type === "GROUND") {
    return createGroundPattern(pattern.length);
  } else if (pattern.type === "SKY") {
    return createSkyPattern(pattern.size);
  } else if (pattern.type === "PIPE") {
    return createPipePattern(pattern.height);
  } else if (pattern.type === "BRICK") {
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
  const tilePosition = TILE_SPRITES_MAP[tile];
  if (!tilePosition) throw new Error(`Tile not mapped ${tile}`);
  const coordinates = getSpriteCoordinates(tilePosition);
  return {
    image: "BACKGROUND" as const,
    coordinates,
  };
};

export function* getTilesSpricePlacements(tiles: Tile[][], position: Position) {
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
