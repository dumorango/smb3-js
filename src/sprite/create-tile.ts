import { Sprite, Position } from "./types";

export const createTileSprite = (
  img: HTMLImageElement,
  tileSize: number,
  tileBorder: number
) => (position: Position): Sprite => {
  const tileSizeWithBorder = tileSize + tileBorder;
  return {
    img,
    position: {
      x: position.x * tileSizeWithBorder + tileBorder,
      y: position.y * tileSizeWithBorder + tileBorder,
    },
    size: {
      height: tileSize,
      width: tileSize,
    },
  };
};
