import { Pattern } from './../types';
import { EnemyType } from "./enemy";
import { Position } from "./common";

export type StageDesign = {
  layers: TiledLayerDesign[];
  enemies: EnemySpawnPoint[];
  player: PlayerSpawnPoint;
};

export type TiledLayerDesign = {
  patterns: PatternSpawnPoint[];
};

export type PatternSpawnPoint = {
  pattern: Pattern,
  position: Position,
}

export type EnemySpawnPoint = {
  type: EnemyType;
  position: Position;
};

export type PlayerSpawnPoint = {  
  position: Position;
};
