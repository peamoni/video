import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const CHART_DURATION = 100;

export const Chart: React.FC<{
  strData: string;
  currency: string;
  digit: number;
}> = ({ strData, currency, digit }) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();

  const data = JSON.parse(strData);
  const graphHeight = videoConfig.height - 200;
  const marginTop = 100;
  const upColor = "#AFE1AF";
  const downColor = "#DC143C";
  // find max hight in strData
  const max = data.reduce((max: number, item: any) => {
    return Math.max(max, item.high);
  }, 0);
  const min = data.reduce((min: number, item: any) => {
    return Math.min(min, item.low);
  }, 999999999999);
  const unit = graphHeight / (max - min);
  const candleWidth = videoConfig.width / data.length;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
      className="bg-cyan-900"
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          top: marginTop,
          borderTopWidth: 1,
          borderColor: "#FFFFFF",
          borderStyle: "solid",
          opacity: interpolate(frame, [0, 30], [0, 0.3], {
            extrapolateRight: "clamp",
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "100%",
          left: 30,
          top: marginTop + graphHeight,
          fontFamily: "Helvetica, Arial",
          fontSize: "3rem",
          color: "#FFFFFF",
          opacity: interpolate(frame, [30, 60], [0, 0.5], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        {Number(min).toFixed(2) + currency}
      </div>

      <div
        style={{
          position: "absolute",
          width: "100%",
          top: marginTop + graphHeight,
          borderTopWidth: 1,
          borderColor: "#FFFFFF",
          borderStyle: "solid",
          opacity: interpolate(frame, [0, 30], [0, 0.3], {
            extrapolateRight: "clamp",
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "100%",
          top: marginTop - 60,
          left: 30,
          fontFamily: "Helvetica, Arial",
          fontSize: "3rem",
          color: "#FFFFFF",
          opacity: interpolate(frame, [30, 60], [0, 0.5], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        {Number(max).toFixed(2) + currency}
      </div>

      {data.map((d: any, i: number) => {
        const h = (d.high - min) * unit;
        const l = (d.low - min) * unit;
        const o = (d.open - min) * unit;
        const c = (d.close - min) * unit;
        const wickHeight = spring({
          frame: frame - i * 0.5,
          from: 0,
          to: h - l,
          fps: videoConfig.fps,
          config: {
            stiffness: 50,
          },
        });
        const bodyHeight = spring({
          frame: frame - i * 0.5,
          from: 0,
          to: Math.abs(o - c),
          fps: videoConfig.fps,
          config: {
            stiffness: 50,
          },
        });
        const bodyTop = spring({
          frame: frame - i * 0.5,
          from: 0,
          to: Math.max(c, o),
          fps: videoConfig.fps,
          config: {
            stiffness: 50,
          },
        });
        const wickTop = spring({
          frame: frame - i * 0.5,
          from: 0,
          to: h,
          fps: videoConfig.fps,
          config: {
            stiffness: 50,
          },
        });
        const backgroundColor = c > o ? upColor : downColor;

        return [
          <span
            style={{
              position: "absolute",
              left: i * candleWidth + 2,
              width: candleWidth - 4,
              top: marginTop + graphHeight - bodyTop,
              height: bodyHeight,
              minHeight: 1,
              backgroundColor,
              display: "inline-block",
            }}
          />,
          <span
            style={{
              position: "absolute",
              width: 2,
              top: marginTop + graphHeight - wickTop,
              height: wickHeight,
              backgroundColor,
              display: "inline-block",
              left: (i + 0.5) * candleWidth - 1,
            }}
          />,
        ];
      })}
    </div>
  );
};
