/* istanbul ignore file */
import { loadMarioSprite } from "./player";
import { drawSprite } from "./sprite";

const canvas = document.createElement("canvas");

canvas.width = 640;

canvas.height = 640;

document.body.appendChild(canvas);

const canvasContext = canvas.getContext("2d");

if (!canvasContext) throw Error("Error getting canvas context");

const loadGame = async () => {
  const marioSprite = await loadMarioSprite();
  const drawMario = drawSprite(marioSprite);
  drawMario({
    x: 20,
    y: 12 * 16,
  })(canvasContext);
};

loadGame();
