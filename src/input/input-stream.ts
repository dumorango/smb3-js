import { KeyMap, InputEvent, InputEventStream } from "./types";

export async function* getInputStream(keyMap: KeyMap): InputEventStream {
  while (true) {
    yield new Promise<InputEvent>((resolve) => {
      for (const [input, keyCode] of keyMap) {
        document.addEventListener("keydown", (event) => {
          if (event.code === keyCode) {
            resolve({ input, action: "PRESS" });
          }
        });
        document.addEventListener("keyup", (event) => {
          if (event.code === keyCode) {
            resolve({ input, action: "RELEASE" });
          }
        });
      }
    });
  }
}
