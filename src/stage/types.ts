import { Sprite } from "./../sprite";

export type Position = {
  x: number;
  y: number;
};

export type Stage<Tile> = {
  layers: TiledLayer<Tile>[];
};

export type TiledLayer<Tile> = {
  imageFile: string;
  tileMap: Map<Tile, Position>;
  layout: TiledLayout<Tile>;
};

export type LoadedStage<Tile> = {
  layers: LoadedTiledLayer<Tile>[];
};

export type LoadedTiledLayer<Tile> = {
  img: HTMLImageElement;
  tileMap: Map<Tile, Position>;
  layout: TiledLayout<Tile>;
};

export type TiledLayout<Tile> = {
  patterns: TiledPatternPlacement<Tile>[];
  tileSpecs: TileSpecs;
};

export type TiledPatternPlacement<Tile> = {
  position: Position;
  pattern: TiledPattern<Tile>;
};

export type TiledPattern<Tile> = Tile[][];

export type TilePlacement<Tile> = {
  tile: Tile;
  position: Position;
};

export type TileSpecs = {
  size: number;
  padding: number;
};

export type SpritePlacement = {
  sprite: Sprite;
  position: Position;
};
