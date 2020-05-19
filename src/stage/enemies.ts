import { EnemyType, EnemyState } from './types';
import { Position } from './../movement/types';
import { SpriteCoordinates } from '../sprite/types';
import { Trait } from './types/trait';
import { goomba } from '../sprite';

export const enemySpriteMap = new Map<EnemyType, SpriteCoordinates>([
  [EnemyType.GOOMBA, goomba.step1.coordinates]
]);

export const getSprite = (enemy: EnemyType) => {
  const enemySprite =  enemySpriteMap.get(enemy);
  if(!enemySprite) throw new Error(`Enemy not mapped ${enemy}`);
  return enemySprite;
}

export const makeGoomba = (initialPosition: Position): EnemyState => {
  return {
    type: EnemyType.GOOMBA,
    traits: [Trait.SIDEWAYS_WALKER, Trait.BOUNCEABLE],
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
