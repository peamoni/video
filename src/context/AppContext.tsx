import React, { useState, FC, useContext, useEffect } from "react";

import { initializeApp, FirebaseApp } from "firebase/app";
import { onAuthStateChanged, User } from "@firebase/auth";
import { auth } from "../firebase";

enum BackgroundColors {
  Dark = "DARK",
  Light = "LIGHT",
}

type Videoprops = {
  background: BackgroundColors;
  ticker: string;
};

interface IAppContext {
  user: User | null;
  video: Videoprops;
  setVideo: (video: Videoprops) => void;
}

const defaultState = {
  user: null,
  video: {
    background: BackgroundColors.Dark,
    ticker: "BTC-USD.CC",
  },
  setVideo: () => {},
};

const AppContext = React.createContext<IAppContext>(defaultState);

type Props = {
  children?: React.ReactNode;
};

export const AppProvider: FC<Props> = ({ children }) => {
  const [video, setVideo] = useState<Videoprops>(defaultState.video);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("authStateChange", user);
      setUser(user);
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        video,
        setVideo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

export const useAppContext = () => useContext(AppContext);
