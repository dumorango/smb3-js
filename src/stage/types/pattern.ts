import { Size } from ".";

export type SkyPattern = {
  type: PatternType.SKY;
  size: Size;
};

export type GroundPattern = {
  type: PatternType.GROUND;
  length: number;
};

export type PipePattern = {
  type: PatternType.PIPE;
  height: number;
};

export type BrickPattern = {
  type: PatternType.BRICK;
};

export enum PatternType {
  GROUND = "GROUND",
  SKY = "SKY",
  PIPE = "PIPE",
  BRICK = "BRICK",
}

export type Pattern = SkyPattern | GroundPattern | PipePattern | BrickPattern;
