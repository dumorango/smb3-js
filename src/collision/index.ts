import { HitBox } from "./types";

const HIT_MARGIN = 5;

export function getColitionHit(hitBox1: HitBox, hitBox2: HitBox) {
    const areVerticalAligned =
      hitBox1.right >= hitBox2.left + HIT_MARGIN &&
      hitBox1.left <= hitBox2.right - HIT_MARGIN; //?
    const areHorizontalAligned =
      hitBox1.bottom >= hitBox2.top + HIT_MARGIN &&
      hitBox1.top <= hitBox2.bottom - HIT_MARGIN;
    const hitTop = Math.abs(hitBox1.bottom - hitBox2.top) < HIT_MARGIN;
    const hitBottom = Math.abs(hitBox1.top - hitBox2.bottom) < HIT_MARGIN;
    const hitRight = Math.abs(hitBox1.left - hitBox2.right) < HIT_MARGIN;
    const hitLeft = Math.abs(hitBox1.right - hitBox2.left) < HIT_MARGIN;
    if (areVerticalAligned) {
      if (hitTop) return "TOP";
      else if (hitBottom) return "BOTTOM";
    } else if (areHorizontalAligned) {
      if (hitRight) return "RIGHT";
      else if (hitLeft) return "LEFT";
    }
  }