/* istanbul ignore file */
import { EnemyType } from './../stage';

export const initialPosition = {
  x: 200,
  y: 12 * 16,
};

export const initialPosition2= {
  x: 230,
  y: 12 * 16,
};

export const getEnemies = () => {
  const goomba = {
    type: EnemyType.GOOMBA,
    position: initialPosition
  };
  const goomba2 = {
    type: EnemyType.GOOMBA,
    position: initialPosition2
  };
  return [goomba, goomba2];
};
