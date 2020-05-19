type Coordinates = {
  x: number;
  y: number;
};

export type Position = Coordinates;

export type Velocity = Coordinates;

export type Acceleration = Coordinates;

export type Movement = {
  velocity: Velocity;
  acceleration: Acceleration;
  position: Position;
};

export type AccelerationConfig = {
  maxSpeed: number;
  gravity: number;
  friction: number;
};
