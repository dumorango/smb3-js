import { goombaKillsMario, marioKillsGoomba } from './test-stage';

const TILE_SIZE = 16;

const MARIO_SPRITE_HEIGHT = 15;

const GOOMBA_SPRITE_HEIGHT = 16;


window.addEventListener = () => {};
window.requestAnimationFrame = () => {
  throw new Error('requestAnimationFrame is not supported in Node');
};


describe("The stage state", () => {
  it("should have mario standing on the ground", () => {
    // let state = getStageState(goombaKillsMario); //?
    
    // Skip ahead 100 frames
    // for(let i=0;i<100;i++) {
        // state = applyEffects(state);        
    // }

    // Mario's Y position should the same as the ground (discouting his height)
    // expect(state.mario.movement.position.y).toEqual(TILE_SIZE * 13 - MARIO_SPRITE_HEIGHT);
  });
  it("should have goombas walking on the ground and kill the player", () => {
    // let state = getStageState(goombaKillsMario); //?
    
    // for(let i=0;i<200;i++) {
    //     state = applyEffects(state);        
    // }

    // const goomba = state.enemies.find(e => e.type === "GOOMBA");
    // // Goomba's Y position should be the same as the ground (discouted their height)
    // expect(goomba?.movement.position.y).toEqual(TILE_SIZE * 13 - GOOMBA_SPRITE_HEIGHT);
    // expect(state.mario.isDead).toBeTruthy();
  });
  it("should have goomba stuck between two pipes and get killed by mario", () => {
    // let state = getStageState(marioKillsGoomba); //?
    
    // for(let i=0;i<500;i++) {
    //     state = applyEffects(state);        
    // }

    // const goomba = state.enemies.find(e => e.type === "GOOMBA");

    // expect(goomba?.isDead).toBeTruthy();
    // expect(goomba?.movement.position.x).toBeGreaterThan(5 * 16);
    // expect(goomba?.movement.position.x).toBeLessThan(9 * 16);
  });
});
