import { Tile } from "./types";

export const TILE_SIZE = 16;
export const TILE_PADDING = 1;

export const tileSpecs = {
  size: TILE_SIZE,
  padding: TILE_PADDING,
};

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
  [
    Tile.PIPE_TOP_LEFT,
    {
      x: 4,
      y: 2,
    },
  ],
  [
    Tile.PIPE_TOP_RIGHT,
    {
      x: 5,
      y: 2,
    },
  ],
  [
    Tile.PIPE_BOTTOM_LEFT,
    {
      x: 4,
      y: 3,
    },
  ],
  [
    Tile.PIPE_BOTTOM_RIGHT,
    {
      x: 5,
      y: 3,
    },
  ],
  [
    Tile.BRICK1,
    {
      x: 61,
      y: 0,
    },
  ],
]);
