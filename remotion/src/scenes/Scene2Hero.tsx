import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from "remotion";
import { FONTS, COLORS } from "../constants";

export const Scene2Hero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imgOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const imgScale = interpolate(frame, [0, 200], [1.1, 1.02], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  const overlayOpacity = interpolate(frame, [20, 40], [0, 0.7], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  const headlineOpacity = interpolate(frame, [40, 60], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const headlineY = interpolate(spring({ frame: frame - 40, fps, config: { damping: 18 } }), [0, 1], [50, 0]);

  const subOpacity = interpolate(frame, [65, 85], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const subY = interpolate(spring({ frame: frame - 65, fps, config: { damping: 20 } }), [0, 1], [30, 0]);

  const badgeOpacity = interpolate(frame, [100, 120], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const badgeScale = spring({ frame: frame - 100, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill>
      {/* Background image */}
      <div style={{
        position: "absolute", inset: 0, opacity: imgOpacity,
        transform: `scale(${imgScale})`, overflow: "hidden",
      }}>
        <Img src={staticFile("images/peets-hero.png")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      {/* Dark overlay */}
      <AbsoluteFill style={{ background: `linear-gradient(135deg, ${COLORS.dark}E0, ${COLORS.espresso}B0)`, opacity: overlayOpacity }} />

      {/* Content */}
      <div style={{
        position: "absolute", left: 120, top: "50%", transform: "translateY(-50%)",
        zIndex: 2, maxWidth: 800,
      }}>
        <div style={{
          fontFamily: FONTS.display, fontSize: 80, fontWeight: 900, color: COLORS.cream,
          opacity: headlineOpacity, transform: `translateY(${headlineY}px)`,
          lineHeight: 1.05, marginBottom: 24,
        }}>
          Subscribe{"\n"}&{" "}
          <span style={{ color: COLORS.gold }}>Savor</span>
        </div>

        <div style={{
          fontFamily: FONTS.body, fontSize: 26, fontWeight: 300, color: COLORS.cream,
          opacity: subOpacity, transform: `translateY(${subY}px)`,
          lineHeight: 1.6, maxWidth: 600,
        }}>
          Enjoy our freshest coffee delivered directly to your door, without lifting a finger. Plus, free shipping always.
        </div>

        {/* Free mug badge */}
        <div style={{
          marginTop: 40, display: "inline-flex", alignItems: "center", gap: 12,
          background: COLORS.gold, borderRadius: 50, padding: "14px 28px",
          opacity: badgeOpacity, transform: `scale(${badgeScale})`,
          boxShadow: `0 8px 30px ${COLORS.gold}40`,
        }}>
          <span style={{ fontSize: 24 }}>🎁</span>
          <span style={{
            fontFamily: FONTS.body, fontSize: 16, fontWeight: 900, color: COLORS.dark,
            textTransform: "uppercase", letterSpacing: 2,
          }}>
            Free mug with Curated Subscription
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
