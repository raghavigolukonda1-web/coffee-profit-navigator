import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { wipe } from "@remotion/transitions/wipe";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Scene1Intro } from "./scenes/Scene1Intro";
import { Scene2Problem } from "./scenes/Scene2Problem";
import { Scene3Dashboard } from "./scenes/Scene3Dashboard";
import { Scene4KPIs } from "./scenes/Scene4KPIs";
import { Scene5Categories } from "./scenes/Scene5Categories";
import { Scene6Products } from "./scenes/Scene6Products";
import { Scene7Pareto } from "./scenes/Scene7Pareto";
import { Scene8Closing } from "./scenes/Scene8Closing";
import { COLORS } from "./constants";

const T = 25; // transition duration

export const MainVideo: React.FC = () => {
  const frame = useCurrentFrame();

  const grainOpacity = interpolate(Math.sin(frame * 0.3), [-1, 1], [0.02, 0.05]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark }}>
      {/* Persistent floating accent circles */}
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        {[0, 1, 2, 3].map((i) => {
          const speed = 0.005 + i * 0.002;
          const x = 200 + i * 450 + Math.sin(frame * speed) * 100;
          const y = 150 + i * 200 + Math.cos(frame * speed * 1.2) * 80;
          const size = 250 + i * 80;
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
                background: `radial-gradient(circle, ${i % 2 === 0 ? COLORS.sienna : COLORS.gold}18, transparent)`,
              }}
            />
          );
        })}
      </AbsoluteFill>

      <TransitionSeries>
        {/* Scene 1: Brand Intro - 4s */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <Scene1Intro />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: T })}
        />

        {/* Scene 2: Problem Statement - 6s */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <Scene2Problem />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: T })}
        />

        {/* Scene 3: Dashboard Reveal - 7s */}
        <TransitionSeries.Sequence durationInFrames={210}>
          <Scene3Dashboard />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: T })}
        />

        {/* Scene 4: KPI Highlights - 6s */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <Scene4KPIs />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: T })}
        />

        {/* Scene 5: Category Revenue - 6s */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <Scene5Categories />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-bottom" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: T })}
        />

        {/* Scene 6: Top Products - 7s */}
        <TransitionSeries.Sequence durationInFrames={210}>
          <Scene6Products />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: T })}
        />

        {/* Scene 7: Pareto Insight - 8s */}
        <TransitionSeries.Sequence durationInFrames={240}>
          <Scene7Pareto />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: T })}
        />

        {/* Scene 8: Closing - 6s + extra for fade */}
        <TransitionSeries.Sequence durationInFrames={280}>
          <Scene8Closing />
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
