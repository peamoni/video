import { useMemo } from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

const WORD_DISPLAY_FRAMES = 10;

export const quoteDuration = (quote: string): number => {
  return quote.split(" ").length * WORD_DISPLAY_FRAMES;
};

export const Quote: React.FC<{ quote: string }> = ({ quote }) => {
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();
  const words = useMemo(() => quote.split(" "), [quote]);
  const wordIndex = Math.floor(frame / WORD_DISPLAY_FRAMES);
  const word = useMemo(() => words[wordIndex], [words, wordIndex]);
  const currentWordFrame = frame % WORD_DISPLAY_FRAMES;
  const size = interpolate(
    currentWordFrame,
    [0, WORD_DISPLAY_FRAMES / 3],
    [0.9, 1],
    { extrapolateRight: "clamp", easing: Easing.out(Easing.ease) }
  );
  const opacity = interpolate(
    currentWordFrame,
    [0, WORD_DISPLAY_FRAMES / 2],
    [0, 1],
    { extrapolateRight: "clamp", easing: Easing.out(Easing.ease) }
  );
  return (
    <div
      className="bg-cyan-900 text-center flex flex-row items-center justify-center"
      style={{ width, height }}
    >
      <div
        style={{ opacity, transform: `scale(${size})`, fontWeight: "bold" }}
        className="text-white place-self-center "
      >
        {word.toUpperCase()}
      </div>
    </div>
  );
};
