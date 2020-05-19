import { Acceleration, Velocity, Position, AccelerationConfig, Movement } from "./types";

const applyVelocity = (
    position: Position,
    velocity: Velocity  
  ) => ({
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
  
  const makeApplyAcceleration = (config: AccelerationConfig) => (
    movement: Movement
  ) => {
    const applyAccelerationOnX = makeApplyAccelarationOnX(config);
    const applyAccelerationOnY = makeApplyAccelarationOnY(config);
    const { velocity, acceleration } = movement;
    const newVelocityX = applyAccelerationOnX(acceleration, velocity);
    const newVelocityY = applyAccelerationOnY(acceleration, newVelocityX);
    return newVelocityY;
  };
  
  
  
  export const makeApplyMovement = (
    physicsConfig: AccelerationConfig  
  ) => {
    const applyAcceleration = makeApplyAcceleration(physicsConfig);
    return (movement: Movement) => ({
      acceleration: movement.acceleration,
      velocity: applyAcceleration(movement),
      position: applyVelocity(movement.position, movement.velocity),
    });
  };
  