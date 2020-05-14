/* istanbul ignore file */

export enum Tile {
  SKY = "SKY",
  GROUND_TOP_LEFT = "GROUND_TOP_LEFT",
  GROUND_TOP_RIGHT = "GROUND_TOP_RIGHT",
  GROUND_TOP_MIDDLE = "GROUND_TOP_MIDDLE",
}

export const TILE_SPRITES_MAP = new Map([
  [
    Tile.SKY,
    {
      x: 38,
      y: 1,
    },
  ],
  [
    Tile.GROUND_TOP_LEFT,
    {
      x: 26,
      y: 9,
    },
  ],
  [
    Tile.GROUND_TOP_MIDDLE,
    {
      x: 27,
      y: 9,
    },
  ],
  [
    Tile.GROUND_TOP_RIGHT,
    {
      x: 28,
      y: 9,
    },
  ],
]);
