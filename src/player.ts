/* istanbul ignore file */

import MarioSpriteSheet from "./img/smb3_mario_sprites.png";
import { loadImage } from "./loaders";
import { createSprite } from "./sprite";

export const loadMarioSprite = async () => {
  const marioSpriteSheet = await loadImage(MarioSpriteSheet);
  const createMarioSprite = createSprite(marioSpriteSheet);
  return createMarioSprite(
    {
      x: 216,
      y: 89,
    },
    {
      height: 15,
      width: 14,
    }
  );
};
