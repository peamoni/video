import React from "react";
import { Composition, getInputProps } from "remotion";
import { getVideoDimentions } from "../model/types";
import { MyComp } from "./MyComp";

export const Video = () => {
  const { dimension } = getInputProps();
  const { width, height } = getVideoDimentions(dimension);
  return (
    <>
      <Composition
        id="textticker"
        component={MyComp}
        durationInFrames={120}
        width={width}
        height={height}
        fps={30}
        defaultProps={{ ticker: "World", quote: "Oh my god look at this 😱" }}
      />
    </>
  );
};
