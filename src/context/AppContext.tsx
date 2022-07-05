import React, { useState, FC, useContext, useEffect } from "react";

import { onAuthStateChanged, User } from "@firebase/auth";
import { auth } from "../firebase";
import { Coins, Dimensions, Template } from "../model/types";

type Videoprops =
  | {
      dimensions: Dimensions;
      type: Template.Unknow;
    }
  | {
      dimensions: Dimensions;
      type: Template.TextTicker;
      coin: Coins;
      quote: string;
    }
  | {
      dimensions: Dimensions;
      type: Template.TickerGif;
      coin: Coins;
      gif: string;
    };

interface IAppContext {
  user: User | null;
  video: Videoprops;
  setVideo: (video: Videoprops) => void;
}

const defaultState: IAppContext = {
  user: null,
  video: {
    dimensions: Dimensions.Square,
    type: Template.TextTicker,
    coin: Coins.Bitcoin,
    quote: "",
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
