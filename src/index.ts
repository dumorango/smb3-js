import { StageState } from './stage/types';
import { applyCollitions } from "./stage/colision";
import { getFrameStream } from "./frame-animation";
import { makeDrawStage } from "./draw";
import { getStage } from "./design";
import { Input, getInputStream } from "./input";
import {
  applyMovementToState,
  getPlayerMovementStreamByInput,
} from "./movement";
import { canvasContext } from "./canvas";
import { getStageState } from './stage';

const accelerationConfig = {
  gravity: 0.1,
  maxSpeed: 2,
  friction: 0.15,
};

const keyMap = new Map<Input, string>([
  ["RIGHT", "KeyD"],
  ["LEFT", "KeyA"],
  ["JUMP", "KeyJ"],
]);

let state: StageState;

const loadGame = async () => {
  const mainStageDesign = getStage();
  state = getStageState(mainStageDesign);
  const draw = await makeDrawStage(canvasContext);   
  
  (async () => {
    while (!(await getFrameStream().next()).done) {        
      state = applyMovementToState(state, accelerationConfig);      
      state = applyCollitions(state);    
      draw(state);
    }
  })();
  (async () => {
    for await (const applyMovement of getPlayerMovementStreamByInput(
      getInputStream(keyMap)
    )) {
      state.mario.movement = applyMovement(state.mario.movement);
    }
  })();
};

loadGame();
