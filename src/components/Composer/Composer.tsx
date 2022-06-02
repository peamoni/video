import React from "react";
import { useAppContext } from "../../context/AppContext";

import "./Composer.css";

const Composer = () => {
  const { video, setVideo } = useAppContext();
  return (
    <div>
      <input
        type="text"
        value={video.ticker}
        onChange={(e) => {
          setVideo({ ...video, ticker: e.target.value });
        }}
      />
    </div>
  );
};

export default Composer;
