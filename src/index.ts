import { loadGame } from "./game";
import { goombaKillsMario, marioBreaksBlock, marioKillsGoomba } from "./__tests__/test-stage";
import { getStage } from "./design";
import { getStageState } from "./stage-loader";

// let stage = getStageState(marioBreaksBlock);
let stage = getStageState(getStage());

loadGame(stage);

// setTimeout(() => loadGame(goombaKillsMario), 1000);
