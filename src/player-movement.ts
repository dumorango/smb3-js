import { Movement } from "./movement";

export type Input = "RIGHT" | "LEFT" | "JUMP";

export type Action = "PRESS" | "RELEASE";

export type InputEvent = {
  input: Input;
  action: Action;
};

export type KeysMap = {
  left: string;
  right: string;
  jump: string;
};

type KeyCode = string;

export type KeyMap = {
  [key in Input]: KeyCode;
}; 

export type InputEventStream = AsyncGenerator<InputEvent>;


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
  if(movement.velocity.y === 0) {
   return setJumpVelocity(movement);
  } else {
    return movement;
  } 
}

type ApplyMovement = (movement: Movement) => Movement;

async function* getInputStream(keyMap: KeyMap) {
  while (true) {
    yield new Promise<InputEvent>((resolve) => {
      for (const key in keyMap) {
        const input = key as Input;
        document.addEventListener("keydown", (event) => {
          if (event.code === keyMap[input]) {
            resolve({ input, action: "PRESS" });
          }
        });
        document.addEventListener("keyup", (event) => {
          if (event.code === keyMap[input]) {
            resolve({ input, action: "RELEASE" });
          }
        });
      }
    });
  }
}

export async function* getPlayerMovementStreamByInput(  
  keyMap:  Record<Input, KeyCode>
): AsyncGenerator<ApplyMovement> {
  for await (const inputEvent of getInputStream(keyMap)) {
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
