import { HitBox } from '../stage/colision';
import { Size, Position } from '../sprite';

export const getHitBox = ({ x, y }: Position, { width, height }: Size): HitBox => {
    return {
        left: x,
        right:x + width,
        top: y,
        bottom: y + height,
    }
}