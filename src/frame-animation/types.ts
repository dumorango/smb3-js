export type Frame = {
  time: number;
  fps?: number;
};

export type FrameStream = AsyncGenerator<Frame>;
