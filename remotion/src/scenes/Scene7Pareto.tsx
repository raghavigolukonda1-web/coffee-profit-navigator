import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { FONTS, COLORS } from "../constants";

export const Scene7Pareto: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Big percentage reveal
  const bigNumScale = spring({ frame: frame - 25, fps, config: { damping: 8, stiffness: 80 } });
  const bigNumOpacity = interpolate(frame, [25, 45], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Supporting text stagger
  const line1Opacity = interpolate(frame, [55, 72], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const line1Y = interpolate(spring({ frame: frame - 55, fps, config: { damping: 20 } }), [0, 1], [30, 0]);

  const line2Opacity = interpolate(frame, [80, 97], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const line2Y = interpolate(spring({ frame: frame - 80, fps, config: { damping: 20 } }), [0, 1], [30, 0]);

  // Pareto bar visualization
  const barsVisible = interpolate(frame, [100, 120], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Glow pulse
  const glowScale = 1 + Math.sin(frame * 0.06) * 0.06;

  // Recommendation text
  const recOpacity = interpolate(frame, [160, 180], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  const paretoProducts = [
    { name: "Classic Latte", pct: 13.5 },
    { name: "Caramel Latte", pct: 10.9 },
    { name: "Nitro Cold Brew", pct: 10.6 },
    { name: "Vanilla Latte", pct: 8.8 },
    { name: "Matcha Latte", pct: 8.7 },
    { name: "Others (13)", pct: 47.5 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(140deg, ${COLORS.dark} 0%, ${COLORS.espresso} 100%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      {/* Radial glow */}
      <div style={{
        position: "absolute", width: 800, height: 800, borderRadius: "50%",
        background: `radial-gradient(circle, ${COLORS.gold}20, transparent 70%)`,
        transform: `scale(${glowScale})`,
      }} />

      <div style={{ display: "flex", gap: 100, alignItems: "center", zIndex: 1, padding: "0 100px" }}>
        {/* Left: Big stat */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{
            fontFamily: FONTS.body, fontSize: 18, fontWeight: 600, color: COLORS.gold,
            opacity: headerOpacity, textTransform: "uppercase", letterSpacing: 5, marginBottom: 20,
          }}>
            Pareto Analysis
          </div>

          <div style={{
            fontFamily: FONTS.display, fontSize: 200, fontWeight: 900, color: COLORS.cream,
            opacity: bigNumOpacity, transform: `scale(${bigNumScale})`,
            lineHeight: 0.9, textShadow: `0 0 100px ${COLORS.gold}30`,
          }}>
            80<span style={{ fontSize: 100, color: COLORS.gold }}>%</span>
          </div>

          <div style={{
            fontFamily: FONTS.body, fontSize: 28, fontWeight: 600, color: COLORS.latte,
            opacity: line1Opacity, transform: `translateY(${line1Y}px)`,
            textAlign: "center", marginTop: 16, lineHeight: 1.4,
          }}>
            of revenue from just{" "}
            <span style={{ color: COLORS.gold, fontWeight: 700, fontSize: 32 }}>5 products</span>
          </div>

          <div style={{
            fontFamily: FONTS.body, fontSize: 20, color: COLORS.latte,
            opacity: line2Opacity, transform: `translateY(${line2Y}px)`,
            textAlign: "center", marginTop: 10,
          }}>
            out of 18 total SKUs on the menu
          </div>
        </div>

        {/* Right: Mini bar chart */}
        <div style={{ flex: 1, opacity: barsVisible }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {paretoProducts.map((p, i) => {
              const barDelay = 100 + i * 8;
              const barW = interpolate(
                spring({ frame: frame - barDelay, fps, config: { damping: 25, stiffness: 70 } }),
                [0, 1], [0, p.pct * 2]
              );
              const isTop5 = i < 5;

              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    fontFamily: FONTS.body, fontSize: 14, color: COLORS.latte,
                    width: 140, textAlign: "right", whiteSpace: "nowrap",
                    opacity: isTop5 ? 1 : 0.5,
                  }}>
                    {p.name}
                  </div>
                  <div style={{
                    height: 28, width: `${barW}%`, minWidth: 4,
                    background: isTop5
                      ? `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.sienna})`
                      : `${COLORS.latte}30`,
                    borderRadius: 6,
                  }} />
                  <div style={{
                    fontFamily: FONTS.body, fontSize: 14, fontWeight: 700,
                    color: isTop5 ? COLORS.gold : COLORS.latte,
                  }}>
                    {p.pct}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom recommendation */}
      <div style={{
        position: "absolute", bottom: 60, left: 0, right: 0,
        display: "flex", justifyContent: "center",
        opacity: recOpacity,
      }}>
        <div style={{
          background: `${COLORS.gold}15`, border: `1px solid ${COLORS.gold}30`,
          borderRadius: 14, padding: "14px 36px",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <span style={{ fontSize: 22 }}>💡</span>
          <span style={{
            fontFamily: FONTS.body, fontSize: 18, color: COLORS.cream,
          }}>
            Recommendation: Focus marketing on top 5 and evaluate bottom 13 for menu simplification
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
