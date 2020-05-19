window.Image.prototype.addEventListener = (
  str: string,
  resolve: (str: string) => void
) => {
  resolve(str);
};

import { loadImage } from "./../image";

describe("The image loader", () => {
  it("should load the image", async () => {
    const imageUrl = "http://imageurl.com/";
    const response = await loadImage(imageUrl);
    expect(response.src).toBe(imageUrl);
  });
});
