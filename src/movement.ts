type AccelerationConfig = {
  maxSpeed: number;
  gravity: number;
  friction: number;
};

type Coordinates = {
  x: number;
  y: number;
};

export type Position = Coordinates;

type Velocity = Coordinates;

type Acceleration = Coordinates;

export type Movement = {
  velocity: Velocity;
  acceleration: Acceleration;
  position: Position;
};

export const applyVelocity = (position: Position, velocity: Velocity) => ({
  y: position.y + velocity.y,
  x: position.x + velocity.x,
});

const makeApplyAccelarationOnX = ({
  maxSpeed,
  friction,
}: AccelerationConfig) => (acceleration: Acceleration, velocity: Velocity) => {
  const accelerationSign = Math.sign(acceleration.x);
  const absAcceleration = acceleration.x !== 0 ? Math.abs(acceleration.x) : 0;
  const absVelocity = velocity.x !== 0 ? Math.abs(velocity.x) : 0;
  const absoluteFriction = friction * absVelocity;
  const absoluteFictionedAcceleration = absAcceleration - absoluteFriction;
  const velocityDelta = Math.min(
    absVelocity + absoluteFictionedAcceleration,
    maxSpeed
  );
  const normalizedVelocityDelta =
    Math.abs(velocityDelta) > 0.1 ? velocityDelta : 0;
  return {
    x: normalizedVelocityDelta * accelerationSign,
    y: velocity.y,
  };
};

const makeApplyAccelarationOnY = ({ gravity }: AccelerationConfig) => (
  acceleration: Acceleration,
  velocity: Velocity
) => {
  const accelerationWithGravity = acceleration.y + gravity;
  const velocityDelta = velocity.y + accelerationWithGravity;
  return {
    x: velocity.x,
    y: velocityDelta,
  };
};

const applyAcceleration = (config: AccelerationConfig, movement: Movement) => {
  const applyAccelerationOnX = makeApplyAccelarationOnX(config);
  const applyAccelerationOnY = makeApplyAccelarationOnY(config);
  const { velocity, acceleration } = movement;
  const newVelocityX = applyAccelerationOnX(acceleration, velocity);
  const newVelocityY = applyAccelerationOnY(acceleration, newVelocityX);
  return newVelocityY;
};

export const applyMovement = (config: AccelerationConfig, movement: Movement) => ({
  acceleration: movement.acceleration,
  velocity: applyAcceleration(config, movement),
  position: applyVelocity(movement.position, movement.velocity),
});
