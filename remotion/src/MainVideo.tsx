import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { wipe } from "@remotion/transitions/wipe";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Scene1Brand } from "./scenes/Scene1Brand";
import { Scene2Hero } from "./scenes/Scene2Hero";
import { Scene3HowItWorks } from "./scenes/Scene3HowItWorks";
import { Scene4Curated } from "./scenes/Scene4Curated";
import { Scene5Roasts } from "./scenes/Scene5Roasts";
import { Scene6WhySubscribe } from "./scenes/Scene6WhySubscribe";
import { Scene7Testimonial } from "./scenes/Scene7Testimonial";
import { Scene8CTA } from "./scenes/Scene8CTA";
import { COLORS } from "./constants";

const T = 25;

export const MainVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const grainOpacity = interpolate(Math.sin(frame * 0.3), [-1, 1], [0.015, 0.04]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark }}>
      {/* Floating gold particles */}
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        {[0, 1, 2, 3, 4].map((i) => {
          const speed = 0.004 + i * 0.002;
          const x = 150 + i * 380 + Math.sin(frame * speed + i) * 120;
          const y = 100 + i * 180 + Math.cos(frame * speed * 1.3 + i * 2) * 90;
          const size = 150 + i * 60;
          return (
            <div key={i} style={{
              position: "absolute", left: x, top: y, width: size, height: size,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${COLORS.gold}12, transparent)`,
            }} />
          );
        })}
      </AbsoluteFill>

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={130}>
          <Scene1Brand />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={springTiming({ config: { damping: 200 }, durationInFrames: T })} />

        <TransitionSeries.Sequence durationInFrames={200}>
          <Scene2Hero />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-left" })} timing={springTiming({ config: { damping: 200 }, durationInFrames: T })} />

        <TransitionSeries.Sequence durationInFrames={210}>
          <Scene3HowItWorks />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={springTiming({ config: { damping: 200 }, durationInFrames: T })} />

        <TransitionSeries.Sequence durationInFrames={180}>
          <Scene4Curated />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={springTiming({ config: { damping: 200 }, durationInFrames: T })} />

        <TransitionSeries.Sequence durationInFrames={210}>
          <Scene5Roasts />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-bottom" })} timing={springTiming({ config: { damping: 200 }, durationInFrames: T })} />

        <TransitionSeries.Sequence durationInFrames={200}>
          <Scene6WhySubscribe />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={springTiming({ config: { damping: 200 }, durationInFrames: T })} />

        <TransitionSeries.Sequence durationInFrames={180}>
          <Scene7Testimonial />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={springTiming({ config: { damping: 200 }, durationInFrames: T })} />

        <TransitionSeries.Sequence durationInFrames={290}>
          <Scene8CTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Grain */}
      <AbsoluteFill style={{
        opacity: grainOpacity,
        background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        mixBlendMode: "overlay", pointerEvents: "none",
      }} />
    </AbsoluteFill>
  );
};
