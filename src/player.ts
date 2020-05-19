/* istanbul ignore file */

import MarioSpriteSheet from "./img/smb3_mario_sprites.png";
import { loadImage } from "./loaders";

export const loadMarioSprite = async () => {
  const marioSpriteSheet = await loadImage(MarioSpriteSheet);
  return {
    img: marioSpriteSheet,
    coordinates: {
      position: {
        x: 216,
        y: 89,
      },
      size: {
        height: 15,
        width: 14,
      },
    },
  };
};
