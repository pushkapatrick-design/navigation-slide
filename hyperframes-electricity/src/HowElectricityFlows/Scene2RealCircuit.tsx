import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { colors, fonts } from "./theme";

const LOOP_D =
  "M 590 310 L 1330 310 A 90 90 0 0 1 1420 400 L 1420 680 A 90 90 0 0 1 1330 770 L 590 770 A 90 90 0 0 1 500 680 L 500 400 A 90 90 0 0 1 590 310 Z";

const BULB_CENTER = { x: 960, y: 310 };
const BATTERY_CENTER = { x: 500, y: 540 };

const DRAW_START = 0;
const DRAW_END = 72;
const FLOW_START = 72;
const BULB_POP_FRAME = 86;
const LABEL_IN_START = 96;

const DOTS = [
  { phase: 0 },
  { phase: 25 },
  { phase: 50 },
  { phase: 75 },
];

export const Scene2RealCircuit: React.FC = () => {
  const frame = useCurrentFrame();

  const drawProgress = interpolate(frame, [DRAW_START, DRAW_END], [100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.45, 0, 0.2, 1),
  });

  const flowActive = frame >= FLOW_START;
  const flowFrame = Math.max(0, frame - FLOW_START);

  const bulbPop = interpolate(frame, [BULB_POP_FRAME - 6, BULB_POP_FRAME, BULB_POP_FRAME + 18], [0, 1.35, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });
  const bulbGlow = interpolate(frame, [BULB_POP_FRAME - 6, BULB_POP_FRAME + 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bulbBurst = interpolate(frame, [BULB_POP_FRAME, BULB_POP_FRAME + 22], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const labelIn = interpolate(frame, [LABEL_IN_START, LABEL_IN_START + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const batteryIn = interpolate(frame, [10, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.navyDark, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 1000px 600px at 50% 48%, rgba(34,211,238,0.10), transparent 70%)",
        }}
      />

      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <defs>
          <filter id="dotGlow" x="-300%" y="-300%" width="700%" height="700%">
            <feGaussianBlur stdDeviation="9" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* faint full-loop guide */}
        <path d={LOOP_D} stroke="#182144" strokeWidth={10} fill="none" />

        {/* stroke-draw wire */}
        <path
          d={LOOP_D}
          stroke={colors.cyan}
          strokeWidth={10}
          fill="none"
          pathLength={100}
          strokeDasharray={100}
          strokeDashoffset={drawProgress}
          style={{ filter: "drop-shadow(0 0 10px rgba(34,211,238,0.65))" }}
        />

        {/* current dots flowing continuously around the loop */}
        {flowActive &&
          DOTS.map((d, i) => {
            const t = ((flowFrame * 1.05 + d.phase) % 100 + 100) % 100;
            return (
              <circle
                key={i}
                r={15}
                fill={colors.cyanGlow}
                filter="url(#dotGlow)"
                style={{
                  offsetPath: `path('${LOOP_D}')`,
                  offsetDistance: `${t}%`,
                }}
              />
            );
          })}

        {/* battery */}
        <g
          transform={`translate(${BATTERY_CENTER.x} ${BATTERY_CENTER.y})`}
          opacity={batteryIn}
        >
          <rect x={-46} y={-16} width={92} height={32} fill={colors.navyDark} />
          <line x1={-20} y1={-34} x2={-20} y2={34} stroke={colors.amber} strokeWidth={9} />
          <line x1={20} y1={-20} x2={20} y2={20} stroke={colors.amber} strokeWidth={9} />
          <text x={-20} y={-46} textAnchor="middle" fill={colors.amberGlow} fontFamily={fonts.mono} fontSize={30}>
            +
          </text>
          <text x={20} y={-46} textAnchor="middle" fill={colors.inkDim} fontFamily={fonts.mono} fontSize={30}>
            -
          </text>
        </g>
        <text
          x={BATTERY_CENTER.x}
          y={BATTERY_CENTER.y + 78}
          textAnchor="middle"
          fill={colors.inkDim}
          fontFamily={fonts.mono}
          fontSize={24}
          letterSpacing={2}
          opacity={batteryIn}
        >
          BATTERY
        </text>

        {/* bulb */}
        <g transform={`translate(${BULB_CENTER.x} ${BULB_CENTER.y})`}>
          <ellipse
            cx={0}
            cy={0}
            rx={120}
            ry={120}
            fill={colors.amberGlow}
            opacity={bulbGlow * 0.28 + bulbBurst * 0.4}
            style={{ filter: "blur(30px)" }}
          />
          <g transform={`scale(${bulbPop || 1})`}>
            <circle
              r={46}
              fill={bulbGlow > 0 ? colors.amber : "#0f1730"}
              stroke={bulbGlow > 0 ? colors.amberGlow : "#2a3457"}
              strokeWidth={6}
              opacity={bulbGlow > 0 ? 1 : 1}
              style={{
                filter:
                  bulbGlow > 0
                    ? `drop-shadow(0 0 ${18 + bulbBurst * 30}px ${colors.amber})`
                    : undefined,
              }}
            />
            <path
              d="M -16 8 L -6 -14 L 6 -2 L 16 8"
              stroke={bulbGlow > 0 ? "#3a2405" : colors.inkDim}
              strokeWidth={4}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect x={-16} y={44} width={32} height={16} rx={3} fill="#384162" />
          </g>
        </g>
        <text
          x={BULB_CENTER.x}
          y={BULB_CENTER.y - 108}
          textAnchor="middle"
          fill={colors.inkDim}
          fontFamily={fonts.mono}
          fontSize={24}
          letterSpacing={2}
        >
          BULB
        </text>
      </svg>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 120,
          display: "flex",
          justifyContent: "center",
          opacity: labelIn,
          translate: `0px ${interpolate(labelIn, [0, 1], [16, 0])}px`,
        }}
      >
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 34,
            color: colors.cyanGlow,
            letterSpacing: 3,
            textTransform: "uppercase",
            border: `1px solid ${colors.cyanDeep}`,
            borderRadius: 8,
            padding: "10px 28px",
            background: "rgba(8,20,32,0.55)",
          }}
        >
          Now, the real circuit.
        </div>
      </div>
    </AbsoluteFill>
  );
};
