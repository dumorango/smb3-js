import * as draw from "../draw";
import { img, position, size, sprite } from "./type-mocks";

const drawImage = jest.fn();

const canvasContextMock = {
  drawImage: drawImage as any,
} as CanvasRenderingContext2D;

describe("The draw module", () => {
  it("should draw a sprite", () => {
    const drawImgSprite = draw.drawSprite({ img, position, size });
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
  it("should draw a sprite pattern", async () => {
    const drawSpriteSpy = jest.spyOn(draw, "drawSprite");
    const pattern = [[sprite, sprite]];
    draw.drawSpritePattern(pattern, position)(canvasContextMock);
    expect(drawSpriteSpy).toHaveBeenNthCalledWith(2, sprite);
  });
});
