import {
    GroundPattern,
  } from "./types";
  
  const initialPosition = {
    x: 200,
    y: 12 * 16,
  };
  
  const initialPosition2 = {
    x: 230,
    y: 12 * 16,
  };
  
  const getEnemies = () => {
    const goomba = {
      type: "GOOMBA" as const,
      position: initialPosition,
    };
    const goomba2 = {
      type: "GOOMBA" as const,
      position: initialPosition2,
    };
    return [goomba, goomba2];
  };
  
  const getBackgroundLayer = () => {
    const sky = {
      type: "SKY" as const,
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
      type: "GROUND" as const,
      length: 16,
    };
    const groundSpawnPoint = {
      pattern: ground,
      position: {
        x: 0,
        y: 13,
      },
    };
    const pipe = {
      type: "PIPE" as const,
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
    const brick = {
      type: "BRICK" as const,
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
  
  const INITIAL_POSITION = {
    x: 20,
    y: 12 * 10 + 1,
  };
  
  export const getStage = () => ({
    layers: [getBackgroundLayer()],
    enemies: getEnemies(),
    player: {
      position: INITIAL_POSITION,
    },
  });
  