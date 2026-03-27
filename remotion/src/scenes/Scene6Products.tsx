import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { FONTS, COLORS } from "../constants";

const topProducts = [
  { rank: 1, name: "Classic Latte", type: "Latte", revenue: "$5,375", share: "13.5%", qty: "1,087" },
  { rank: 2, name: "Caramel Latte", type: "Latte", revenue: "$4,370", share: "10.9%", qty: "770" },
  { rank: 3, name: "Nitro Cold Brew", type: "Cold Brew", revenue: "$4,226", share: "10.6%", qty: "817" },
  { rank: 4, name: "Vanilla Latte", type: "Latte", revenue: "$3,520", share: "8.8%", qty: "749" },
  { rank: 5, name: "Matcha Latte", type: "Green Tea", revenue: "$3,465", share: "8.7%", qty: "630" },
];

export const Scene6Products: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(155deg, ${COLORS.dark} 0%, #1a0e06 100%)`,
        padding: "60px 100px",
        display: "flex", flexDirection: "column", justifyContent: "center",
      }}
    >
      <div style={{
        fontFamily: FONTS.body, fontSize: 18, fontWeight: 600, color: COLORS.gold,
        opacity: headerOpacity, textTransform: "uppercase", letterSpacing: 5, marginBottom: 10,
      }}>
        Product Rankings
      </div>
      <div style={{
        fontFamily: FONTS.display, fontSize: 54, fontWeight: 700, color: COLORS.cream,
        opacity: headerOpacity, marginBottom: 40, lineHeight: 1.1,
      }}>
        Top 5 Revenue Drivers
      </div>

      {/* Table header */}
      <div style={{
        display: "grid", gridTemplateColumns: "60px 1fr 150px 150px 130px 100px",
        gap: 0, padding: "12px 24px", marginBottom: 8,
        opacity: interpolate(frame, [15, 30], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
      }}>
        {["#", "Product", "Type", "Revenue", "Share", "Units"].map((h) => (
          <div key={h} style={{
            fontFamily: FONTS.body, fontSize: 14, fontWeight: 700,
            color: COLORS.gold, textTransform: "uppercase", letterSpacing: 2,
          }}>
            {h}
          </div>
        ))}
      </div>

      {/* Rows */}
      {topProducts.map((p, i) => {
        const delay = 25 + i * 18;
        const rowOpacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
        const rowX = interpolate(
          spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 100 } }),
          [0, 1], [60, 0]
        );

        return (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "60px 1fr 150px 150px 130px 100px",
            gap: 0, padding: "18px 24px",
            background: i % 2 === 0 ? `${COLORS.sienna}10` : "transparent",
            borderRadius: 12, marginBottom: 4,
            opacity: rowOpacity, transform: `translateX(${rowX}px)`,
            borderLeft: i === 0 ? `3px solid ${COLORS.gold}` : "3px solid transparent",
          }}>
            <div style={{
              fontFamily: FONTS.display, fontSize: 28, fontWeight: 900,
              color: i === 0 ? COLORS.gold : COLORS.cream,
            }}>
              {p.rank}
            </div>
            <div style={{
              fontFamily: FONTS.body, fontSize: 22, fontWeight: 600, color: COLORS.cream,
            }}>
              {p.name}
            </div>
            <div style={{
              fontFamily: FONTS.body, fontSize: 18, color: COLORS.latte,
            }}>
              {p.type}
            </div>
            <div style={{
              fontFamily: FONTS.display, fontSize: 22, fontWeight: 700, color: COLORS.cream,
            }}>
              {p.revenue}
            </div>
            <div style={{
              fontFamily: FONTS.body, fontSize: 20, fontWeight: 700, color: COLORS.gold,
            }}>
              {p.share}
            </div>
            <div style={{
              fontFamily: FONTS.body, fontSize: 18, color: COLORS.latte,
            }}>
              {p.qty}
            </div>
          </div>
        );
      })}

      {/* Bottom insight */}
      <div style={{
        marginTop: 30, display: "flex", alignItems: "center", gap: 12,
        opacity: interpolate(frame, [130, 150], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
      }}>
        <div style={{ width: 4, height: 36, background: COLORS.gold, borderRadius: 2 }} />
        <div style={{
          fontFamily: FONTS.body, fontSize: 18, color: COLORS.latte, fontStyle: "italic",
        }}>
          Lattes dominate — 3 of the top 5 are latte variants
        </div>
      </div>
    </AbsoluteFill>
  );
};
