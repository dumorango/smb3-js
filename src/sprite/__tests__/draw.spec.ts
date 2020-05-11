import * as draw from "../draw";
import { img, position, size, sprite } from "./type-mocks";

const drawImage = jest.fn();

const canvasContextMock = {
  drawImage: drawImage as any,
} as CanvasRenderingContext2D;

describe("The draw module", () => {
  it("should draw a sprite", () => {
    const drawImgSprite = draw.drawSprite({
      img,
      coordinates: { position, size },
    });
    const drawImgSpriteOnPosition = drawImgSprite(position);
    drawImgSpriteOnPosition(canvasContextMock);
    expect(drawImage).toHaveBeenCalledWith(
      img,
      position.x,
      position.y,
      size.width,
      size.height,
      position.x,
      position.y,
      size.width,
      size.height
    );
  });
});
