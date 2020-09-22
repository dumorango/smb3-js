import { SpriteImage, StageState } from "./types";
import {
  bounceUp,
  stopOnColideSolid,
  turnAroundOnCollideHorizontally,
} from "./colision";
import { getStage } from "./design";
import { applyMovement } from "./movement";
import { makeDrawSprite } from "./canvas";
import EnemiesSpriteSheet from "./img/enemies-2.png";
import BackgroundImage from "./img/smb3_background_tiles.png";
import MarioSpriteSheet from "./img/smb3_mario_sprites.png";
import { getPlayerMovementStreamByInput } from "./player-movement";
import { getStageState } from "./stage-loader";
import {
  getPatternSize,  
  getPatternTiles,
  getTilesSpricePlacements,
} from "./tiled-sprites";

// Collisiond
type HitBox = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

const HIT_MARGIN = 5;

export function getColitionHit(hitBox1: HitBox, hitBox2: HitBox) {
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

// Frame iteration
async function* getFrameStream() {
  while (true) {
    yield new Promise<{
      time: number;
      fps?: number;
    }>((resolve) => {
      const previousTime = performance.now();
      requestAnimationFrame((time: number) => {
        const timeBetweenFrames = time - previousTime;
        const fps = 1000 / timeBetweenFrames;
        resolve({ time, fps });
      });
    });
  }
}

// Image loading
const loadSpritesImages = async () => {
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
  return new Map<SpriteImage, HTMLImageElement>([
    ["MARIO", marioSpriteSheet],
    ["BACKGROUND", backgroundSpriteSheet],
    ["ENEMIES", enemiesSpriteSheet],
  ]);
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

let stage: StageState;

const loadGame = async () => {
  stage = getStageState(getStage());
  const drawSprite = makeDrawSprite(await loadSpritesImages());

  (async () => {
    while (!(await getFrameStream().next()).done) {
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
        for (let enemyState of stage.enemies) {
          const enemyHitbox = getHitBox(
            enemyState.movement.position,
            enemyState.sprite.coordinates.size
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
          if (patternHitSide && patternState.traits?.includes("SOLID") && !patternState.traits.includes("BROKEN")) {
            stage.mario.movement = stopOnColideSolid(
              patternHitSide,
              patternHitBox,
              stage.mario.movement,
              stage.mario.sprite.coordinates.size
            );
          }
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
          const playerOnEnemyHitSide = getColitionHit(
            playerHitBox,
            enemyHitbox
          );
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
          const enemyOnPlayerHitSide = getColitionHit(
            playerHitBox,
            enemyHitbox
          );
          if (
            !enemyState.isDead &&
            enemyOnPlayerHitSide &&
            enemyOnPlayerHitSide !== "TOP"
          ) {
            stage.mario.isDead = true;
          }
        }
      }

      // Draw state, enemies and player
      // Draw state patterns
      for (const patternState of stage.patterns) {
        if (!patternState.traits?.includes("BROKEN")) {
          const tiles = getPatternTiles(patternState.pattern);
          const tilesPlacements = getTilesSpricePlacements(
            tiles,
            patternState.movement.position
          );
          for (const { sprite, position } of tilesPlacements) {
            drawSprite(sprite)(position);
          }
        }
      }
      // Draw enemies
      stage.enemies.map((enemyState) => {
        if (!enemyState.isDead) {
          drawSprite(enemyState.sprite, true)(enemyState.movement.position);
        }
      });
      // Draw player
      if (!stage.mario.isDead) {
        drawSprite(stage.mario.sprite, true)(stage.mario.movement.position);
      }
    }
  })();
  (async () => {
    for await (const applyMovement of getPlayerMovementStreamByInput(keyMap)) {
      stage.mario.movement = applyMovement(stage.mario.movement);
    }
  })();
};

loadGame();
