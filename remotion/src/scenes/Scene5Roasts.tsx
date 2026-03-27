import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { FONTS, COLORS } from "../constants";

const roasts = [
  { name: "Dark Roasts", highlight: "Major Dickason's™", price: "$21.95/lb", notes: "Smoky · Chocolatey · Complex", rating: "4.7/5", color: "#2C1810" },
  { name: "Medium Roasts", highlight: "Off The Grid™", price: "$20.95/lb", notes: "Smooth · Aromatic · Balanced", rating: "4.6/5", color: "#6B4226" },
  { name: "Light Roasts", highlight: "Sun Catcher™", price: "$20.95/lb", notes: "Floral · Citrus · Sweet", rating: "4.5/5", color: "#8B6914" },
];

export const Scene5Roasts: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(200deg, ${COLORS.dark} 0%, ${COLORS.espresso} 50%, ${COLORS.dark} 100%)`,
      padding: "60px 100px", display: "flex", flexDirection: "column", justifyContent: "center",
    }}>
      <div style={{
        fontFamily: FONTS.body, fontSize: 18, fontWeight: 700, color: COLORS.gold,
        opacity: headerOpacity, textTransform: "uppercase", letterSpacing: 6, marginBottom: 10,
      }}>
        Our Roasts
      </div>
      <div style={{
        fontFamily: FONTS.display, fontSize: 52, fontWeight: 700, color: COLORS.cream,
        opacity: headerOpacity, marginBottom: 50, lineHeight: 1.1,
      }}>
        From Dark to Light,{" "}
        <span style={{ color: COLORS.gold }}>Perfection</span> in Every Cup
      </div>

      <div style={{ display: "flex", gap: 36 }}>
        {roasts.map((roast, i) => {
          const delay = 20 + i * 25;
          const cardScale = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 90 } });
          const cardOpacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
          const detailOpacity = interpolate(frame, [delay + 25, delay + 40], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

          return (
            <div key={i} style={{
              flex: 1, opacity: cardOpacity, transform: `scale(${cardScale})`,
              borderRadius: 20, overflow: "hidden",
              background: `linear-gradient(180deg, ${roast.color}90, ${COLORS.dark})`,
              border: `1px solid ${COLORS.gold}15`,
            }}>
              {/* Roast level indicator */}
              <div style={{
                height: 6,
                background: `linear-gradient(90deg, ${COLORS.gold}, ${roast.color})`,
              }} />

              <div style={{ padding: "36px 32px" }}>
                <div style={{
                  fontFamily: FONTS.body, fontSize: 14, fontWeight: 900, color: COLORS.gold,
                  textTransform: "uppercase", letterSpacing: 4, marginBottom: 12,
                }}>
                  {roast.name}
                </div>

                <div style={{
                  fontFamily: FONTS.display, fontSize: 34, fontWeight: 700, color: COLORS.cream,
                  marginBottom: 16, lineHeight: 1.2,
                }}>
                  {roast.highlight}
                </div>

                <div style={{
                  fontFamily: FONTS.body, fontSize: 16, fontWeight: 300, color: COLORS.goldLight,
                  marginBottom: 20, opacity: detailOpacity,
                }}>
                  {roast.notes}
                </div>

                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  opacity: detailOpacity,
                }}>
                  <div style={{
                    fontFamily: FONTS.display, fontSize: 26, fontWeight: 900, color: COLORS.gold,
                  }}>
                    {roast.price}
                  </div>
                  <div style={{
                    fontFamily: FONTS.body, fontSize: 14, color: COLORS.goldLight,
                    display: "flex", alignItems: "center", gap: 4,
                  }}>
                    ⭐ {roast.rating}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
