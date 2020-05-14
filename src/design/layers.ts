/* istanbul ignore file */
import { createGroundPattern, createSkyPattern } from "./patterns";
import BackgroundImage from "../img/smb3_background_tiles.png";
import { TILE_SPRITES_MAP } from "./tiles";

const TILE_SIZE = 16;
const TILE_PADDING = 1;

export const getBackgroundLayer = () => {
  const ground1Placement = {
    pattern: createGroundPattern(16),
    position: {
      x: 0,
      y: 13,
    },
  };
  const skyPatternPlacement = {
    pattern: createSkyPattern({ length: 16, height: 15 }),
    position: {
      x: 0,
      y: 0,
    },
  };
  const patterns = [skyPatternPlacement, ground1Placement];

  return {
    imageFile: BackgroundImage,
    layout: {
      tileSpecs: {
        size: TILE_SIZE,
        padding: TILE_PADDING,
      },
      patterns,
    },
    tileMap: TILE_SPRITES_MAP,
  };
};
