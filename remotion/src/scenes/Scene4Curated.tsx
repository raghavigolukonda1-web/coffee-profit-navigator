import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { FONTS, COLORS } from "../constants";

const subscriptions = [
  { name: "Small Batch Series", price: "$24.95/lb", desc: "Rare & exclusive micro-lot coffees", tag: "MOST POPULAR" },
  { name: "Dark Roast Series", price: "$21.95/lb", desc: "Rich, complex & chocolatey", tag: "CLASSIC" },
  { name: "Seasonal Essentials", price: "$21.95/lb", desc: "Rotating seasonal selections", tag: "NEW" },
  { name: "Medium Roast Series", price: "$20.95/lb", desc: "Smooth, balanced & aromatic", tag: "VERSATILE" },
];

export const Scene4Curated: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(180deg, ${COLORS.dark} 0%, #1a140e 100%)`,
      padding: "60px 90px", display: "flex", flexDirection: "column", justifyContent: "center",
    }}>
      <div style={{
        fontFamily: FONTS.body, fontSize: 18, fontWeight: 700, color: COLORS.gold,
        opacity: headerOpacity, textTransform: "uppercase", letterSpacing: 6, marginBottom: 10,
      }}>
        Curated Subscriptions
      </div>
      <div style={{
        fontFamily: FONTS.display, fontSize: 52, fontWeight: 700, color: COLORS.cream,
        opacity: headerOpacity, marginBottom: 50, lineHeight: 1.1,
      }}>
        Discover Something New{"\n"}
        <span style={{ color: COLORS.gold }}>Each Month</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {subscriptions.map((sub, i) => {
          const delay = 20 + i * 15;
          const cardX = interpolate(
            spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 100 } }),
            [0, 1], [i % 2 === 0 ? -80 : 80, 0]
          );
          const cardOpacity = interpolate(frame, [delay, delay + 18], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

          return (
            <div key={i} style={{
              background: `linear-gradient(145deg, ${COLORS.espresso}90, ${COLORS.darkBrown}60)`,
              borderRadius: 18, padding: "32px 36px",
              opacity: cardOpacity, transform: `translateX(${cardX}px)`,
              border: `1px solid ${COLORS.gold}20`,
              display: "flex", flexDirection: "column", gap: 12,
              position: "relative", overflow: "hidden",
            }}>
              {/* Tag */}
              <div style={{
                position: "absolute", top: 0, right: 0,
                background: COLORS.gold, padding: "6px 18px",
                borderRadius: "0 18px 0 12px",
              }}>
                <span style={{
                  fontFamily: FONTS.body, fontSize: 11, fontWeight: 900,
                  color: COLORS.dark, letterSpacing: 2,
                }}>
                  {sub.tag}
                </span>
              </div>

              <div style={{
                fontFamily: FONTS.display, fontSize: 30, fontWeight: 700, color: COLORS.cream,
              }}>
                {sub.name}
              </div>
              <div style={{
                fontFamily: FONTS.body, fontSize: 16, fontWeight: 300, color: COLORS.goldLight,
              }}>
                {sub.desc}
              </div>
              <div style={{
                fontFamily: FONTS.display, fontSize: 28, fontWeight: 900, color: COLORS.gold,
                marginTop: 8,
              }}>
                {sub.price}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
