export async function* getFrameStream() {
    while (true) {
      yield new Promise<{
        time: number;
        fps?: number;
      }>((resolve) => {
        const previousTime = performance.now();
        requestAnimationFrame((time: number) => {
          const timeBetweenFrames = time - previousTime;
          const fps = 1000 / timeBetweenFrames;
          resolve({ time, fps });
        });
      });
    }
  }