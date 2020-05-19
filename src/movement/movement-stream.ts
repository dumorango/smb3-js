import { InputEventStream } from "./../input/types";
import { Movement } from "./types";

const setAccelerationX = (accX: number) => (movement: Movement) => ({
  ...movement,
  acceleration: {
    ...movement.acceleration,
    x: accX,
  },
});

const breakRight = (movement: Movement) => {
  if(movement.acceleration.x > 0 ){
    return setAccelerationX(0)(movement)
  } else {
    return movement;
  }
}

const breakLeft = (movement: Movement) => {
  if(movement.acceleration.x < 0 ){
    return setAccelerationX(0)(movement)
  } else {
    return movement;
  }
}
const setVelocityY = (velocityY: number) => (movement: Movement) => ({
  ...movement,
  velocity: {
    ...movement.velocity,
    y: velocityY,
  },
});

const setJumpVelocity = setVelocityY(-4);

const setJumpVelocityIfStopped = (movement: Movement) => {
  if(movement.velocity.y === 0) { //?
   return setJumpVelocity(movement);
  } else {
    return movement;
  } 
}

type ApplyMovement = (movement: Movement) => Movement;

export async function* getPlayerMovementStreamByInput(  
  inputEventStream: InputEventStream
): AsyncGenerator<ApplyMovement> {
  for await (const inputEvent of inputEventStream) {
    switch (inputEvent.input) {
      case "RIGHT":
        switch (inputEvent.action) {
          case "PRESS":
            yield setAccelerationX(1);
            break;
          case "RELEASE":
            yield breakRight;
            break;
        }
        break;
      case "LEFT":
        switch (inputEvent.action) {
          case "PRESS":
            yield setAccelerationX(-1);
            break;
          case "RELEASE":
            yield breakLeft;
            break;
        }
        break;
      case "JUMP":
        yield setJumpVelocityIfStopped;
        break; 
    }
  }
}
