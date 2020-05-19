import { makeApplyMovement } from "../movement";

describe("the make apply movement function", () => {
    const stopped = {
      position: {
        x: 0,
        y: 0,
      },
      velocity: {
        x: 0,
        y: 0,
      },
      acceleration: {
        x: 0,
        y: 0,
      },
    };
    it("should speed up until max velocity", () => {
      const accelerationConfig = {
        gravity: 0.0,
        maxSpeed: 2,
        friction: 0.15,
      };
      const acceleratingForward = {
        ...stopped,
        acceleration: {
          x: 1,
          y: 0,
        },
      };
      const applyMovement = makeApplyMovement(accelerationConfig);
      let newMovement = applyMovement(acceleratingForward);
      for (let i = 0; i < 1000; i++) {
        newMovement = applyMovement(newMovement);
      }
      expect(newMovement.velocity.x).toEqual(accelerationConfig.maxSpeed);
    });
    it("should stop by friction", () => {
      const accelerationConfig = {
        gravity: 0.0,
        maxSpeed: 2,
        friction: 0.15,
      };
      const movingForward = {
        ...stopped,
        velocity: {
          ...stopped.velocity,
          x: 1,
        },
      };
      const applyMovement = makeApplyMovement(accelerationConfig);
      let newMovement = applyMovement(movingForward);
      for (let i = 0; i < 100; i++) {
        newMovement = applyMovement(newMovement);
      }
      expect(newMovement.velocity.x).toBe(0);
    });
    it("should jump and then fall with gravity", () => {
      const accelerationConfig = {
        gravity: 0.0,
        maxSpeed: 2,
        friction: 0.15,
      };
      const movingForward = {
        ...stopped,
        velocity: {
          ...stopped.velocity,
          y: -4,
        },
      };
      let jumpHigh = 0;
      const applyMovement = makeApplyMovement(accelerationConfig);
      let newMovement = applyMovement(movingForward);
      for (let i = 0; i < 100; i++) {
        newMovement = applyMovement(newMovement);
        jumpHigh = Math.min(jumpHigh, newMovement.position.y);
      }
      expect(jumpHigh).toBe(-404);
      expect(newMovement.velocity.y).toBeLessThan(0);
    });
  });