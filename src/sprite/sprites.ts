import { SpriteImage } from './types';

export const mario = {
  stalled: {
    image: SpriteImage.MARIO,
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

export const goomba = {
  step1: {
    image: SpriteImage.ENEMIES,
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
