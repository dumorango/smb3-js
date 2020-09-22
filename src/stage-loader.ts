import {
  EnemySpawnPoint,
  StageDesign,
  Position,
  TiledLayerDesign,
  PatternType,
  PatternSpawnPoint} from "./types";
import { TILE_SIZE } from "./tiled-sprites";

const goomba = {
  step1: {
    image: "ENEMIES" as const,
    coordinates: {
      position: {
        x: 2,
        y: 155,
      },
      size: {
        height: 16,
        width: 16,
      },
    },
  },
};

export const makeGoomba = (initialPosition: Position) => {
  return {
    type: "GOOMBA" as const,
    traits: ["SIDEWAYS_WALKER" as const, "BOUNCEABLE" as const],
    movement: {
      position: initialPosition,
      velocity: {
        x: 0,
        y: 0
      },
      acceleration: {
        x: -0.15,
        y: 0
      }
    },
    isDead: false,
    sprite: goomba.step1,
  };  
}

const getPatternTraits = (patternType: PatternType) => {
  switch (patternType) {
    case "GROUND":
    case "PIPE":
      return ["SOLID" as const];
    case "BRICK":
      return ["SOLID" as const, "BREAKABLE" as const];
  }
};

export const getPatternState = ({
  pattern,
  position,
}: PatternSpawnPoint) => {
  return {
    pattern,
    movement: {
      position: {
        x: position.x * TILE_SIZE,
        y: position.y * TILE_SIZE
      },
      velocity: { x: 0, y: 0 },
      acceleration: { x: 0, y: 0 },
    },
    traits: getPatternTraits(pattern.type),    
  };
};

const mario = {
  stalled: {
    image: "MARIO" as const,
    coordinates: {
      position: {
        x: 216,
        y: 89,
      },
      size: {
        height: 15,
        width: 14,
      },
    },
  },
};

const getPlayerInitialState = (
  playerSpawnPointPosition: Position
) => {
  return {
    movement: {
      position: playerSpawnPointPosition,
      velocity: { x: 0, y: 0 },
      acceleration: { x: 0, y: 0 },
    },
    sprite: mario.stalled,
    isDead: false,
  };
};

const getEnemyState = (enemySpawnPoint: EnemySpawnPoint) => {
  if (enemySpawnPoint.type === "GOOMBA") {
    return makeGoomba(enemySpawnPoint.position);
  } else {
    throw new Error(`Enemy type not found: ${enemySpawnPoint.type}`);
  }
};

function* getPatternsState(layers: TiledLayerDesign[]) {
  for (const layer of layers) {
    for (const patternSpawn of layer.patterns) {
      yield getPatternState(patternSpawn);
    }
  }
}

export const getStageState = (stageDesign: StageDesign) => {
  return {
    mario: getPlayerInitialState(stageDesign.player.position),
    enemies: stageDesign.enemies.map(getEnemyState),
    patterns: [...getPatternsState(stageDesign.layers)],
  };
};
