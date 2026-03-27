import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { FONTS, COLORS } from "../constants";

export const Scene1Brand: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const gradAngle = 135 + Math.sin(frame * 0.012) * 10;

  const logoScale = spring({ frame: frame - 10, fps, config: { damping: 10, stiffness: 100 } });
  const logoRotate = interpolate(spring({ frame: frame - 10, fps, config: { damping: 14 } }), [0, 1], [-20, 0]);

  const titleClip = interpolate(frame, [30, 65], [100, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const titleOpacity = interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  const lineW = interpolate(spring({ frame: frame - 60, fps, config: { damping: 200 } }), [0, 1], [0, 300]);
  const subOpacity = interpolate(frame, [65, 85], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const subY = interpolate(spring({ frame: frame - 65, fps, config: { damping: 20 } }), [0, 1], [35, 0]);
  const estOpacity = interpolate(frame, [90, 110], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(${gradAngle}deg, ${COLORS.dark} 0%, ${COLORS.espresso} 40%, ${COLORS.dark} 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        position: "absolute", width: 900, height: 900, borderRadius: "50%",
        background: `radial-gradient(circle, ${COLORS.gold}20, transparent 70%)`,
        top: "50%", left: "50%", transform: "translate(-50%, -50%)",
      }} />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 1 }}>
        {/* Peet's stylized P logo */}
        <div style={{
          transform: `scale(${logoScale}) rotate(${logoRotate}deg)`,
          width: 100, height: 100, borderRadius: "50%",
          background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 30, boxShadow: `0 0 80px ${COLORS.gold}50`,
        }}>
          <span style={{ fontFamily: FONTS.display, fontSize: 60, fontWeight: 900, color: COLORS.dark }}>P</span>
        </div>

        <div style={{
          fontFamily: FONTS.display, fontSize: 110, fontWeight: 900, color: COLORS.cream,
          opacity: titleOpacity, clipPath: `inset(0 ${titleClip}% 0 0)`,
          letterSpacing: -3, lineHeight: 1, textShadow: `0 6px 60px ${COLORS.dark}`,
        }}>
          Peet's Coffee
        </div>

        <div style={{
          width: lineW, height: 3,
          background: `linear-gradient(90deg, transparent, ${COLORS.gold}, transparent)`,
          margin: "24px 0",
        }} />

        <div style={{
          fontFamily: FONTS.body, fontSize: 26, fontWeight: 300, color: COLORS.goldLight,
          opacity: subOpacity, transform: `translateY(${subY}px)`,
          letterSpacing: 10, textTransform: "uppercase",
        }}>
          Subscribe & Savor
        </div>

        <div style={{
          fontFamily: FONTS.display, fontSize: 20, color: COLORS.gold,
          opacity: estOpacity, marginTop: 20, letterSpacing: 4, fontStyle: "italic",
        }}>
          Berkeley, California · Est. 1966
        </div>
      </div>
    </AbsoluteFill>
  );
};
