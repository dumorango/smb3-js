export enum SpriteImage {
  MARIO = "MARIO",
  BACKGROUND = "BACKGROUND",
  ENEMIES = "ENEMIES",
}


export type Position = {
  x: number;
  y: number;
};

export type Size = {
  height: number;
  width: number;
};

export type SpriteCoordinates = {
  position: Position;
  size: Size;
};

export type Sprite = {
  image: SpriteImage;
  coordinates: SpriteCoordinates;
};

export type SpritePattern = Sprite[][];
