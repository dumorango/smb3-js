import { SpriteImage, StageDesign, StageState } from "./types";
import {
  bounceUp,
  stopOnColideSolid,
  turnAroundOnCollideHorizontally,
} from "./colision";
import { applyMovement } from "./movement";
import { drawSprite } from "./canvas";
import { getPlayerMovementStreamByInput } from "./player-movement";
import { getStageState } from "./stage-loader";
import {
  getPatternSize,
  getPatternTiles,
  getTilesSpricePlacements as getTilesSpritePlacements,
} from "./tiled-sprites";
import { loadSpritesImages } from "./images";
import { getFrameStream } from "./frame-stream";
import { goombaKillsMario, marioKillsGoomba } from "./__tests__/test-stage";

// Collisiond
type HitBox = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

const HIT_MARGIN = 5;

function getColitionHit(hitBox1: HitBox, hitBox2: HitBox) {
  const areVerticalAligned =
    hitBox1.right >= hitBox2.left + HIT_MARGIN &&
    hitBox1.left <= hitBox2.right - HIT_MARGIN;
  const areHorizontalAligned =
    hitBox1.bottom >= hitBox2.top + HIT_MARGIN &&
    hitBox1.top <= hitBox2.bottom - HIT_MARGIN;
  const hitTop = Math.abs(hitBox1.bottom - hitBox2.top) < HIT_MARGIN;
  const hitBottom = Math.abs(hitBox1.top - hitBox2.bottom) < HIT_MARGIN;
  const hitRight = Math.abs(hitBox1.left - hitBox2.right) < HIT_MARGIN;
  const hitLeft = Math.abs(hitBox1.right - hitBox2.left) < HIT_MARGIN;
  if (areVerticalAligned) {
    if (hitTop) return "TOP";
    else if (hitBottom) return "BOTTOM";
  } else if (areHorizontalAligned) {
    if (hitRight) return "RIGHT";
    else if (hitLeft) return "LEFT";
  }
}

type Position = {
  x: number;
  y: number;
};

type Size = {
  height: number;
  width: number;
};

const getHitBox = ({ x, y }: Position, { width, height }: Size): HitBox => {
  return {
    left: x,
    right: x + width,
    top: y,
    bottom: y + height,
  };
};

const accelerationConfig = {
  gravity: 0.1,
  maxSpeed: 2,
  friction: 0.15,
};

const keyMap = {
  ["RIGHT"]: "KeyD",
  ["LEFT"]: "KeyA",
  ["JUMP"]: "KeyJ",
};

type Stage = ReturnType<typeof getStageState>;

export const runFrame = (stage: Stage) => {
  // Apply movement to player and enemies
  stage.mario.movement = applyMovement(
    accelerationConfig,
    stage.mario.movement
  );
  for (const enemy of stage.enemies) {
    enemy.movement = applyMovement(accelerationConfig, enemy.movement);
  }
  //Apply collitions
  const playerHitBox = getHitBox(
    stage.mario.movement.position,
    stage.mario.sprite.coordinates.size
  );

  for (const patternState of stage.patterns) {
    const patternHitBox = getHitBox(
      patternState.movement.position,
      getPatternSize(patternState.pattern)
    );
     // Apply colition between player and patterns
     const patternHitSide = getColitionHit(playerHitBox, patternHitBox);
     if (
       patternHitSide &&
       patternHitSide === "BOTTOM" &&
       patternState.traits?.includes("BREAKABLE") &&
       !patternState.traits?.includes("BROKEN") &&
       stage.mario.movement.velocity.y < 0
     ) {
       patternState.traits?.push("BROKEN");
       stage.mario.movement = stopOnColideSolid(
         patternHitSide,
         patternHitBox,
         stage.mario.movement,
         stage.mario.sprite.coordinates.size
       );
     }
     if (
       patternHitSide &&
       patternState.traits?.includes("SOLID") &&
       !patternState.traits.includes("BROKEN")
     ) {
       stage.mario.movement = stopOnColideSolid(
         patternHitSide,
         patternHitBox,
         stage.mario.movement,
         stage.mario.sprite.coordinates.size
       );
     }
    for (let enemyState of stage.enemies) {
      const enemyHitbox = getHitBox(
        enemyState.movement.position,
        enemyState.sprite.coordinates.size
      );     
      // Apply colition between enemy and patterns
      const enemyHitSide = getColitionHit(enemyHitbox, patternHitBox);
      if (enemyHitSide && enemyState.traits.includes("SIDEWAYS_WALKER")) {
        enemyState.movement = turnAroundOnCollideHorizontally(
          enemyHitSide,
          patternHitBox,
          enemyState.movement,
          enemyState.sprite.coordinates.size
        );
      } else if (enemyHitSide && patternState.traits?.includes("SOLID")) {
        enemyState.movement = stopOnColideSolid(
          enemyHitSide,
          patternHitBox,
          enemyState.movement,
          enemyState.sprite.coordinates.size
        );
      }
      // Apply colision between player and enemy
      const playerOnEnemyHitSide = getColitionHit(playerHitBox, enemyHitbox);
      if (
        playerOnEnemyHitSide === "TOP" &&
        enemyState.traits.includes("BOUNCEABLE") &&
        !enemyState.isDead
      ) {
        stage.mario = {
          ...stage.mario,
          movement: bounceUp(stage.mario.movement),
        };
        enemyState.isDead = true;
      }
      const enemyOnPlayerHitSide = getColitionHit(playerHitBox, enemyHitbox);
      if (
        !enemyState.isDead &&
        enemyOnPlayerHitSide &&
        enemyOnPlayerHitSide !== "TOP"
      ) {
        stage.mario.isDead = true;
      }
    }
  }
  return stage;
};

export const loadGame = async (stage: Stage) => {  
  const spriteImages = await loadSpritesImages();
  (async () => {
    while (!(await getFrameStream().next()).done) {      
      runFrame(stage);
      // Draw state, enemies and player
      // Draw state patterns
      for (const patternState of stage.patterns) {
        if (!patternState.traits?.includes("BROKEN")) {
          const tiles = getPatternTiles(patternState.pattern);
          const tilesPlacements = getTilesSpritePlacements(
            tiles,
            patternState.movement.position
          );
          for (const { sprite, position } of tilesPlacements) {
            drawSprite(sprite, position, spriteImages[sprite.image]);
          }
        }
      }
      // Draw enemies
      stage.enemies.map((enemyState) => {
        if (!enemyState.isDead) {
          drawSprite(
            enemyState.sprite,
            enemyState.movement.position,
            spriteImages[enemyState.sprite.image]
          );
        }
      });
      // Draw player
      if (!stage.mario.isDead) {
        drawSprite(
          stage.mario.sprite,
          stage.mario.movement.position,
          spriteImages[stage.mario.sprite.image]
        );
      }
    }
  })();
  (async () => {
    for await (const applyMovement of getPlayerMovementStreamByInput(keyMap)) {
      stage.mario.movement = applyMovement(stage.mario.movement);
    }
  })();
};
