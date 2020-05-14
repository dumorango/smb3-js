import { getFrameStream } from "..";

window.requestAnimationFrame = (callback: FrameRequestCallback) => {
  callback(20);
  return 20;
};

window.performance.now = () => 10;

describe("The animation frame module", () => {
  it("should call request animation frame", async () => {
    for await (const frame of getFrameStream()) {
      expect(frame.time).toEqual(20);
      break;
    }
  });
});
