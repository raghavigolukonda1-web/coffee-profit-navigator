import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { FONTS, COLORS } from "../constants";

export const Scene7Testimonial: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const gradAngle = 140 + Math.sin(frame * 0.015) * 12;

  const quoteScale = spring({ frame: frame - 10, fps, config: { damping: 15, stiffness: 80 } });
  const quoteOpacity = interpolate(frame, [10, 35], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  const textOpacity = interpolate(frame, [30, 55], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const textY = interpolate(spring({ frame: frame - 30, fps, config: { damping: 20 } }), [0, 1], [40, 0]);

  const attrOpacity = interpolate(frame, [70, 90], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Glow pulse
  const glowScale = 1 + Math.sin(frame * 0.06) * 0.05;

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(${gradAngle}deg, ${COLORS.dark} 0%, ${COLORS.espresso} 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        position: "absolute", width: 800, height: 800, borderRadius: "50%",
        background: `radial-gradient(circle, ${COLORS.gold}15, transparent 70%)`,
        transform: `scale(${glowScale})`,
      }} />

      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        maxWidth: 900, textAlign: "center", zIndex: 1,
      }}>
        {/* Giant quote mark */}
        <div style={{
          fontFamily: FONTS.display, fontSize: 200, color: COLORS.gold,
          opacity: quoteOpacity, transform: `scale(${quoteScale})`,
          lineHeight: 0.6, marginBottom: -20,
        }}>
          "
        </div>

        <div style={{
          fontFamily: FONTS.display, fontSize: 34, fontWeight: 400, color: COLORS.cream,
          opacity: textOpacity, transform: `translateY(${textY}px)`,
          lineHeight: 1.6, fontStyle: "italic",
        }}>
          Peet's coffee is the best. I like the fact that it's roasted just prior to shipping. The fresher the roast, the better the coffee.
        </div>

        <div style={{
          marginTop: 40, display: "flex", alignItems: "center", gap: 12,
          opacity: attrOpacity,
        }}>
          <div style={{
            width: 50, height: 2, background: COLORS.gold,
          }} />
          <div style={{
            fontFamily: FONTS.body, fontSize: 18, fontWeight: 700, color: COLORS.gold,
            textTransform: "uppercase", letterSpacing: 4,
          }}>
            Peet's Subscriber
          </div>
          <div style={{
            width: 50, height: 2, background: COLORS.gold,
          }} />
        </div>

        <div style={{
          fontFamily: FONTS.body, fontSize: 16, color: COLORS.goldLight,
          opacity: attrOpacity, marginTop: 10,
        }}>
          ⭐⭐⭐⭐⭐
        </div>
      </div>
    </AbsoluteFill>
  );
};
