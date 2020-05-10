export type Position = {
  x: number;
  y: number;
};

export type Size = {
  height: number;
  width: number;
};

export type Sprite = {
  img: HTMLImageElement;
  position: Position;
  size: Size;
};

export type SpritePattern = Sprite[][];
