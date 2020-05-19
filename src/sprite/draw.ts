import { Position, Sprite, SpritePattern, SpriteCoordinates } from "./types";
import { SpriteImageMap } from "./images";

export const drawBorders = (
  ctx: CanvasRenderingContext2D,
  { position, size }: SpriteCoordinates
) => {
  ctx.beginPath();
  ctx.rect(position.x, position.y, size.width, size.height);
  ctx.strokeStyle = "red";
  ctx.stroke();
};

export const makeDrawSprite = (
  ctx: CanvasRenderingContext2D,
  spritesImages: SpriteImageMap
) => ({ image, coordinates }: Sprite, shouldDrawBorders: boolean = false) => (
  position: Position
) => {
  const { position: spritePosition, size } = coordinates;
  const { width, height } = size;
  shouldDrawBorders &&
    drawBorders(ctx, {
      position: position,
      size: size,
    });

  const img = spritesImages.get(image)!;

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
