import * as draw from "../draw";
import { img, position, size, sprite } from "./type-mocks";
import { SpriteImage } from "../types";

const drawImage = jest.fn();
const drawRect = jest.fn();
const beginPath = jest.fn();
const rect = jest.fn();
const stroke = jest.fn();

const canvasContextMock = {
  drawImage,
  drawRect,
  beginPath,
  rect,
  stroke,
};

const spriteImages = new Map([[SpriteImage.BACKGROUND, img]]);

describe("The draw module", () => {
  beforeEach(() => {
    //@ts-ignore
    // canvasContextMock.mockReset();
  });
  it("should draw a sprite", () => {
    const ctx = (canvasContextMock as unknown) as CanvasRenderingContext2D;
    const drawImgSprite = draw.makeDrawSprite(ctx, spriteImages)(
      {
        image: SpriteImage.BACKGROUND,
        coordinates: { position, size },
      },
      true
    );
    drawImgSprite(position);
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
    expect(beginPath).toHaveBeenCalledWith();
    expect(rect).toHaveBeenCalledWith(
      position.x,
      position.y,
      size.width,
      size.height
    );
    expect(stroke).toHaveBeenCalledTimes(1);
  });
});
