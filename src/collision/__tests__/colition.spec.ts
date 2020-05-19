import { getColitionHit } from "../index";

describe("the colition module", () => {
  it("function should colide on top", () => {
    const hitBox1 = {
      left: 0,
      right: 10,
      top: 0,
      bottom: 12,
    };
    const hitBox2 = {
      left: 5,
      right: 15,
      top: 10,
      bottom: 20,
    };
    const colitionPosition = getColitionHit(hitBox1, hitBox2); //?

    expect(colitionPosition).toEqual("TOP");
  });
  it("function should colide on bottom", () => {
    const hitBox1 = {
      left: 5,
      right: 15,
      top: 10,
      bottom: 20,
    };
    const hitBox2 = {
      left: 5,
      right: 15,
      top: 0,
      bottom: 10,
    };
    const colitionPosition = getColitionHit(hitBox1, hitBox2); //?

    expect(colitionPosition).toEqual("BOTTOM");
  });
  it("function should colide on left", () => {
    const hitBox1 = {
      left: 0,
      right: 10,
      top: 10,
      bottom: 20,
    };
    const hitBox2 = {
      left: 10,
      right: 15,
      top: 10,
      bottom: 20,
    };
    const colitionPosition = getColitionHit(hitBox1, hitBox2); //?

    expect(colitionPosition).toEqual("LEFT");
  });
  it("function should colide on left", () => {
    const hitBox1 = {
      left: 10,
      right: 20,
      top: 10,
      bottom: 20,
    };
    const hitBox2 = {
      left: 0,
      right: 10,
      top: 10,
      bottom: 20,
    };
    const colitionPosition = getColitionHit(hitBox1, hitBox2); //?

    expect(colitionPosition).toEqual("RIGHT");
  });
  it("function should not colide if not vertical aligned", () => {
    const hitBox1 = {
      left: 10,
      right: 20,
      top: 10,
      bottom: 20,
    };
    const hitBox2 = {
      left: 0,
      right: 10,
      top: 20,
      bottom: 30,
    };
    const colitionPosition = getColitionHit(hitBox1, hitBox2); //?

    expect(colitionPosition).toBeFalsy();
  });
  it("function should not colide if not horizontally aligned", () => {
    const hitBox1 = {
      left: 15,
      right: 20,
      top: 0,
      bottom: 10,
    };
    const hitBox2 = {
      left: 5,
      right: 15,
      top: 10,
      bottom: 20,
    };
    const colitionPosition = getColitionHit(hitBox1, hitBox2); //?

    expect(colitionPosition).toBeFalsy();
  });
});
