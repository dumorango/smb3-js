import { PlayerState, StageState, PatternState } from "./types/state";
import { Movement } from "../movement/types";
import { getHitBox } from "../collision/hitbox";
import { EnemyState } from ".";
import { SpriteCoordinates, Size } from "../sprite";
import { Trait } from "./types/trait";
import { getColitionHit } from "../collision";
import { getPatternSize } from "./patterns";

export type HitBox = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

export type HitSide = "TOP" | "BOTTOM" | "LEFT" | "RIGHT";

const getEnemyHitBox = (enemy: EnemyState) => {
  return getHitBox(enemy.movement.position, enemy.sprite.coordinates.size);
};

const getPatternHitBox = ({
  pattern,
  movement: { position },
}: PatternState) => {
  const size = getPatternSize(pattern);
  return {
    left: position.x,
    right: position.x + size.width,
    top: position.y,
    bottom: position.y + size.height,
  };
};

function makeHasColided(stage: StageState) {
  return function* makeHasColidedWithStageTiles(playerHitBox: HitBox) {
    for (const patternState of stage.patterns) {
      const patternHitBox = getPatternHitBox(patternState);
      const hitSide = getColitionHit(playerHitBox, patternHitBox);
      if (hitSide) {
        yield {
          hitSide,
          hitBox: patternHitBox,
          patternState
        };
      }
    }
  };
}

const stopOnColideSolid = (
  hitSide: HitSide,
  hitBox: HitBox,
  movement: Movement,
  { height, width }: Size
): Partial<Movement> => {
  let { velocity, position } = movement;
  if (hitSide === "TOP" && velocity.y > 0) {
    velocity.y = 0;
    position.y = hitBox.top - height;
  } else if (hitSide === "BOTTOM" && velocity.y < 0) {
    velocity.y = 0;
    position.y = hitBox.bottom;
  } else if (hitSide === "LEFT" && velocity.x > 0) {
    velocity.x = 0;
    position.x = hitBox.left - width;
  } else if (hitSide === "RIGHT" && velocity.x < 0) {
    velocity.x = 0;
    position.x = hitBox.right;
  }
  return {
    ...movement,
    velocity,
    position,
  };
};

const turnAroundOnCollideHorizontally = (
  hitSide: HitSide,
  hitBox: HitBox,
  movement: Movement,
  { height }: Size
): Movement => {
  let { velocity, position, acceleration } = movement;
  if (hitSide === "TOP" && velocity.y > 0) {
    velocity.y = 0;
    position.y = hitBox.top - height;
  } else if (hitSide === "BOTTOM" && velocity.y < 0) {
    velocity.y = 0;
    position.y = hitBox.bottom;
  } else if (hitSide === "LEFT" && velocity.x > 0) {
    acceleration.x = -acceleration.x;
  } else if (hitSide === "RIGHT" && velocity.x < 0) {
    acceleration.x = -acceleration.x;
  }
  return {
    acceleration,
    velocity,
    position,
  };
};

export const makeApplyCollisionWithStage = (stage: StageState) => (
  movement: Movement,
  spriteHitbox: HitBox,
  traits: Trait[],
  { size }: SpriteCoordinates
): Movement => {
  let newMovement = movement;
  const hasColidedWithStageTiles = makeHasColided(stage);
  for (const {
    patternState,
    hitSide,
    hitBox,
  } of hasColidedWithStageTiles(spriteHitbox)) {
    if (patternState.traits?.includes(Trait.SOLID)) {
      if (traits.includes(Trait.SIDEWAYS_WALKER)) {
        newMovement = turnAroundOnCollideHorizontally(
          hitSide as HitSide,
          hitBox,
          newMovement,
          size
        );
      } else {
        newMovement = {
          ...movement,
          ...stopOnColideSolid(hitSide as HitSide, hitBox, newMovement, size),
        };
      }
    } else if(patternState.traits?.includes(Trait.BREAKABLE)) {
    }
  }
  return newMovement;
};

export const makeApplyCollisionWithEnemy = (enemyState: EnemyState) => (
  spriteHitbox: HitBox,
  playerState: PlayerState): [PlayerState, EnemyState] => {
  const enemyHitbox = getEnemyHitBox(enemyState);
  const colitionHit = getColitionHit(spriteHitbox, enemyHitbox);
  if (
    enemyState.traits.includes(Trait.BOUNCEABLE) &&
    colitionHit === "TOP" &&
    !enemyState.isDead
  ) {
    const newPlayerState = {
      ...playerState,
      movement: bounceUp(playerState.movement),
    };
    return [newPlayerState, killEnemyWhenBounceOnHead(enemyState)];
  } else if ((colitionHit === "LEFT" || colitionHit === "RIGHT") && !enemyState.isDead) {
    return [{ ...playerState, isDead: true }, enemyState];
  } else {
    return [playerState, enemyState];
  }
};

const killEnemyWhenBounceOnHead = (enemy: EnemyState) => {
  return {
    ...enemy,
    isDead: true,
  };
};

const bounceUp = (movement: Movement) => {
  return {
    ...movement,
    velocity: {
      ...movement.velocity,
      y: -4,
    },
  };
};

const breakWhenHitBottom = (
  hitSide: HitSide,
  patternState: PatternState,   
): PatternState => {  
  if(hitSide === "BOTTOM") {
    return {
      ...patternState,
    }
  }
  return patternState;
}
