import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { FONTS, COLORS } from "../constants";

const kpis = [
  { label: "Total Revenue", value: "$87,432", icon: "💰" },
  { label: "Units Sold", value: "8,247", icon: "📦" },
  { label: "Top Category", value: "Coffee", icon: "☕" },
  { label: "Revenue/SKU", value: "$4,857", icon: "📊" },
];

export const Scene2KPIs: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${COLORS.espresso} 0%, ${COLORS.dark} 100%)`,
        padding: 80,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Section header */}
      <div
        style={{
          fontFamily: FONTS.body,
          fontSize: 20,
          fontWeight: 600,
          color: COLORS.gold,
          opacity: headerOpacity,
          textTransform: "uppercase",
          letterSpacing: 4,
          marginBottom: 10,
        }}
      >
        Key Performance Indicators
      </div>
      <div
        style={{
          fontFamily: FONTS.display,
          fontSize: 52,
          fontWeight: 700,
          color: COLORS.cream,
          opacity: headerOpacity,
          marginBottom: 60,
        }}
      >
        At a Glance
      </div>

      {/* KPI Cards */}
      <div style={{ display: "flex", gap: 40 }}>
        {kpis.map((kpi, i) => {
          const delay = 15 + i * 12;
          const cardScale = spring({ frame: frame - delay, fps, config: { damping: 15, stiffness: 120 } });
          const cardOpacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

          // Counter animation for values
          const counterProgress = interpolate(frame, [delay + 10, delay + 40], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

          return (
            <div
              key={i}
              style={{
                flex: 1,
                background: `linear-gradient(145deg, ${COLORS.sienna}30, ${COLORS.espresso}80)`,
                borderRadius: 20,
                padding: "40px 30px",
                opacity: cardOpacity,
                transform: `scale(${cardScale})`,
                border: `1px solid ${COLORS.gold}30`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 16 }}>{kpi.icon}</div>
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 44,
                  fontWeight: 700,
                  color: COLORS.cream,
                  marginBottom: 8,
                  opacity: counterProgress,
                }}
              >
                {kpi.value}
              </div>
              <div
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 18,
                  color: COLORS.latte,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                }}
              >
                {kpi.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
