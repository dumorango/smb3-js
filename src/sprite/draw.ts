import { Position, Sprite, SpritePattern } from "./types";

export const drawSprite = ({ img, coordinates }: Sprite) => (
  position: Position
) => (ctx: CanvasRenderingContext2D) => {
  const { position: spritePosition, size } = coordinates;
  const { width, height } = size;
  ctx.drawImage(
    img,
    spritePosition.x,
    spritePosition.y,
    width,
    height,
    position.x,
    position.y,
    width,
    height
  );
};
