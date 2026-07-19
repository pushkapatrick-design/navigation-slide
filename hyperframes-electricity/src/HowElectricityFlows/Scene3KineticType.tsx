import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { colors, fonts } from "./theme";

const WORDS = [
  { text: "That's", color: colors.white },
  { text: "the", color: colors.white },
  { text: "flow", color: colors.cyanGlow },
  { text: "of", color: colors.white },
  { text: "electricity.", color: colors.amber },
];

const STAGGER = 7;
const START_DELAY = 4;
const POP_DURATION = 18;

export const Scene3KineticType: React.FC = () => {
  const frame = useCurrentFrame();

  const glow = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.navyDark,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 1100px 700px at 50% 50%, rgba(251,191,36,${
            0.08 * glow
          }), transparent 70%)`,
        }}
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "baseline",
          gap: "0px 30px",
          maxWidth: 1500,
          padding: "0 80px",
        }}
      >
        {WORDS.map((word, i) => {
          const start = START_DELAY + i * STAGGER;
          const pop = interpolate(
            frame,
            [start, start + POP_DURATION * 0.55, start + POP_DURATION],
            [0, 1.16, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.34, 1.56, 0.64, 1),
            },
          );
          const opacity = interpolate(frame, [start, start + 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                fontFamily: fonts.display,
                fontSize: 128,
                color: word.color,
                opacity,
                scale: pop,
                textShadow:
                  word.text === "electricity."
                    ? `0 0 40px rgba(251,191,36,0.55)`
                    : undefined,
              }}
            >
              {word.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
