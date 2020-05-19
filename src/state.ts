import { StageState, PlayerState } from './stage/types/state';
import { EnemyState } from './stage/types';
import { Movement } from "./movement";
 
let state: StageState;

export const getMovement = () => state.mario.movement;

export const setMovement = (movement: Partial<Movement>) => {
  if (movement.position) {
    state.mario.movement.position = movement.position;
  }
  if (movement.velocity) {
    state.mario.movement.velocity = movement.velocity;
  }
  if (movement.acceleration) {
    state.mario.movement.acceleration = movement.acceleration;
  }
};

export const setEnemies = (enemies: EnemyState[]) => {
  state.enemies = enemies;
}

export const setPlayer = (playerState: PlayerState) => {
  state.mario = playerState;
}

export const accelerationConfig = {
  gravity: 0.1,
  maxSpeed: 2,
  friction: 0.15,
};

export const getState = () => state;

export const setState = (newState: StageState) => state = newState;