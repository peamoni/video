import React, { useCallback, useEffect, useState } from "react";
import {
  auth,
  getDownloadVideoLink,
  getRenders,
  renderVideo,
} from "../../firebase";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

import "./Exporter.css";
import { useAppContext } from "../../context/AppContext";
import { getTickerName, Render, Template } from "../../model/types";

enum RunStatus {
  Waiting = 1,
  Rendering,
  Created,
  Downloaded,
}

const Exporter = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const { user, video } = useAppContext();
  const [renders, setRenders] = useState<Render[]>([]);

  const fetchRenders = useCallback(async () => {
    if (user) {
      const r = await getRenders(user.uid);
      setRenders(r);
    }
  }, [user, setRenders]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        renders.find(
          (render) =>
            render.status === RunStatus.Waiting ||
            render.status === RunStatus.Rendering
        )
      ) {
        fetchRenders();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [renders, fetchRenders]);

  useEffect(() => {
    if (user) {
      fetchRenders();
    }
  }, [user, setRenders, fetchRenders]);

  const exportVideo = useCallback(async () => {
    await renderVideo({
      conf: {
        ticker:
          video.type === Template.TextTicker ? getTickerName(video.coin) : "",
      },
    });
    await fetchRenders();
  }, [video, fetchRenders]);

  return (
    <div className="h-full">
      {/** create a google login button */}
      {!user && (
        <div className="flex justify-center">
          <button
            onClick={() => signInWithGoogle()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login with Google
          </button>
        </div>
      )}
      {/** create an export video button */}
      {user && (
        <div className="flex justify-center">
          <button
            onClick={() => exportVideo()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Export video
          </button>
        </div>
      )}

      <div>
        {/** create a list of renders */}
        {renders.map((render: Render) => (
          <div key={render.runId}>
            {/** Display render date, status and a download button */}
            <div>
              {render.timestamp} - {render.status}
            </div>
            <div>
              {/** Link to a firebase function url */}
              <a href={getDownloadVideoLink(render.uid)} download>
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exporter;
