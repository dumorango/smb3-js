import { Movement } from "./movement";

export type SpriteImage = "MARIO" | "BACKGROUND" | "ENEMIES";

export type SpriteCoordinates = {
  position: Position;
  size: Size;
};

export type Sprite = {
  image: SpriteImage;
  coordinates: SpriteCoordinates;
};

export type Position = {
  x: number;
  y: number;
};

export type Size = {
  height: number;
  width: number;
};

export type SpritesImage = string;

export type SpritePlacement = {
  sprite: Sprite;
  position: Position;
};

export type EnemyType = "GOOMBA";

export type EnemyPlacement = {
  enemy: EnemyType;
  position: Position;
};

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

export type SkyPattern = {
  type: "SKY";
  size: Size;
};

export type GroundPattern = {
  type: "GROUND";
  length: number;
};

export type PipePattern = {
  type: "PIPE";
  height: number;
};

export type BrickPattern = {
  type: "BRICK";
};

export type Pattern = SkyPattern | GroundPattern | PipePattern | BrickPattern;

export type PatternType = Pattern["type"] ;

export type Trait = "SOLID" | "SIDEWAYS_WALKER" | "BOUNCEABLE" | "BREAKABLE" | "BROKEN";

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
  traits?: Trait[];
};
