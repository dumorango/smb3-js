import { runFrame } from "../game";
import { getStageState } from "../stage-loader";
import {
  goombaKillsMario,
  marioBreaksBlock,
  marioKillsGoomba,
} from "./test-stage";

jest.mock("../canvas", () => ({
  drawSprite: jest.fn(),
}));
jest.mock("../images", () => ({
  loadSpritesImages: jest.fn(),
}));

test("mario should fall, be standing on the ground and then die", () => {
  const stage = getStageState(goombaKillsMario);
  // Fall
  for (const _ of Array(80)) {
    runFrame(stage);
  }
  expect(stage.mario.movement.position.y).toBeCloseTo(193);
  // Stand
  for (const _ of Array(50)) {
    runFrame(stage);
  }
  expect(stage.mario.movement.position.y).toBeCloseTo(193);
  expect(stage.mario.isDead).toBeFalsy();
  // Die
  for (const _ of Array(50)) {
    runFrame(stage);
  }
  expect(stage.mario.isDead).toBeTruthy();
  expect(stage.enemies.find((e) => e.type === "GOOMBA")?.isDead).toBeFalsy();
});
test("should have goombas stuck between two pipes and get killed by mario", () => {
  const stage = getStageState(marioKillsGoomba);
  // Kill goomba
  for (const _ of Array(100)) {
    runFrame(stage);
  }
  expect(stage.enemies.find((e) => e.type === "GOOMBA")?.isDead).toBeTruthy();
});
test("should jump and kill goomba", () => {
  const stage = getStageState(marioKillsGoomba);
  // stage.mario.movement.acceleration.y = 1;
  // Kill goomba
  for (const _ of Array(10)) {
    runFrame(stage);
  }
  stage.mario.movement.acceleration.y = 1;
  for (const _ of Array(10)) {
    runFrame(stage);
  }
  expect(stage.mario.isDead).toBeFalsy();
  expect(stage.enemies.find((e) => e.type === "GOOMBA")?.isDead).toBeTruthy();
});
test("should fall on top of the brick and break it", () => {
  const stage = getStageState(marioBreaksBlock);
  for (const _ of Array(50)) {
    runFrame(stage);
  }
  // Mario to be on top of the block
  expect(stage.mario.movement.position.y).toBe(129);
  // Move left
  stage.mario.movement.acceleration.x = -1;
  for (const _ of Array(5)) {
    runFrame(stage);
  }
  // Fall
  stage.mario.movement.acceleration.x = 0;
  for (const _ of Array(50)) {
    runFrame(stage);
  }
  // Expect to be on the ground
  expect(stage.mario.movement.position.y).toBe(193);
  for (const _ of Array(10)) {
    runFrame(stage);
  }
  // Move right
  stage.mario.movement.acceleration.x = 1;
  for (const _ of Array(5)) {
    runFrame(stage);
  }
  // Jump
  stage.mario.movement.acceleration.y = -1;
  for (const _ of Array(10)) {
    runFrame(stage);
  }
  // Expect brick to be broken
  expect(stage.patterns.find(pattern => pattern.pattern.type === "BRICK")?.traits.includes("BROKEN")).toBeTruthy();
});
