export type Input = "RIGHT" | "LEFT" | "JUMP";

export type Action = "PRESS" | "RELEASE";

export type InputEvent = {
  input: Input;
  action: Action;
};

export type KeysMap = {
  left: string;
  right: string;
  jump: string;
};

type KeyCode = string;

export type KeyMap = Map<Input, KeyCode>;

export type InputEventStream = AsyncGenerator<InputEvent>;
