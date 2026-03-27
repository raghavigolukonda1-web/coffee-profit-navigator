import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { wipe } from "@remotion/transitions/wipe";
import { fade } from "@remotion/transitions/fade";
import { Scene1Intro } from "./scenes/Scene1Intro";
import { COLORS } from "./constants";

const TRANSITION_DURATION = 20;

export const MainVideo: React.FC = () => {
  const frame = useCurrentFrame();

  // Persistent subtle grain overlay
  const grainOpacity = interpolate(
    Math.sin(frame * 0.3),
    [-1, 1],
    [0.02, 0.06]
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark }}>
      {/* Persistent floating accent circles */}
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        {[0, 1, 2].map((i) => {
          const speed = 0.008 + i * 0.003;
          const x = 300 + i * 500 + Math.sin(frame * speed) * 80;
          const y = 200 + i * 250 + Math.cos(frame * speed * 1.3) * 60;
          const size = 200 + i * 100;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: size,
                height: size,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${COLORS.sienna}22, transparent)`,
              }}
            />
          );
        })}
      </AbsoluteFill>

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={100}>
          <Scene1Intro />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: TRANSITION_DURATION })}
        />
        <TransitionSeries.Sequence durationInFrames={95}>
          <Scene2KPIs />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: TRANSITION_DURATION })}
        />
        <TransitionSeries.Sequence durationInFrames={90}>
          <Scene3Categories />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-bottom" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: TRANSITION_DURATION })}
        />
        <TransitionSeries.Sequence durationInFrames={95}>
          <Scene4Pareto />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: TRANSITION_DURATION })}
        />
        <TransitionSeries.Sequence durationInFrames={150}>
          <Scene5Closing />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Grain overlay */}
      <AbsoluteFill
        style={{
          opacity: grainOpacity,
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
