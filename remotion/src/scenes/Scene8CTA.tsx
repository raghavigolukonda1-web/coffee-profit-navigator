import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { FONTS, COLORS } from "../constants";

export const Scene8CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const gradAngle = 135 + Math.sin(frame * 0.01) * 15;

  // Promo code reveal
  const promoOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const promoScale = spring({ frame: frame - 5, fps, config: { damping: 12 } });

  const discountOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const discountScale = spring({ frame: frame - 20, fps, config: { damping: 8, stiffness: 80 } });

  const codeOpacity = interpolate(frame, [50, 70], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const codeY = interpolate(spring({ frame: frame - 50, fps, config: { damping: 18 } }), [0, 1], [30, 0]);

  // Transition to brand closing
  const promoFadeOut = interpolate(frame, [130, 155], [1, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const closingOpacity = interpolate(frame, [155, 180], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  const logoScale = spring({ frame: frame - 160, fps, config: { damping: 12, stiffness: 100 } });
  const lineW = interpolate(spring({ frame: frame - 185, fps, config: { damping: 200 } }), [0, 1], [0, 350]);
  const tagOpacity = interpolate(frame, [190, 210], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const urlOpacity = interpolate(frame, [215, 235], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  const fadeOut = interpolate(frame, [255, 290], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  const glowScale = 1 + Math.sin(frame * 0.05) * 0.06;

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(${gradAngle}deg, ${COLORS.dark} 0%, ${COLORS.espresso} 45%, ${COLORS.dark} 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        position: "absolute", width: 1000, height: 1000, borderRadius: "50%",
        background: `radial-gradient(circle, ${COLORS.gold}15, transparent 70%)`,
        transform: `scale(${glowScale})`,
      }} />

      {/* Phase 1: Promo (0-130) */}
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", opacity: promoFadeOut, zIndex: 2,
      }}>
        <div style={{
          fontFamily: FONTS.body, fontSize: 18, fontWeight: 700, color: COLORS.gold,
          opacity: promoOpacity, transform: `scale(${promoScale})`,
          textTransform: "uppercase", letterSpacing: 6, marginBottom: 24,
        }}>
          Limited Time Offer
        </div>

        <div style={{
          fontFamily: FONTS.display, fontSize: 160, fontWeight: 900, color: COLORS.cream,
          opacity: discountOpacity, transform: `scale(${discountScale})`,
          lineHeight: 0.9, textShadow: `0 0 80px ${COLORS.gold}30`,
        }}>
          30<span style={{ fontSize: 80, color: COLORS.gold }}>%</span>
        </div>

        <div style={{
          fontFamily: FONTS.display, fontSize: 40, fontWeight: 700, color: COLORS.cream,
          opacity: discountOpacity, marginTop: 10,
        }}>
          OFF YOUR FIRST SHIPMENT
        </div>

        <div style={{
          marginTop: 40, opacity: codeOpacity, transform: `translateY(${codeY}px)`,
          background: `${COLORS.gold}20`, border: `2px dashed ${COLORS.gold}`,
          borderRadius: 16, padding: "18px 50px",
        }}>
          <span style={{
            fontFamily: FONTS.body, fontSize: 14, fontWeight: 700, color: COLORS.goldLight,
            letterSpacing: 4, textTransform: "uppercase",
          }}>
            Use Code
          </span>
          <div style={{
            fontFamily: FONTS.body, fontSize: 40, fontWeight: 900, color: COLORS.gold,
            letterSpacing: 8, marginTop: 4,
          }}>
            NEWSUB30
          </div>
        </div>
      </div>

      {/* Phase 2: Brand closing (155+) */}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        zIndex: 1, opacity: closingOpacity,
      }}>
        <div style={{
          width: 90, height: 90, borderRadius: "50%",
          background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 24, transform: `scale(${logoScale})`,
          boxShadow: `0 0 60px ${COLORS.gold}40`,
        }}>
          <span style={{ fontFamily: FONTS.display, fontSize: 50, fontWeight: 900, color: COLORS.dark }}>P</span>
        </div>

        <div style={{
          fontFamily: FONTS.display, fontSize: 76, fontWeight: 900, color: COLORS.cream,
          transform: `scale(${logoScale})`, letterSpacing: -2,
          textShadow: `0 4px 50px ${COLORS.dark}`,
        }}>
          Peet's Coffee
        </div>

        <div style={{
          width: lineW, height: 3,
          background: `linear-gradient(90deg, transparent, ${COLORS.gold}, transparent)`,
          margin: "20px 0",
        }} />

        <div style={{
          fontFamily: FONTS.body, fontSize: 24, fontWeight: 300, color: COLORS.goldLight,
          opacity: tagOpacity, letterSpacing: 8, textTransform: "uppercase",
        }}>
          Subscribe & Savor
        </div>

        <div style={{
          fontFamily: FONTS.body, fontSize: 20, color: COLORS.gold,
          opacity: urlOpacity, marginTop: 30, letterSpacing: 3,
        }}>
          peets.com/subscriptions
        </div>
      </div>

      {/* Fade to black */}
      <AbsoluteFill style={{ backgroundColor: "#000", opacity: fadeOut, zIndex: 10 }} />
    </AbsoluteFill>
  );
};
