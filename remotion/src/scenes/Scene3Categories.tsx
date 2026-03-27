import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { FONTS, COLORS } from "../MainVideo";

const categories = [
  { name: "Coffee", share: 68, color: COLORS.sienna },
  { name: "Tea", share: 20, color: COLORS.gold },
  { name: "Chocolate", share: 12, color: COLORS.latte },
];

export const Scene3Categories: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(200deg, ${COLORS.dark} 0%, ${COLORS.espresso} 60%, ${COLORS.dark} 100%)`,
        padding: 80,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
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
        Category Revenue Split
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
        Revenue by Category
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
        {categories.map((cat, i) => {
          const delay = 15 + i * 15;
          const barProgress = interpolate(
            spring({ frame: frame - delay, fps, config: { damping: 25, stiffness: 80 } }),
            [0, 1],
            [0, cat.share]
          );
          const labelOpacity = interpolate(frame, [delay, delay + 12], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 30 }}>
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 32,
                  fontWeight: 700,
                  color: COLORS.cream,
                  width: 180,
                  opacity: labelOpacity,
                  textAlign: "right",
                }}
              >
                {cat.name}
              </div>
              <div
                style={{
                  flex: 1,
                  height: 60,
                  background: `${COLORS.espresso}60`,
                  borderRadius: 12,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: `${barProgress}%`,
                    height: "100%",
                    background: `linear-gradient(90deg, ${cat.color}, ${cat.color}CC)`,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingRight: 20,
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: 24,
                      fontWeight: 700,
                      color: COLORS.dark,
                      opacity: barProgress > 5 ? 1 : 0,
                    }}
                  >
                    {Math.round(barProgress)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
