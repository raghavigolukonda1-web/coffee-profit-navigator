import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { FONTS, COLORS } from "../constants";

const benefits = [
  { icon: "🚚", title: "Free Shipping", desc: "Always included with every subscription" },
  { icon: "💰", title: "Save Up to 10%", desc: "5% on orders over $29 · 10% over $49" },
  { icon: "🔒", title: "Exclusive Access", desc: "Subscriber-only coffees & limited roasts" },
  { icon: "📅", title: "New Coffee Monthly", desc: "Curated series features a different coffee each month" },
  { icon: "🏠", title: "Delivered to Your Door", desc: "Reschedule or cancel anytime" },
];

export const Scene6WhySubscribe: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(155deg, ${COLORS.dark} 0%, ${COLORS.espresso} 100%)`,
      padding: "50px 100px", display: "flex", flexDirection: "column", justifyContent: "center",
    }}>
      <div style={{
        fontFamily: FONTS.body, fontSize: 18, fontWeight: 700, color: COLORS.gold,
        opacity: headerOpacity, textTransform: "uppercase", letterSpacing: 6, marginBottom: 10,
      }}>
        Why Subscribe?
      </div>
      <div style={{
        fontFamily: FONTS.display, fontSize: 52, fontWeight: 700, color: COLORS.cream,
        opacity: headerOpacity, marginBottom: 50, lineHeight: 1.1,
      }}>
        Benefits That{" "}
        <span style={{ color: COLORS.gold }}>Keep Giving</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {benefits.map((b, i) => {
          const delay = 15 + i * 18;
          const itemOpacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
          const itemX = interpolate(
            spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 100 } }),
            [0, 1], [-60, 0]
          );

          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 24,
              opacity: itemOpacity, transform: `translateX(${itemX}px)`,
              background: `${COLORS.espresso}50`, borderRadius: 16, padding: "20px 28px",
              border: `1px solid ${COLORS.gold}10`,
            }}>
              <div style={{
                fontSize: 36, width: 64, height: 64,
                background: `${COLORS.gold}15`, borderRadius: 16,
                display: "flex", alignItems: "center", justifyContent: "center",
                border: `1px solid ${COLORS.gold}20`, flexShrink: 0,
              }}>
                {b.icon}
              </div>
              <div>
                <div style={{
                  fontFamily: FONTS.body, fontSize: 22, fontWeight: 900, color: COLORS.cream,
                  marginBottom: 4,
                }}>
                  {b.title}
                </div>
                <div style={{
                  fontFamily: FONTS.body, fontSize: 16, fontWeight: 300, color: COLORS.goldLight,
                }}>
                  {b.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
