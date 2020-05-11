import { Tile } from "./tiles";

export const createGroundPattern = (length: number) => {
  const middleLength = length > 2 ? length - 2 : 0;
  const tilesArray = Array<Tile.GROUND_TOP_MIDDLE>(middleLength).fill(
    Tile.GROUND_TOP_MIDDLE,
    0,
    middleLength
  );
  return [[Tile.GROUND_TOP_LEFT, ...tilesArray, Tile.GROUND_TOP_RIGHT]];
};

type Size = {
  length: number;
  height: number;
};

export const createSkyPattern = ({ length, height }: Size) => {
  const skySpritePattern = Array<Tile[]>(height).fill(
    Array<Tile>(length).fill(Tile.SKY, 0, length),
    0,
    height
  );
  return skySpritePattern;
};
