/* istanbul ignore file */
const canvas = document.createElement("canvas");

canvas.width = 256 * 3;

canvas.height = 240 * 3;

document.body.appendChild(canvas);

const context = canvas.getContext("2d");

if (!context) throw Error("Error getting canvas context");

context.imageSmoothingEnabled = false;

context.filter = "none";

context.scale(3, 3);

export const canvasContext = context;
