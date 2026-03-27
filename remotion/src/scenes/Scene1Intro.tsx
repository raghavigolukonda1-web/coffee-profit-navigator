import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { FONTS, COLORS } from "../constants";

export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const gradAngle = 135 + Math.sin(frame * 0.015) * 12;

  // Staggered entrance
  const beanScale = spring({ frame: frame - 15, fps, config: { damping: 10, stiffness: 120 } });
  const beanRotate = interpolate(spring({ frame: frame - 15, fps, config: { damping: 12 } }), [0, 1], [-30, 0]);

  const titleClip = interpolate(frame, [25, 55], [100, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const titleOpacity = interpolate(frame, [25, 45], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  const lineW = interpolate(spring({ frame: frame - 55, fps, config: { damping: 200 } }), [0, 1], [0, 350]);

  const subOpacity = interpolate(frame, [60, 80], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const subY = interpolate(spring({ frame: frame - 60, fps, config: { damping: 20 } }), [0, 1], [40, 0]);

  const yearOpacity = interpolate(frame, [80, 100], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${gradAngle}deg, ${COLORS.dark} 0%, ${COLORS.espresso} 40%, ${COLORS.dark} 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Radial glow */}
      <div style={{
        position: "absolute", width: 900, height: 900, borderRadius: "50%",
        background: `radial-gradient(circle, ${COLORS.sienna}28, transparent 70%)`,
        top: "50%", left: "50%", transform: "translate(-50%, -50%)",
      }} />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 1 }}>
        <div style={{
          transform: `scale(${beanScale}) rotate(${beanRotate}deg)`,
          fontSize: 100, marginBottom: 30,
          filter: `drop-shadow(0 0 60px ${COLORS.gold}60)`,
        }}>
          ☕
        </div>

        <div style={{
          fontFamily: FONTS.display, fontSize: 100, fontWeight: 900, color: COLORS.cream,
          opacity: titleOpacity,
          clipPath: `inset(0 ${titleClip}% 0 0)`,
          letterSpacing: -3, lineHeight: 1,
          textShadow: `0 6px 60px ${COLORS.espresso}`,
        }}>
          Afficionado
        </div>

        <div style={{
          width: lineW, height: 3,
          background: `linear-gradient(90deg, transparent, ${COLORS.gold}, transparent)`,
          margin: "24px 0",
        }} />

        <div style={{
          fontFamily: FONTS.body, fontSize: 30, fontWeight: 600, color: COLORS.latte,
          opacity: subOpacity, transform: `translateY(${subY}px)`,
          letterSpacing: 8, textTransform: "uppercase",
        }}>
          Coffee Roasters
        </div>

        <div style={{
          fontFamily: FONTS.body, fontSize: 18, color: COLORS.gold,
          opacity: yearOpacity, marginTop: 24, letterSpacing: 4,
        }}>
          Product Intelligence Report · 2025
        </div>
      </div>
    </AbsoluteFill>
  );
};
