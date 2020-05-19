
export enum EnemyType {
  GOOMBA = "GOOMBA"
}

export type EnemyPlacement = {
  enemy: EnemyType;
  position: Position;
};
