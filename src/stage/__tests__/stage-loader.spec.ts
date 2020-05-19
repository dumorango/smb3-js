import { Stage } from "./../types";
import { loadStageLayersImage } from "../stage-loader";
import { loadImage } from "../../loaders";

jest.mock("../../loaders");

describe("The stage loader module", () => {
  it("should load the stage layers images", async () => {
    const imageFile = "imagepath.png";
    const img = document.createElement("img");
    const layers = [
      {
        imageFile,
      },
    ];
    const stage = {
      layers,
    } as Stage<any>;
    (loadImage as jest.Mock).mockResolvedValue(img);
    const response = await loadStageLayersImage(stage);
    expect(response).toMatchObject({
      layers: [
        {
          img,
        },
      ],
    });
  });
});
