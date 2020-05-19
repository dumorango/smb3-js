import { FrameStream, Frame } from "./types";

export async function* getFrameStream(): FrameStream {
  while (true) {
    yield new Promise<Frame>((resolve) => {
      const previousTime = performance.now();
      requestAnimationFrame((time: number) => {
        const timeBetweenFrames = time - previousTime;
        const fps = 1000 / timeBetweenFrames;
        resolve({ time, fps });
      });
    });
  }
}
