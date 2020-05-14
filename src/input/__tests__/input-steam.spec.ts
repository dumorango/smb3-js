import { getInputStream, Input } from "..";

const keyMap = new Map<Input, string>([["RIGHT", "KeyD"]]);

describe("The input stream module", () => {
  it("should return an input event with action PRESS", async (done) => {
    const inputStream = getInputStream(keyMap);
    inputStream.next().then(({ value }) => {
      expect(value).toEqual({
        input: "RIGHT",
        action: "PRESS",
      });
      done();
    });
    document.dispatchEvent(new KeyboardEvent("keydown", { code: "KeyD" }));
  });
  it("should return an input event with action RELEASE", async (done) => {
    const inputStream = getInputStream(keyMap);
    inputStream.next().then(({ value }) => {
      expect(value).toEqual({
        input: "RIGHT",
        action: "RELEASE",
      });
      done();
    });
    document.dispatchEvent(new KeyboardEvent("keyup", { code: "KeyD" }));
  });
});
