import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { FONTS, COLORS } from "../constants";

const categories = [
  { name: "Coffee", share: 72.4, revenue: "$28,922", color: COLORS.sienna, products: 10 },
  { name: "Tea", share: 17.1, revenue: "$6,832", color: COLORS.gold, products: 5 },
  { name: "Chocolate", share: 10.5, revenue: "$4,201", color: COLORS.latte, products: 3 },
];

export const Scene5Categories: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(200deg, ${COLORS.dark} 0%, ${COLORS.espresso} 60%, ${COLORS.dark} 100%)`,
        padding: "70px 100px",
        display: "flex", flexDirection: "column", justifyContent: "center",
      }}
    >
      <div style={{
        fontFamily: FONTS.body, fontSize: 18, fontWeight: 600, color: COLORS.gold,
        opacity: headerOpacity, textTransform: "uppercase", letterSpacing: 5, marginBottom: 10,
      }}>
        Category Revenue Distribution
      </div>
      <div style={{
        fontFamily: FONTS.display, fontSize: 54, fontWeight: 700, color: COLORS.cream,
        opacity: headerOpacity, marginBottom: 60, lineHeight: 1.1,
      }}>
        Where the Money Flows
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
        {categories.map((cat, i) => {
          const delay = 20 + i * 20;
          const barW = interpolate(
            spring({ frame: frame - delay, fps, config: { damping: 22, stiffness: 60 } }),
            [0, 1], [0, cat.share]
          );
          const labelOpacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
          const detailOpacity = interpolate(frame, [delay + 25, delay + 40], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

          return (
            <div key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, opacity: labelOpacity }}>
                <div style={{
                  fontFamily: FONTS.display, fontSize: 30, fontWeight: 700, color: COLORS.cream,
                }}>
                  {cat.name}
                </div>
                <div style={{
                  fontFamily: FONTS.body, fontSize: 20, color: COLORS.latte, opacity: detailOpacity,
                  display: "flex", gap: 24,
                }}>
                  <span>{cat.revenue}</span>
                  <span style={{ color: COLORS.gold }}>{cat.products} products</span>
                </div>
              </div>
              <div style={{
                height: 50, background: `${COLORS.espresso}60`, borderRadius: 12,
                overflow: "hidden", position: "relative",
              }}>
                <div style={{
                  width: `${barW}%`, height: "100%",
                  background: `linear-gradient(90deg, ${cat.color}CC, ${cat.color})`,
                  borderRadius: 12,
                  display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 16,
                }}>
                  <span style={{
                    fontFamily: FONTS.body, fontSize: 22, fontWeight: 700,
                    color: COLORS.dark, opacity: barW > 8 ? 1 : 0,
                  }}>
                    {Math.round(barW * 10) / 10}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Insight callout */}
      <div style={{
        marginTop: 50, display: "flex", alignItems: "center", gap: 12,
        opacity: interpolate(frame, [100, 120], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
      }}>
        <div style={{
          width: 4, height: 40, background: COLORS.gold, borderRadius: 2,
        }} />
        <div style={{
          fontFamily: FONTS.body, fontSize: 20, color: COLORS.latte, fontStyle: "italic",
        }}>
          Coffee drives <span style={{ color: COLORS.gold, fontWeight: 700 }}>72%</span> of total revenue — a significant category dependency
        </div>
      </div>
    </AbsoluteFill>
  );
};
