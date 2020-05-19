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
  img: HTMLImageElement;
  coordinates: SpriteCoordinates;
};

export type SpritePattern = Sprite[][];
