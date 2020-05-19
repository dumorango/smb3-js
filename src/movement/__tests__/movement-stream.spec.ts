import { InputEvent } from "./../../input";
import { getPlayerMovementStreamByInput } from "../movement-stream";

async function* getStream<T>(inputEvent: T[]) {
  yield* inputEvent;
}

let initialMovement = {
  acceleration: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  position: {
    x: 0,
    y: 0,
  },
};

let movement = initialMovement;

const inputEvents: Array<InputEvent> = [
  {
    input: "RIGHT",
    action: "PRESS",
  },
  {
    input: "RIGHT",
    action: "RELEASE",
  },
  {
    input: "RIGHT",
    action: "RELEASE",
  },
  {
    input: "LEFT",
    action: "PRESS",
  },
  {
    input: "LEFT",
    action: "RELEASE",
  },
  {
    input: "LEFT",
    action: "RELEASE",
  },
  {
    input: "JUMP",
    action: "PRESS",
  },
  {
    input: "JUMP",
    action: "PRESS",
  },
];

describe("The movement stream module", () => {
  beforeEach(() => {
    movement = {...initialMovement};
  });
  describe("get player movement stream by input function", () => {
    it("should return a movement stream with positive acceleration on when press RIGHT", async () => {
    
      const playerMovementStreamByInput = getPlayerMovementStreamByInput(
        getStream([
          {
            input: "RIGHT",
            action: "PRESS",
          },
        ])
      );
      let applyMovement = (await playerMovementStreamByInput.next()).value;      
      expect(applyMovement(movement)).toEqual({
        ...movement,
        acceleration: {
          ...movement.acceleration,
          x: 1,
        },
      });
    });
    it("should return a movement stream with zero acceleration on x when release RIGHT key", async () => {
      const playerMovementStreamByInput = getPlayerMovementStreamByInput(
        getStream([
          {
            input: "RIGHT",
            action: "RELEASE",
          },
        ])
      );
      let applyMovement = (await playerMovementStreamByInput.next()).value;      
      movement.acceleration.x = 1;
      expect(applyMovement(movement)).toEqual({
        ...movement,
        acceleration: {
          ...movement.acceleration,
          x: 0,
        },
      });
    })
    it("should return a movement stream with zero acceleration on x when release RIGHT key", async () => {
      const playerMovementStreamByInput = getPlayerMovementStreamByInput(
        getStream([
          {
            input: "RIGHT",
            action: "RELEASE",
          },
        ])
      );
      let applyMovement = (await playerMovementStreamByInput.next()).value;      
      movement.acceleration.x = -1;
      expect(applyMovement(movement)).toEqual({
        ...movement,
        acceleration: {
          ...movement.acceleration,
          x: -1,
        },
      });
    })
    it("should return a movement stream with negative acceleration on x when press LEFT key", async () => {
      const playerMovementStreamByInput = getPlayerMovementStreamByInput(
        getStream([
          {
            input: "LEFT",
            action: "PRESS",
          },
        ])
      );
      let applyMovement = (await playerMovementStreamByInput.next()).value;      
      expect(applyMovement(movement)).toEqual({
        ...movement,
        acceleration: {
          ...movement.acceleration,
          x: -1,
        },
      });
    });
    it("should return a movement stream with 0 acceleration on x when release LEFT key", async () => {
      const playerMovementStreamByInput = getPlayerMovementStreamByInput(
        getStream([
          {
            input: "LEFT",
            action: "RELEASE",
          },
        ])
      );
      let applyMovement = (await playerMovementStreamByInput.next()).value;      
      expect(applyMovement(movement)).toEqual({
        ...movement,
        acceleration: {
          ...movement.acceleration,
          x: 0,
        },
      });
    });
    it("should return a movement stream keeping positive acceleration on x when release LEFT key", async () => {
      const playerMovementStreamByInput = getPlayerMovementStreamByInput(
        getStream([
          {
            input: "LEFT",
            action: "RELEASE",
          },
        ])
      );
      movement.acceleration.x = 1;
      let applyMovement = (await playerMovementStreamByInput.next()).value;      
      expect(applyMovement(movement)).toEqual({
        ...movement,
        acceleration: {
          ...movement.acceleration,
          x: 1,
        },
      });
    });

    it("should return a movement stream with high negative velocity on Y when press JUMP key and Y velocity is 0", async () => {
      const playerMovementStreamByInput = getPlayerMovementStreamByInput(
        getStream([
          {
            input: "JUMP",
            action: "PRESS",
          },
        ])
      );
      let applyMovement = (await playerMovementStreamByInput.next()).value;      
      expect(applyMovement(movement)).toEqual({
        ...movement,
        velocity: {
          ...movement.velocity,
          y: -4,
        },
      });
    });
    it("should return a movement stream with the same velocity on Y when press JUMP key and Y velocity is NOT 0", async () => {
      const playerMovementStreamByInput = getPlayerMovementStreamByInput(
        getStream([
          {
            input: "JUMP",
            action: "PRESS",
          },
        ])
      );
      const falling = {
        ...movement,
        velocity: {
          ...movement.velocity,
          y: 4,          
        }
      }
      let applyMovement = (await playerMovementStreamByInput.next()).value;      
      expect(applyMovement(falling)).toEqual(falling);
    });
  });
});
