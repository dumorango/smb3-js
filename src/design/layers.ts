/* istanbul ignore file */

import { TiledLayerDesign } from "./../stage/";
import {
  PatternType,
  GroundPattern,
  PipePattern,
  SkyPattern,
  BrickPattern,
} from "./../stage/types";

export const getBackgroundLayer = (): TiledLayerDesign => {
  const sky: SkyPattern = {
    type: PatternType.SKY,
    size: { width: 16, height: 15 },
  };
  const skySpawnPoint = {
    pattern: sky,
    position: {
      x: 0,
      y: 0,
    },
  };
  const ground: GroundPattern = {
    type: PatternType.GROUND,
    length: 16,
  };
  const groundSpawnPoint = {
    pattern: ground,
    position: {
      x: 0,
      y: 13,
    },
  };
  const pipe: PipePattern = {
    type: PatternType.PIPE,
    height: 2,
  };
  const pipePatternSpawnPoint = {
    pattern: pipe,
    position: {
      x: 5,
      y: 11,
    },
  };
  const pipePatternSpawnPoint2 = {
    pattern: pipe,
    position: {
      x: 15,
      y: 11,
    },
  };
  const brick: BrickPattern = {
    type: PatternType.BRICK,
  };
  const brickSpawn = {
    pattern: brick,
    position: {
      x: 4,
      y: 9,
    },
  };
  return {
    patterns: [
      skySpawnPoint,
      groundSpawnPoint,
      pipePatternSpawnPoint,
      pipePatternSpawnPoint2,
      brickSpawn,
    ],
  };
};
