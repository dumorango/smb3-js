import { EnemyType, SpritesImage, Pattern } from ".";
import { Sprite } from "./../../sprite/types";
import { Movement } from "../../movement";
import { Trait } from "./trait";

export type StageState = {  
  mario: PlayerState;
  enemies: EnemyState[];
  patterns: PatternState[];
};

export type EnemyState = {
  type: EnemyType;
  movement: Movement;
  traits: Trait[];
  isDead: boolean;
  sprite: Sprite;
};

export type Enemies = {
  enemies: EnemyState[];
  image: SpritesImage;
};

export type PlayerState = {
  movement: Movement;
  isDead: boolean;
  sprite: Sprite;
};

export type PatternState = {
  movement: Movement;
  pattern: Pattern;  
  traits?: Trait[]  
};
