import { getHitBox } from "../hitbox";

describe("the hitbox module", () => {
  it("should get the hitbox by the sprite coordinates", () => {
    const position = {
      x: 0,
      y: 0,
    };
    const size = {
      height: 10,
      width: 20,
    };

    const hitbox = getHitBox(position, size);
    expect(hitbox).toEqual({
      left: 0,
      right: 20,
      top: 0,
      bottom: 10,
    });
  });
});
