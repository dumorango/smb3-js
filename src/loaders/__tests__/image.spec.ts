const fakeEventListener = jest.fn();
window.Image.prototype.addEventListener = fakeEventListener;

import { loadImage } from "./../image";

describe("The image loader", () => {
  it("should load the image", async () => {
    const imageUrl = "imageurl";
    loadImage(imageUrl);
    expect(fakeEventListener).toHaveBeenCalled();
  });
});
