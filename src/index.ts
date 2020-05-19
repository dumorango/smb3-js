import { getHitBox } from './collision/hitbox';
import { makeApplyCollisionWithStage, makeApplyCollisionWithEnemy } from "./stage/colision";
import { getFrameStream } from "./frame-animation";
import { makeDrawStage } from "./draw";
import { getStage } from "./design";
import { Input, getInputStream } from "./input";
import {
  makeApplyMovement,
  getPlayerMovementStreamByInput,
} from "./movement";
import { canvasContext } from "./canvas";

import {
  getMovement,
  setMovement,
  accelerationConfig,
  getState,
  setEnemies,
  setPlayer,
  setState,
} from "./state";
import { getSprite } from "./stage/enemies";
import { getStageState } from './stage';

const keyMap = new Map<Input, string>([
  ["RIGHT", "KeyD"],
  ["LEFT", "KeyA"],
  ["JUMP", "KeyJ"],
]);

const loadGame = async () => {
  const mainStageDesign = getStage();

  const mainStageState = getStageState(mainStageDesign);
  
  setState(mainStageState);

  const draw = await makeDrawStage(canvasContext); 

  const applyMovement = makeApplyMovement(accelerationConfig);
  
  (async () => {
    while (!(await getFrameStream().next()).done) {
      let state = getState();
      let { mario, enemies } = state;

      const applyCollition = makeApplyCollisionWithStage(state);

      const playerHitBox = getHitBox(mario.movement.position, mario.sprite.coordinates.size);

      const nextFrameMovement = applyMovement(mario.movement);

      const newMovement = applyCollition(nextFrameMovement, playerHitBox, [], mario.sprite.coordinates);

      const newEnemies = enemies.map((enemy) => {
        const sprite = getSprite(enemy.type);        
        const hitBox = getHitBox(enemy.movement.position, sprite.size); 
        const applyCollitionWithEnemy = makeApplyCollisionWithEnemy(enemy);
        const [newPlayerState, newEnemyState] = applyCollitionWithEnemy(playerHitBox, mario);
        mario = newPlayerState;
        return {
          ...newEnemyState,
          movement: applyCollition(applyMovement(enemy.movement), hitBox, enemy.traits, sprite),          
        };
      });

      setEnemies(newEnemies);

      setMovement(newMovement);
      setPlayer(mario);
      draw(getState());
    }
  })();
  (async () => {
    for await (const applyMovement of getPlayerMovementStreamByInput(
      getInputStream(keyMap)
    )) {
      setMovement(applyMovement(getMovement()));
    }
  })();
};

loadGame();
