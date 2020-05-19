/* istanbul ignore file */
import { loadImage } from "../loaders/image";
import EnemiesSpriteSheet from "../img/enemies-2.png";
import BackgroundImage from "../img/smb3_background_tiles.png";
import MarioSpriteSheet from "../img/smb3_mario_sprites.png";
import { SpriteImage } from "./types";

export type SpriteImageMap =  Map<SpriteImage, HTMLImageElement>;

export async function loadSpritesImages(): Promise<SpriteImageMap> {
  const [
    enemiesSpriteSheet,
    backgroundSpriteSheet,
    marioSpriteSheet,
  ] = await Promise.all(
    [EnemiesSpriteSheet, BackgroundImage, MarioSpriteSheet].map(loadImage)
  );
  return new Map<SpriteImage, HTMLImageElement>([
    [SpriteImage.MARIO, marioSpriteSheet],
    [SpriteImage.BACKGROUND, backgroundSpriteSheet],
    [SpriteImage.ENEMIES, enemiesSpriteSheet]
  ]);
}
