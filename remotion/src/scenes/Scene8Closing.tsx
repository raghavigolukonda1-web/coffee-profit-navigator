import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { FONTS, COLORS } from "../constants";

const insights = [
  "Optimize menu around top 5 revenue drivers",
  "Evaluate 13 long-tail products for consolidation",
  "Reduce Coffee category dependency risk",
];

export const Scene8Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const gradAngle = 135 + Math.sin(frame * 0.012) * 15;

  // Insights reveal
  const insightsHeaderOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Logo & brand
  const logoDelay = 120;
  const logoScale = spring({ frame: frame - logoDelay, fps, config: { damping: 12, stiffness: 100 } });
  const logoOpacity = interpolate(frame, [logoDelay, logoDelay + 20], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  const lineW = interpolate(
    spring({ frame: frame - (logoDelay + 25), fps, config: { damping: 200 } }),
    [0, 1], [0, 400]
  );

  const tagOpacity = interpolate(frame, [logoDelay + 30, logoDelay + 50], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const tagY = interpolate(
    spring({ frame: frame - (logoDelay + 30), fps, config: { damping: 20 } }),
    [0, 1], [25, 0]
  );

  // Fade to black at end
  const fadeOut = interpolate(frame, [240, 280], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Phase: insights (0-120) vs closing (120+)
  const insightsVisible = interpolate(frame, [0, 1], [1, 1]); // always 1 initially
  const insightsFadeOut = interpolate(frame, [100, 120], [1, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${gradAngle}deg, ${COLORS.dark} 0%, ${COLORS.espresso} 45%, ${COLORS.dark} 100%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      {/* Radial glow */}
      <div style={{
        position: "absolute", width: 1100, height: 1100, borderRadius: "50%",
        background: `radial-gradient(circle, ${COLORS.gold}12, transparent 70%)`,
      }} />

      {/* Phase 1: Key Insights (frame 0-120) */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        opacity: insightsFadeOut, zIndex: 2,
      }}>
        <div style={{
          fontFamily: FONTS.body, fontSize: 18, fontWeight: 600, color: COLORS.gold,
          opacity: insightsHeaderOpacity, textTransform: "uppercase",
          letterSpacing: 5, marginBottom: 12,
        }}>
          Key Takeaways
        </div>
        <div style={{
          fontFamily: FONTS.display, fontSize: 50, fontWeight: 700, color: COLORS.cream,
          opacity: insightsHeaderOpacity, marginBottom: 50,
        }}>
          Actionable Insights
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 800 }}>
          {insights.map((text, i) => {
            const delay = 25 + i * 22;
            const itemOpacity = interpolate(frame, [delay, delay + 18], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
            const itemX = interpolate(
              spring({ frame: frame - delay, fps, config: { damping: 18 } }),
              [0, 1], [-50, 0]
            );

            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 20,
                opacity: itemOpacity, transform: `translateX(${itemX}px)`,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: `${COLORS.gold}20`, border: `1px solid ${COLORS.gold}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: FONTS.display, fontSize: 22, fontWeight: 900, color: COLORS.gold,
                }}>
                  {i + 1}
                </div>
                <div style={{
                  fontFamily: FONTS.body, fontSize: 24, color: COLORS.cream, fontWeight: 400,
                }}>
                  {text}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Phase 2: Brand closing (frame 120+) */}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        zIndex: 1, opacity: logoOpacity,
      }}>
        <div style={{
          fontSize: 70, marginBottom: 20,
          transform: `scale(${logoScale})`,
          filter: `drop-shadow(0 0 50px ${COLORS.gold}50)`,
        }}>
          ☕
        </div>

        <div style={{
          fontFamily: FONTS.display, fontSize: 80, fontWeight: 900, color: COLORS.cream,
          transform: `scale(${logoScale})`, letterSpacing: -2,
          textShadow: `0 4px 50px ${COLORS.espresso}`,
        }}>
          Afficionado
        </div>

        <div style={{
          width: lineW, height: 3,
          background: `linear-gradient(90deg, transparent, ${COLORS.gold}, transparent)`,
          margin: "22px 0",
        }} />

        <div style={{
          fontFamily: FONTS.body, fontSize: 26, fontWeight: 600, color: COLORS.latte,
          opacity: tagOpacity, transform: `translateY(${tagY}px)`,
          letterSpacing: 6, textTransform: "uppercase",
        }}>
          Coffee Roasters
        </div>

        <div style={{
          fontFamily: FONTS.body, fontSize: 18, color: COLORS.gold,
          opacity: interpolate(frame, [logoDelay + 50, logoDelay + 70], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
          marginTop: 30, letterSpacing: 3,
        }}>
          Data-Driven Product Intelligence · 2025
        </div>
      </div>

      {/* Fade to black overlay */}
      <AbsoluteFill style={{
        backgroundColor: "#000", opacity: fadeOut, zIndex: 10,
      }} />
    </AbsoluteFill>
  );
};
