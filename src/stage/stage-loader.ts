import { Stage, TiledLayer } from "./types";
import { loadImage } from "../loaders";

async function loadLayersImage<Tile>(layer: TiledLayer<Tile>) {
  return {
    ...layer,
    img: await loadImage(layer.imageFile),
  };
}

export async function loadStageLayersImage<Tile>(stage: Stage<Tile>) {
  const layers = await Promise.all(stage.layers.map(loadLayersImage));
  return {
    ...stage,
    layers,
  };
}
