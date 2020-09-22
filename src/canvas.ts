import { Sprite, SpriteImage, Position } from "./types";

/* istanbul ignore file */
const canvas = document.createElement("canvas");

canvas.width = 256 * 3;
canvas.height = 240 * 3;

document.body.appendChild(canvas);

const context = canvas.getContext("2d");
if (!context) throw Error("Error getting canvas context");

context.imageSmoothingEnabled = false;
context.filter = "none";
context.scale(3, 3);


export const makeDrawSprite = (
  spritesImages: Map<SpriteImage, HTMLImageElement>
) => ({ image, coordinates }: Sprite, shouldDrawBorders: boolean = false) => (
  position: Position
) => {    
  const { position: spritePosition, size } = coordinates;
  const { width, height } = size;
  if (shouldDrawBorders) {
    context.beginPath();
    context.rect(position.x, position.y, size.width, size.height);
    context.strokeStyle = "red";
    context.stroke();
  }

  const img = spritesImages.get(image)!;

  context.drawImage(
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

export const canvasContext = context;
