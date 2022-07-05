import React, { useCallback, useEffect, useRef } from "react";
import { Player, PlayerRef } from "@remotion/player";
import { MyComp } from "../../remotion/MyComp";
import { CaretRight } from "react-bootstrap-icons";

import "./Viewer.css";
import { useAppContext } from "../../context/AppContext";
import { getTickerName, getVideoDimentions, Template } from "../../model/types";

const Viewer = () => {
  const { video } = useAppContext();
  const playerRef = useRef<PlayerRef>(null);
  const [isPlaying, setPlaying] = React.useState(false);
  useEffect(() => {
    if (!playerRef.current) {
      return;
    }
    playerRef.current.addEventListener("play", () => {
      setPlaying(true);
    });
    playerRef.current.addEventListener("pause", () => {
      setPlaying(false);
    });
  }, []);

  const play = useCallback(() => {
    const { current } = playerRef;
    if (!current) {
      return;
    }
    if (current.isPlaying()) {
      current.pause();
    } else {
      current.play();
    }
  }, []);

  const dimensions = getVideoDimentions(video.dimensions);

  return (
    <div className="h-full relative" onClick={play}>
      <div
        className={`${
          isPlaying ? "opacity-0" : ""
        } absolute w-full h-full z-10 flex justify-center items-center transition-opacity`}
      >
        <div className="bg-black/50 rounded-full p-4">
          <CaretRight className="" color="white" fontSize={40} />
        </div>
      </div>
      <Player
        ref={playerRef}
        component={MyComp}
        inputProps={{
          ticker:
            video.type === Template.TextTicker ? getTickerName(video.coin) : "",
          quote: video.type === Template.TextTicker ? video.quote : "coucou",
        }}
        durationInFrames={120}
        compositionWidth={dimensions.width}
        compositionHeight={dimensions.height}
        fps={30}
        doubleClickToFullscreen={true}
        style={{
          width: "100%",
          height: "100%",
        }}
        loop
      />
    </div>
  );
};

export default Viewer;
