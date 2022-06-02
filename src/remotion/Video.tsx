import React from "react";
import { Composition } from "remotion";
import { MyComp } from "./MyComp";

export const Video = () => {
  return (
    <>
      <Composition
        id="videomoni"
        component={MyComp}
        durationInFrames={120}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{ ticker: "World" }}
      />
    </>
  );
};
