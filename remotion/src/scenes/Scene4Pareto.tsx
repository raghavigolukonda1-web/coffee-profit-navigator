import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { FONTS, COLORS } from "../constants";

export const Scene4Pareto: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Big stat reveal
  const statScale = spring({ frame: frame - 20, fps, config: { damping: 10, stiffness: 100 } });
  const statOpacity = interpolate(frame, [20, 35], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Supporting text
  const textOpacity = interpolate(frame, [40, 55], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const textY = interpolate(
    spring({ frame: frame - 40, fps, config: { damping: 20, stiffness: 100 } }),
    [0, 1],
    [40, 0]
  );

  // Glow pulse
  const glowScale = 1 + Math.sin(frame * 0.08) * 0.05;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(140deg, ${COLORS.dark} 0%, ${COLORS.espresso} 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Big radial glow behind stat */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.gold}25, transparent 70%)`,
          transform: `scale(${glowScale})`,
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 1 }}>
        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: 20,
            fontWeight: 600,
            color: COLORS.gold,
            opacity: headerOpacity,
            textTransform: "uppercase",
            letterSpacing: 4,
            marginBottom: 30,
          }}
        >
          Pareto Insight
        </div>

        {/* The 80/20 stat */}
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: 180,
            fontWeight: 900,
            color: COLORS.cream,
            opacity: statOpacity,
            transform: `scale(${statScale})`,
            lineHeight: 1,
            textShadow: `0 0 80px ${COLORS.gold}40`,
          }}
        >
          80%
        </div>

        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: 32,
            fontWeight: 600,
            color: COLORS.latte,
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.5,
            marginTop: 20,
          }}
        >
          of revenue comes from just{" "}
          <span style={{ color: COLORS.gold, fontWeight: 700 }}>5 products</span>
        </div>

        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: 20,
            color: COLORS.latte,
            opacity: interpolate(frame, [55, 70], [0, 0.7], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
            marginTop: 16,
          }}
        >
          Revenue concentration drives menu optimization
        </div>
      </div>
    </AbsoluteFill>
  );
};
