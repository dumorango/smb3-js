import { EnemyType, PatternType, Pattern } from '../types';
import { getStageState } from "../stage-loader";

const position = { x: 0, y: 0 };
const velocity = { x: 0, y: 0 };
const acceleration = { x: 0, y: 0 };
const movement = {
  position,
  velocity,
  acceleration
}
const layers = [{
  patterns: [{
    pattern: {
      type: PatternType.BRICK
    } as Pattern,
    position        
  }]      
}];    
const stage = {
  layers,
  enemies: [{
    type: EnemyType.GOOMBA,
    position
  }],
  player: {
    position
  }
};    

describe("The stage loader module", () => {
  it("should load the stage state from a stage design", async () => {    
    const response = await getStageState(stage); //?
    expect(response).toMatchSnapshot();
  });
  it("should throw and error when an enemy is not defined", async () => {
    stage.enemies.push({
      type: "UNKNOWN_EMEMY" as EnemyType,
      position
    })
    try {
      await getStageState(stage);
    } catch (e) {
      expect(e.message).toContain("Enemy type not found")
    }
  });
});
