import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { FONTS, COLORS } from "../constants";

export const Scene5Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const gradAngle = 135 + Math.sin(frame * 0.015) * 15;

  // Logo/title entrance
  const titleScale = spring({ frame: frame - 10, fps, config: { damping: 15, stiffness: 100 } });
  const titleOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Tagline
  const tagOpacity = interpolate(frame, [35, 55], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const tagY = interpolate(
    spring({ frame: frame - 35, fps, config: { damping: 20, stiffness: 100 } }),
    [0, 1],
    [30, 0]
  );

  // Decorative line
  const lineW = interpolate(
    spring({ frame: frame - 50, fps, config: { damping: 200 } }),
    [0, 1],
    [0, 400]
  );

  // URL/CTA text
  const urlOpacity = interpolate(frame, [60, 80], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Fade out at end
  const fadeOut = interpolate(frame, [120, 150], [1, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${gradAngle}deg, ${COLORS.dark} 0%, ${COLORS.espresso} 50%, ${COLORS.dark} 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeOut,
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          width: 1000,
          height: 1000,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.gold}15, transparent 70%)`,
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 1 }}>
        <div style={{ fontSize: 60, marginBottom: 20, transform: `scale(${titleScale})`, opacity: titleOpacity }}>
          ☕
        </div>

        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: 72,
            fontWeight: 900,
            color: COLORS.cream,
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            letterSpacing: -1,
            textShadow: `0 4px 40px ${COLORS.espresso}`,
          }}
        >
          Afficionado
        </div>

        <div
          style={{
            width: lineW,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${COLORS.gold}, transparent)`,
            margin: "24px 0",
          }}
        />

        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: 26,
            fontWeight: 600,
            color: COLORS.latte,
            opacity: tagOpacity,
            transform: `translateY(${tagY}px)`,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          Product Intelligence Dashboard
        </div>

        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: 20,
            color: COLORS.gold,
            opacity: urlOpacity,
            marginTop: 40,
            letterSpacing: 2,
          }}
        >
          Data-Driven Menu Optimization
        </div>
      </div>
    </AbsoluteFill>
  );
};
