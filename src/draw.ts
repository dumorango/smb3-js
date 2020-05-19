/* istanbul ignore file */
import { loadSpritesImages } from "./sprite/images";
import { StageState, EnemyState } from "./stage/types";
import { getPatternStateSpritePlacements } from "./stage";
import { makeDrawSprite } from "./sprite";

export const makeDrawStage = async <T>(
  canvasContext: CanvasRenderingContext2D  
) => {

  const imageMap = await loadSpritesImages();
  const drawSprite = makeDrawSprite(canvasContext, imageMap);

  const drawEnemy = (enemyState: EnemyState) => {
    if (!enemyState.isDead) {
      drawSprite(enemyState.sprite, enemyState.isDead)(enemyState.movement.position);
    }
  };

  const drawStage = (stage: StageState) => {
    for (const { sprite, position } of getPatternStateSpritePlacements(
      stage.patterns
    )) {
      drawSprite(sprite)(position)
    }
  };

  const drawMario = (stage: StageState) => {
    if (!stage.mario.isDead) {
      drawSprite(stage.mario.sprite, true)(stage.mario.movement.position);
    }
  }

  return (stage: StageState) => {
    drawStage(stage);      
    stage.enemies.map(drawEnemy);
    drawMario(stage);
  };
};
