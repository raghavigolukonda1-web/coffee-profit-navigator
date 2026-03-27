import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from "remotion";
import { FONTS, COLORS } from "../constants";

const problems = [
  { icon: "📉", text: "High-volume products with low revenue contribution" },
  { icon: "💸", text: "High-priced products with low sales frequency" },
  { icon: "📋", text: "Overcrowded menus slowing service & confusing customers" },
];

export const Scene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const headerX = interpolate(spring({ frame, fps, config: { damping: 20 } }), [0, 1], [-60, 0]);

  const questionOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const questionY = interpolate(spring({ frame: frame - 20, fps, config: { damping: 20 } }), [0, 1], [30, 0]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${COLORS.dark} 0%, #1a1008 50%, ${COLORS.espresso} 100%)`,
        padding: "80px 120px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Left accent line */}
      <div style={{
        position: "absolute", left: 80, top: "15%", width: 3, height: "70%",
        background: `linear-gradient(180deg, transparent, ${COLORS.gold}40, transparent)`,
      }} />

      <div style={{
        fontFamily: FONTS.body, fontSize: 18, fontWeight: 600, color: COLORS.gold,
        opacity: headerOpacity, transform: `translateX(${headerX}px)`,
        textTransform: "uppercase", letterSpacing: 5, marginBottom: 16, marginLeft: 40,
      }}>
        The Challenge
      </div>

      <div style={{
        fontFamily: FONTS.display, fontSize: 56, fontWeight: 700, color: COLORS.cream,
        opacity: questionOpacity, transform: `translateY(${questionY}px)`,
        lineHeight: 1.2, maxWidth: 900, marginBottom: 50, marginLeft: 40,
      }}>
        Which products truly drive{" "}
        <span style={{ color: COLORS.gold }}>revenue</span>?
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24, marginLeft: 40 }}>
        {problems.map((p, i) => {
          const delay = 50 + i * 25;
          const itemOpacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
          const itemX = interpolate(
            spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 100 } }),
            [0, 1], [-80, 0]
          );

          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 20,
              opacity: itemOpacity, transform: `translateX(${itemX}px)`,
            }}>
              <div style={{
                fontSize: 36, width: 60, height: 60,
                background: `${COLORS.sienna}25`, borderRadius: 14,
                display: "flex", alignItems: "center", justifyContent: "center",
                border: `1px solid ${COLORS.sienna}30`,
              }}>
                {p.icon}
              </div>
              <div style={{
                fontFamily: FONTS.body, fontSize: 24, color: COLORS.latte,
                fontWeight: 400, lineHeight: 1.4,
              }}>
                {p.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom-right accent */}
      <div style={{
        position: "absolute", right: 100, bottom: 80,
        fontFamily: FONTS.display, fontSize: 200, fontWeight: 900,
        color: `${COLORS.sienna}08`, lineHeight: 1,
      }}>
        ?
      </div>
    </AbsoluteFill>
  );
};
