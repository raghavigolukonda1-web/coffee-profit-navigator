import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { FONTS, COLORS } from "../constants";

export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Coffee bean icon scale
  const beanScale = spring({ frame: frame - 10, fps, config: { damping: 12, stiffness: 150 } });

  // Title reveal
  const titleY = interpolate(
    spring({ frame: frame - 20, fps, config: { damping: 20, stiffness: 100 } }),
    [0, 1],
    [60, 0]
  );
  const titleOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Subtitle
  const subOpacity = interpolate(frame, [40, 60], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const subY = interpolate(
    spring({ frame: frame - 40, fps, config: { damping: 20, stiffness: 100 } }),
    [0, 1],
    [30, 0]
  );

  // Decorative line
  const lineWidth = interpolate(
    spring({ frame: frame - 55, fps, config: { damping: 200 } }),
    [0, 1],
    [0, 300]
  );

  // Background gradient drift
  const gradAngle = 135 + Math.sin(frame * 0.02) * 10;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${gradAngle}deg, ${COLORS.dark} 0%, ${COLORS.espresso} 50%, ${COLORS.dark} 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.sienna}30, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 1 }}>
        {/* Coffee icon */}
        <div
          style={{
            transform: `scale(${beanScale})`,
            fontSize: 80,
            marginBottom: 30,
            filter: `drop-shadow(0 0 40px ${COLORS.gold}80)`,
          }}
        >
          ☕
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: 88,
            fontWeight: 900,
            color: COLORS.cream,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            textAlign: "center",
            letterSpacing: -2,
            lineHeight: 1,
            textShadow: `0 4px 40px ${COLORS.espresso}`,
          }}
        >
          Afficionado
        </div>

        {/* Decorative line */}
        <div
          style={{
            width: lineWidth,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${COLORS.gold}, transparent)`,
            margin: "20px 0",
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: 28,
            fontWeight: 600,
            color: COLORS.latte,
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          Coffee Roasters
        </div>
      </div>
    </AbsoluteFill>
  );
};
