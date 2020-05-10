import { Position, Size, Sprite } from "./types";

export const createSprite = (img: HTMLImageElement) => (
  position: Position,
  size: Size
): Sprite => ({
  img,
  position,
  size,
});
