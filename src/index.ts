/* istanbul ignore file */
import { loadMarioSprite } from "./player";
import { getStageSpritesPlacements, loadStageLayersImage } from "./stage";
import { drawSprite, Position } from "./sprite";
import { getStage } from "./design";

const canvas = document.createElement("canvas");

canvas.width = 640;

canvas.height = 640;

document.body.appendChild(canvas);

const canvasContext = canvas.getContext("2d");

if (!canvasContext) throw Error("Error getting canvas context");

const loadGame = async () => {
  const marioSprite = await loadMarioSprite();

  const drawMario = drawSprite(marioSprite);

  const mainStage = getStage();

  const loadedMainStage = await loadStageLayersImage(mainStage);

  const mainStageSpritePlacements = [
    ...getStageSpritesPlacements(loadedMainStage),
  ];

  const drawMainStage = () => {
    for (const { sprite, position } of [...mainStageSpritePlacements]) {
      drawSprite(sprite)(position)(canvasContext);
    }
  };

  const update = (position: Position) => {
    drawMainStage();
    drawMario(position)(canvasContext);
    requestAnimationFrame(() =>
      update({
        x: position.x + 1,
        y: position.y,
      })
    );
  };

  const initialPosition = {
    x: 20,
    y: 12 * 16,
  };

  update(initialPosition);
};

loadGame();
