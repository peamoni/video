import React from "react";
import { Player } from "@remotion/player";
import { MyComp } from "../../remotion/MyComp";

import "./Viewer.css";
import { useAppContext } from "../../context/AppContext";

const Viewer = () => {
  const { video } = useAppContext();
  return (
    <div className="h-full">
      <Player
        component={MyComp}
        inputProps={{ text: video.ticker }}
        durationInFrames={120}
        compositionWidth={1920}
        compositionHeight={1080}
        fps={30}
        style={{
          width: "100%",
          height: "100%",
        }}
        controls
      />
      viewer
    </div>
  );
};

export default Viewer;
