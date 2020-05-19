/* istanbul ignore file */

import { getBackgroundLayer } from "./layers";
import { getEnemies } from "./enemies";
import { StageDesign } from "../stage";

const INITIAL_POSITION = {
  x: 20,
  y: 12 * 10 + 1,
};
  
export const getStage = (): StageDesign => ({
  layers: [getBackgroundLayer()],
  enemies: getEnemies(),
  player: {
    position: INITIAL_POSITION
  }
});
