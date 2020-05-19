
import {
  EnemySpawnPoint,
  StageState,
  StageDesign,
  PlayerState,
  Position,
  EnemyState,
  TiledLayerDesign,
} from "./types";
import { getPatternState } from './patterns';
import { mario } from "../sprite";
import { makeGoomba } from "./enemies";

const getPlayerInitialState = (
  playerSpawnPointPosition: Position
): PlayerState => {
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

const getEnemyState = (enemySpawnPoint: EnemySpawnPoint): EnemyState => {
  if (enemySpawnPoint.type === "GOOMBA") {
    return makeGoomba(enemySpawnPoint.position);
  } else {
    throw new Error(`Enemy type not found: ${enemySpawnPoint.type}`);
  }
};

function* getPatternsState(layers: TiledLayerDesign[]) {
  for(const layer of layers) {
    for(const patternSpawn of layer.patterns) {
      yield getPatternState(patternSpawn)
    }
  }
}

export const getStageState = (stageDesign: StageDesign): StageState => {
  return {    
    mario: getPlayerInitialState(stageDesign.player.position),
    enemies: stageDesign.enemies.map(getEnemyState),
    patterns: [...getPatternsState(stageDesign.layers)]
  };
};
