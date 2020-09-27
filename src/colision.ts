import { Movement } from "./movement";

type HitBox = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

type HitSide = "TOP" | "BOTTOM" | "LEFT" | "RIGHT";

type Size = {
  height: number;
  width: number;
};

export const stopOnColideSolid = (
  hitSide: HitSide,
  hitBox: HitBox,
  movement: Movement,
  {
    height,
    width,
  }: Size
): Movement => {
  let { velocity, position } = movement;
  if (hitSide === "TOP" && velocity.y > 0) {
    velocity.y = 0;
    position.y = hitBox.top - height;
  } else if (hitSide === "BOTTOM" && velocity.y < 0) {
    velocity.y = 0;
    position.y = hitBox.bottom;
  } else if (hitSide === "LEFT" && velocity.x > 0) {
    velocity.x = 0;
    position.x = hitBox.left - width;
  } else if (hitSide === "RIGHT" && velocity.x < 0) {
    velocity.x = 0;
    position.x = hitBox.right;
  }
  return {
    ...movement,
    velocity,
    position,
  };
};

export const turnAroundOnCollideHorizontally = (
  hitSide: HitSide,
  hitBox: HitBox,
  movement: Movement,
  { height }: Size
): Movement => {
  let { velocity, position, acceleration } = movement;
  if (hitSide === "TOP" && velocity.y > 0) {
    velocity.y = 0;
    position.y = hitBox.top - height;
  } else if (hitSide === "BOTTOM" && velocity.y < 0) {
    velocity.y = 0;
    position.y = hitBox.bottom;
  } else if (hitSide === "LEFT" && velocity.x > 0) {
    acceleration.x = -acceleration.x;
  } else if (hitSide === "RIGHT" && velocity.x < 0) {
    acceleration.x = -acceleration.x;
  }
  return {
    acceleration,
    velocity,
    position,
  };
};

export const bounceUp = (movement: Movement) => {
  return {
    ...movement,
    velocity: {
      ...movement.velocity,
      y: -4,
    },
  };
};
