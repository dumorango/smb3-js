import { Sprite } from "../../sprite";

export type Position = {
  x: number;
  y: number;
};

export type Size = {
  height: number;
  width: number;
};

export type SpritesImage = string;

export type SpritePlacement = {
  sprite: Sprite;
  position: Position;
};

