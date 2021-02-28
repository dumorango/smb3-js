const INITIAL_POSITION = {
  x: 10,
  y: 10,
};

const screenSizeVeryBottomGround = {
  pattern: {
    type: "GROUND" as const,
    length: 16,
  },
  position: {
    x: 0,
    y: 13,
  },
};

export const goombaKillsMario = {
  layers: [
    {
      patterns: [
        screenSizeVeryBottomGround,
      ],
    },
  ],
  enemies: [
    {
      type: "GOOMBA" as const,
      position: {
        x: 200,
        y: 150,
      },
    },
  ],
  player: {
    position: INITIAL_POSITION,
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
    x: 9,
    y: 11,
  },
};

export const marioKillsGoomba = {
  layers: [
    {
      patterns: [
        screenSizeVeryBottomGround,
        pipePatternSpawnPoint,
        pipePatternSpawnPoint2
      ],
    },
  ],
  enemies: [
    {
      type: "GOOMBA" as const,
      position: {
        x: 130,
        y: 180,
      },
    },
  ],
  player: {
    position: {
      x: 130,
      y: 150
    },
  },
};

export const marioBreaksBlock = {
  layers: [
    {
      patterns: [
        screenSizeVeryBottomGround,
        {
          pattern: { type: "BRICK" as const },
          position: {
            x: 1,
            y: 9,
          },
        }
      ],
    },
  ],
  enemies: [
  ],
  player: {
    position: INITIAL_POSITION,
  },
};
