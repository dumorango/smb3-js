import { getPatternSize, getPatternState } from './../patterns';
import { Tile, PatternType, Trait, Pattern } from "../types";
import { getPatternTiles } from "../patterns";

describe("The pattern module", () => {
  describe("the getPaternTiles function", () => {
    it("should get ground tiles", () => {
      const groundTiles = getPatternTiles({
        type: PatternType.GROUND,
        length: 4,
      });
      expect(groundTiles).toEqual([
        [
          Tile.GROUND_TOP_LEFT,
          Tile.GROUND_TOP_MIDDLE,
          Tile.GROUND_TOP_MIDDLE,
          Tile.GROUND_TOP_RIGHT,
        ],
      ]);
    });
    it("should get tiles with no middle tile", () => {
      const groundTiles = getPatternTiles({
        type: PatternType.GROUND,
        length: 2,
      });
      expect(groundTiles).toEqual([
        [Tile.GROUND_TOP_LEFT, Tile.GROUND_TOP_RIGHT],
      ]);
    });
  });
  it("should get SKY tiles", () => {
    const skyTiles = getPatternTiles({
      type: PatternType.SKY,
      size: {
        height: 2,
        width: 3,
      },
    });
    expect(skyTiles).toEqual([
      [Tile.SKY, Tile.SKY, Tile.SKY],
      [Tile.SKY, Tile.SKY, Tile.SKY],
    ]);
  });
  it("should get PIPE tiles", () => {
    const pipeTiles = getPatternTiles({
      type: PatternType.PIPE,
      height: 2,
    });
    expect(pipeTiles).toEqual([
      [Tile.PIPE_TOP_LEFT, Tile.PIPE_TOP_RIGHT],
      [Tile.PIPE_BOTTOM_LEFT, Tile.PIPE_BOTTOM_RIGHT],
      [Tile.PIPE_BOTTOM_LEFT, Tile.PIPE_BOTTOM_RIGHT],
    ]);
  });
  it("should get BRICK tiles", () => {
    const brickTiles = getPatternTiles({
      type: PatternType.BRICK,
    });
    expect(brickTiles).toEqual([[Tile.BRICK1]]);
  });
  it("should throw an error is the pattern is not mapped", () => {    
    try {
      //@ts-ignore    
      getPatternTiles({
        type: "NOT_MAPPED_PATTERN" as PatternType
      });
    } catch (e) {
      expect(e.message).toBe("Pattern Type not mapped");
    }
  });
  describe("the getPatternSize function", () => {
      it("should get pattern size", () => {
        const pipePatterSize = getPatternSize({
          type: PatternType.PIPE,
          height: 2,
        });
        expect(pipePatterSize).toEqual({
          height: 48,
          width: 32
        })
      })
  });
  describe("the getPatternState function", () => {
    it("should return a pattern state with a SOLID trait", () => {
      const position = {
        x: 1,
        y: 1
      }
      for (const patternType of [PatternType.BRICK, PatternType.GROUND, PatternType. PIPE]) {
        const pattern = {
          type: patternType
        } as Pattern
        const patternState = getPatternState({ pattern, position });
        expect(patternState).toMatchObject({
          pattern,
          movement: {
            position: {
              x: 16,
              y: 16
            },
            velocity: { x: 0, y: 0 },
            acceleration: { x: 0, y: 0 }
          }          
        })
        expect(patternState.traits).toContain(Trait.SOLID)

      }
    })
});
});
