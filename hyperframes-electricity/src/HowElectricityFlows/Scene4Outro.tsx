import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { colors, fonts } from "./theme";

const RING_PERIOD = 54;
const RINGS = [0, 18, 36];

export const Scene4Outro: React.FC = () => {
  const frame = useCurrentFrame();

  const eyebrowIn = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const lineReveal = interpolate(frame, [22, 58], [100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.65, 0, 0.35, 1),
  });

  const ruleWidth = interpolate(frame, [60, 84], [0, 260], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.navyDark,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* pulsing bulb glyph, ambient background element */}
      <div
        style={{
          position: "absolute",
          top: 150,
          left: "50%",
          translate: "-50% 0",
          width: 260,
          height: 260,
        }}
      >
        {RINGS.map((phase) => {
          const t = ((frame + phase) % RING_PERIOD) / RING_PERIOD;
          const radius = interpolate(t, [0, 1], [12, 120]);
          const opacity = interpolate(t, [0, 0.15, 1], [0, 0.35, 0]);
          return (
            <div
              key={phase}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: radius * 2,
                height: radius * 2,
                translate: `${-radius}px ${-radius}px`,
                borderRadius: "50%",
                border: `2px solid ${colors.amberGlow}`,
                opacity,
              }}
            />
          );
        })}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            translate: "-50% -50%",
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: colors.amber,
            boxShadow: `0 0 50px 12px rgba(251,191,36,0.45)`,
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: 470,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 34,
        }}
      >
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 32,
            letterSpacing: 6,
            color: colors.inkDim,
            textTransform: "uppercase",
            opacity: eyebrowIn,
            translate: `0px ${interpolate(eyebrowIn, [0, 1], [14, 0])}px`,
          }}
        >
          How Electricity Flows
        </div>

        <div style={{ overflow: "hidden", padding: "0 10px" }}>
          <div
            style={{
              fontFamily: fonts.display,
              fontSize: 108,
              lineHeight: 1.05,
              textAlign: "center",
              color: colors.white,
              clipPath: `inset(0 ${lineReveal}% 0 0)`,
            }}
          >
            Same flow.{" "}
            <span
              style={{
                background: `linear-gradient(90deg, ${colors.cyanGlow}, ${colors.white}, ${colors.amber})`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Real power.
            </span>
          </div>
        </div>

        <div
          style={{
            width: ruleWidth,
            height: 6,
            borderRadius: 3,
            background: `linear-gradient(90deg, ${colors.teal}, ${colors.cyan}, ${colors.amber})`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
