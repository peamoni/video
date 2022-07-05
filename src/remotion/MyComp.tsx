import { Gif } from "@remotion/gif";
import { useVideoConfig } from "remotion";

export const MyComp: React.FC<{ ticker: string; quote: string }> = ({
  ticker,
  quote,
}) => {
  const { width, height } = useVideoConfig();

  return (
    <div
      style={{
        fontSize: "100px",
        backgroundColor: "red",
      }}
    >
      Hello {ticker}!{quote}
      <div>
        {/* <Gif
          src="https://media.giphy.com/media/3o72F7YT6s0EMFI0Za/giphy.gif"
          width={width}
          height={height}
          fit="fill"
        /> */}
      </div>
    </div>
  );
};
