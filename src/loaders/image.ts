export const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.addEventListener("load", () => resolve(img));
  });
};
