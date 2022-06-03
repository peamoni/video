import React, { useCallback } from "react";
import { auth, renderVideo } from "../../firebase";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

import "./Exporter.css";
import { useAppContext } from "../../context/AppContext";

const Exporter = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const { user, video } = useAppContext();
  const exportVideo = useCallback(async () => {
    // call firebase function
    console.log({ conf: video });
    console.log(await renderVideo({ conf: video }));
  }, [video]);
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

      <div className=""></div>
    </div>
  );
};

export default Exporter;
