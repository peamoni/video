import React from "react";
import { useAppContext } from "../../context/AppContext";
import {
  AspectRatio,
  Coin,
  ChatQuote,
  FiletypeGif,
} from "react-bootstrap-icons";

import "./Composer.css";
import { Coins, Dimensions, Template } from "../../model/types";

// Create enum with values for each tab
enum Tabs {
  Dimensions = 1,
  Coin,
  Quote,
  Gif,
}

const Composer = () => {
  const { video, setVideo } = useAppContext();
  const [currentTab, setCurrentTab] = React.useState(Tabs.Dimensions);
  return (
    <div className="">
      <div className="flex justify-evenly">
        <div
          className="text-slate-900 align-baseline"
          onClick={() => setCurrentTab(Tabs.Dimensions)}
        >
          <AspectRatio className="" size={40} />
        </div>
        <div
          className="text-slate-900 align-baseline"
          onClick={() => setCurrentTab(Tabs.Coin)}
        >
          <Coin className="" size={40} />
        </div>
        <div
          className="text-slate-900 align-baseline"
          onClick={() => setCurrentTab(Tabs.Quote)}
        >
          <ChatQuote className="" size={40} />
        </div>
        <div
          className="text-slate-900 align-baseline"
          onClick={() => setCurrentTab(Tabs.Gif)}
        >
          <FiletypeGif className="" size={40} />
        </div>
      </div>

      {currentTab === Tabs.Dimensions && (
        <div className="pt-8">
          <div className="flex justify-evenly">
            <div
              className={`${
                video.dimensions === Dimensions.Square
                  ? "text-blue-900"
                  : "text-slate-400"
              }  hover:text-blue-700 align-baseline transition-text-color cursor-pointer`}
              onClick={(e) => {
                setVideo({ ...video, dimensions: Dimensions.Square });
              }}
            >
              SQUARE
            </div>
            <div
              className={`${
                video.dimensions === Dimensions.Portrait
                  ? "text-blue-900"
                  : "text-slate-400"
              }  hover:text-blue-700 align-baseline transition-text-color cursor-pointer`}
              onClick={(e) => {
                setVideo({ ...video, dimensions: Dimensions.Portrait });
              }}
            >
              PORTRAIT
            </div>
            <div
              className={`${
                video.dimensions === Dimensions.Landscape
                  ? "text-blue-900"
                  : "text-slate-400"
              }  hover:text-blue-700 align-baseline transition-text-color cursor-pointer`}
              onClick={(e) => {
                setVideo({ ...video, dimensions: Dimensions.Landscape });
              }}
            >
              LANDSCAPE
            </div>
          </div>
        </div>
      )}

      {currentTab === Tabs.Coin && video.type === Template.TextTicker && (
        <div className="pt-8">
          <div className="flex justify-evenly">
            <div
              className={`${
                video.coin === Coins.Bitcoin
                  ? "text-blue-900"
                  : "text-slate-400"
              }  hover:text-blue-700 align-baseline transition-text-color cursor-pointer`}
              onClick={(e) => {
                setVideo({ ...video, coin: Coins.Bitcoin });
              }}
            >
              BITCOIN
            </div>
            <div
              className={`${
                video.coin === Coins.Ethereum
                  ? "text-blue-900"
                  : "text-slate-400"
              }  hover:text-blue-700 align-baseline transition-text-color cursor-pointer`}
              onClick={(e) => {
                setVideo({ ...video, coin: Coins.Ethereum });
              }}
            >
              ETHEREUM
            </div>
          </div>
        </div>
      )}

      {currentTab === Tabs.Quote && video.type === Template.TextTicker && (
        <div className="pt-8 text-center">
          <input
            type="text"
            className="w-auto p-2 m-2"
            placeholder="Oh my god look at this 😱"
            value={video.quote}
            onChange={(e) => {
              setVideo({ ...video, quote: e.target.value });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Composer;
