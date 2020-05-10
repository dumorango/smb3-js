import { createSprite } from "./../create";
import { img, position, size } from "./type-mocks";

describe("The create sprite module", () => {
  it("should create a sprite", () => {
    const createImgSprite = createSprite(img);
    expect(createImgSprite(position, size)).toEqual({
      img,
      position,
      size,
    });
  });
});
