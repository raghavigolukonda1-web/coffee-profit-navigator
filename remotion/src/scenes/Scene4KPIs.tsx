import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { FONTS, COLORS } from "../constants";

const kpis = [
  { label: "Total Revenue", value: "$39,955", sub: "4,200 transactions", icon: "💰", accent: COLORS.gold },
  { label: "Units Sold", value: "8,383", sub: "18 SKUs", icon: "📦", accent: COLORS.sienna },
  { label: "Top Category", value: "Coffee", sub: "72.4% of revenue", icon: "☕", accent: COLORS.gold },
  { label: "Revenue per SKU", value: "$2,220", sub: "Avg efficiency", icon: "📊", accent: COLORS.sienna },
];

export const Scene4KPIs: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${COLORS.espresso} 0%, ${COLORS.dark} 100%)`,
        padding: "70px 90px",
        display: "flex", flexDirection: "column", justifyContent: "center",
      }}
    >
      <div style={{
        fontFamily: FONTS.body, fontSize: 18, fontWeight: 600, color: COLORS.gold,
        opacity: headerOpacity, textTransform: "uppercase", letterSpacing: 5, marginBottom: 10,
      }}>
        Key Performance Indicators
      </div>
      <div style={{
        fontFamily: FONTS.display, fontSize: 54, fontWeight: 700, color: COLORS.cream,
        opacity: headerOpacity, marginBottom: 50, lineHeight: 1.1,
      }}>
        Performance at a Glance
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}>
        {kpis.map((kpi, i) => {
          const delay = 20 + i * 15;
          const cardScale = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 100 } });
          const cardOpacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

          // Counter effect
          const numProgress = interpolate(frame, [delay + 8, delay + 45], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
          const subOpacity = interpolate(frame, [delay + 30, delay + 45], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

          return (
            <div key={i} style={{
              background: `linear-gradient(145deg, ${COLORS.sienna}20, ${COLORS.espresso}90)`,
              borderRadius: 20, padding: "36px 40px",
              opacity: cardOpacity, transform: `scale(${cardScale})`,
              border: `1px solid ${kpi.accent}25`,
              display: "flex", alignItems: "center", gap: 28,
            }}>
              <div style={{
                fontSize: 50, width: 80, height: 80,
                background: `${kpi.accent}15`, borderRadius: 18,
                display: "flex", alignItems: "center", justifyContent: "center",
                border: `1px solid ${kpi.accent}20`,
              }}>
                {kpi.icon}
              </div>
              <div>
                <div style={{
                  fontFamily: FONTS.body, fontSize: 15, fontWeight: 600,
                  color: COLORS.gold, textTransform: "uppercase", letterSpacing: 3, marginBottom: 6,
                }}>
                  {kpi.label}
                </div>
                <div style={{
                  fontFamily: FONTS.display, fontSize: 48, fontWeight: 700,
                  color: COLORS.cream, lineHeight: 1, opacity: numProgress,
                }}>
                  {kpi.value}
                </div>
                <div style={{
                  fontFamily: FONTS.body, fontSize: 16, color: COLORS.latte,
                  marginTop: 6, opacity: subOpacity,
                }}>
                  {kpi.sub}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
