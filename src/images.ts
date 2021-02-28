import EnemiesSpriteSheet from "./img/enemies-2.png";
import BackgroundImage from "./img/smb3_background_tiles.png";
import MarioSpriteSheet from "./img/smb3_mario_sprites.png";

// Image loading
export const loadSpritesImages = async () => {
    const [
      enemiesSpriteSheet,
      backgroundSpriteSheet,
      marioSpriteSheet,
    ] = await Promise.all(
      [EnemiesSpriteSheet, BackgroundImage, MarioSpriteSheet].map(
        (url): Promise<HTMLImageElement> =>
          new Promise((resolve) => {
            const img = new Image();
            img.src = url;
            img.addEventListener("load", () => resolve(img));
          })
      )
    );
    return {
      "MARIO": marioSpriteSheet,
      "BACKGROUND": backgroundSpriteSheet,
      "ENEMIES": enemiesSpriteSheet
    };
  };