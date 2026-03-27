import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { FONTS, COLORS } from "../constants";

const steps = [
  { num: "1", title: "CHOOSE", desc: "Curated Subscriptions or build your own with customer-favorite coffees", icon: "☕" },
  { num: "2", title: "CUSTOMIZE", desc: "How much, how often, and which grind is right for you", icon: "⚙️" },
  { num: "3", title: "ENJOY", desc: "Hand roasted and delivered directly to you. Cancel anytime.", icon: "📦" },
];

export const Scene3HowItWorks: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(165deg, ${COLORS.dark} 0%, ${COLORS.espresso} 100%)`,
      padding: "80px 100px", display: "flex", flexDirection: "column", justifyContent: "center",
    }}>
      <div style={{
        fontFamily: FONTS.body, fontSize: 18, fontWeight: 700, color: COLORS.gold,
        opacity: headerOpacity, textTransform: "uppercase", letterSpacing: 6, marginBottom: 10,
      }}>
        How It Works
      </div>
      <div style={{
        fontFamily: FONTS.display, fontSize: 56, fontWeight: 700, color: COLORS.cream,
        opacity: headerOpacity, marginBottom: 70, lineHeight: 1.1,
      }}>
        Three Simple Steps
      </div>

      <div style={{ display: "flex", gap: 50 }}>
        {steps.map((step, i) => {
          const delay = 25 + i * 30;
          const cardScale = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 100 } });
          const cardOpacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

          // Connecting line
          const lineProgress = interpolate(
            spring({ frame: frame - (delay + 15), fps, config: { damping: 200 } }),
            [0, 1], [0, 100]
          );

          return (
            <React.Fragment key={i}>
              <div style={{
                flex: 1, opacity: cardOpacity, transform: `scale(${cardScale})`,
                display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
              }}>
                {/* Number circle */}
                <div style={{
                  width: 90, height: 90, borderRadius: "50%",
                  background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 24, boxShadow: `0 0 50px ${COLORS.gold}30`,
                }}>
                  <span style={{
                    fontFamily: FONTS.display, fontSize: 40, fontWeight: 900, color: COLORS.dark,
                  }}>
                    {step.num}
                  </span>
                </div>

                <div style={{ fontSize: 40, marginBottom: 16 }}>{step.icon}</div>

                <div style={{
                  fontFamily: FONTS.body, fontSize: 28, fontWeight: 900, color: COLORS.cream,
                  letterSpacing: 4, marginBottom: 16,
                }}>
                  {step.title}
                </div>

                <div style={{
                  fontFamily: FONTS.body, fontSize: 18, fontWeight: 300, color: COLORS.goldLight,
                  lineHeight: 1.6, maxWidth: 350,
                }}>
                  {step.desc}
                </div>
              </div>

              {/* Connector line */}
              {i < 2 && (
                <div style={{
                  width: 80, display: "flex", alignItems: "center", justifyContent: "center",
                  paddingBottom: 100,
                }}>
                  <div style={{
                    width: `${lineProgress}%`, height: 2,
                    background: `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.gold}40)`,
                  }} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
