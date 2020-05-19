/* istanbul ignore file */

import { getBackgroundLayer } from "./layers";

export const getStage = () => ({
  layers: [getBackgroundLayer()],
});
