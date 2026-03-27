import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";
import { FONTS, COLORS } from "../constants";

export const Scene3Dashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Dashboard image enters with scale + shadow
  const imgScale = interpolate(
    spring({ frame: frame - 15, fps, config: { damping: 20, stiffness: 80 } }),
    [0, 1], [0.85, 1]
  );
  const imgOpacity = interpolate(frame, [15, 40], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Slow zoom-in over time
  const slowZoom = interpolate(frame, [40, 210], [1, 1.08], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Floating highlight callout
  const callout1Opacity = interpolate(frame, [80, 100], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const callout1Y = interpolate(spring({ frame: frame - 80, fps, config: { damping: 15 } }), [0, 1], [20, 0]);

  const callout2Opacity = interpolate(frame, [120, 140], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const callout2Y = interpolate(spring({ frame: frame - 120, fps, config: { damping: 15 } }), [0, 1], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(145deg, ${COLORS.dark} 0%, #120904 50%, ${COLORS.espresso} 100%)`,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}
    >
      <div style={{
        fontFamily: FONTS.body, fontSize: 18, fontWeight: 600, color: COLORS.gold,
        opacity: labelOpacity, textTransform: "uppercase", letterSpacing: 5, marginBottom: 20,
      }}>
        Live Dashboard
      </div>

      {/* Dashboard screenshot with frame */}
      <div style={{
        opacity: imgOpacity,
        transform: `scale(${imgScale * slowZoom})`,
        borderRadius: 16, overflow: "hidden",
        boxShadow: `0 30px 100px -20px ${COLORS.dark}, 0 0 80px ${COLORS.sienna}20`,
        border: `1px solid ${COLORS.gold}20`,
        position: "relative",
      }}>
        <Img
          src={staticFile("images/dashboard.png")}
          style={{ width: 1400, height: "auto", display: "block" }}
        />

        {/* Gradient overlay at edges */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(180deg, transparent 70%, ${COLORS.dark}90 100%)`,
          pointerEvents: "none",
        }} />
      </div>

      {/* Floating callout badges */}
      <div style={{
        position: "absolute", right: 120, top: 200,
        opacity: callout1Opacity, transform: `translateY(${callout1Y}px)`,
        background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.sienna})`,
        borderRadius: 12, padding: "12px 24px",
        display: "flex", alignItems: "center", gap: 10,
        boxShadow: `0 8px 30px ${COLORS.dark}80`,
      }}>
        <span style={{ fontSize: 22 }}>📊</span>
        <span style={{
          fontFamily: FONTS.body, fontSize: 16, fontWeight: 700,
          color: COLORS.dark, textTransform: "uppercase", letterSpacing: 1,
        }}>
          Real-Time Analytics
        </span>
      </div>

      <div style={{
        position: "absolute", left: 100, bottom: 180,
        opacity: callout2Opacity, transform: `translateY(${callout2Y}px)`,
        background: `linear-gradient(135deg, ${COLORS.sienna}, ${COLORS.espresso})`,
        borderRadius: 12, padding: "12px 24px",
        border: `1px solid ${COLORS.gold}40`,
        display: "flex", alignItems: "center", gap: 10,
        boxShadow: `0 8px 30px ${COLORS.dark}80`,
      }}>
        <span style={{ fontSize: 22 }}>🎯</span>
        <span style={{
          fontFamily: FONTS.body, fontSize: 16, fontWeight: 700,
          color: COLORS.cream, textTransform: "uppercase", letterSpacing: 1,
        }}>
          Menu Optimization
        </span>
      </div>
    </AbsoluteFill>
  );
};
