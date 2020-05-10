import { Position, Sprite, SpritePattern } from "./types";

export const drawSprite = ({
  img,
  position: spritePosition,
  size: spriteSize,
}: Sprite) => (position: Position) => (ctx: CanvasRenderingContext2D) => {
  ctx.drawImage(
    img,
    spritePosition.x,
    spritePosition.y,
    spriteSize.width,
    spriteSize.height,
    position.x,
    position.y,
    spriteSize.width,
    spriteSize.height
  );
};

const getSpritesPosition = (pattern: SpritePattern, position: Position) => {
  let spritePositions = [];
  for (let [y, line] of pattern.entries()) {
    for (let [x, sprite] of line.entries()) {
      spritePositions.push({
        sprite,
        position: {
          y: position.y + y * sprite.size.height,
          x: position.x + x * sprite.size.width,
        },
      });
    }
  }
  return spritePositions;
};

export const drawSpritePattern = (
  pattern: SpritePattern,
  position: Position
) => (ctx: CanvasRenderingContext2D) => {
  const spritesPosition = getSpritesPosition(pattern, position);
  spritesPosition.map(({ sprite, position }) => {
    drawSprite(sprite)(position)(ctx);
  });
};
