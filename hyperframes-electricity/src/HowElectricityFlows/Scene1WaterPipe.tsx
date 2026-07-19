import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { colors, fonts } from "./theme";
import { WIPE_START, getWipeSweepPercent } from "./ColorWipeTransition";

const PIPE_D =
  "M 340 620 L 600 620 C 600 480 730 470 790 560 C 850 650 950 650 970 500 C 990 360 1120 360 1160 480 C 1195 585 1300 615 1400 615 L 1560 615";

const PUMP_CENTER = { x: 260, y: 620 };
const VALVE_CENTER = { x: 1620, y: 617 };

const ARRIVAL_START = 66;
const ARRIVAL_FULL = 108;

const BUBBLES = [
  { phase: 0, speed: 0.62, size: 15 },
  { phase: 27, speed: 0.62, size: 11 },
  { phase: 54, speed: 0.62, size: 18 },
  { phase: 78, speed: 0.62, size: 9 },
];

export const Scene1WaterPipe: React.FC = () => {
  const frame = useCurrentFrame();

  const titleIn = interpolate(frame, [0, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const scrollX = frame * 2.6;

  const valveGlow = interpolate(frame, [ARRIVAL_START, ARRIVAL_FULL], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.33, 1, 0.68, 1),
  });

  const pumpSpin = frame * 9;

  // Reveal clip: during the wipe window, shrink from the left so Scene 2
  // (mounted underneath) shows through in sync with the color band on top.
  let clipPath: string | undefined;
  if (frame >= WIPE_START) {
    const sweep = getWipeSweepPercent(frame - WIPE_START);
    const insetLeft = Math.min(100, Math.max(0, sweep + 22));
    clipPath = `inset(0 0 0 ${insetLeft}%)`;
  }

  return (
    <AbsoluteFill
      style={{ backgroundColor: colors.navyDark, clipPath, overflow: "hidden" }}
    >
      {/* ambient backdrop glow */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 900px 500px at 50% 78%, rgba(45,212,191,0.10), transparent 70%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 96,
          left: 120,
          opacity: titleIn,
          translate: `0px ${interpolate(titleIn, [0, 1], [24, 0])}px`,
        }}
      >
        <div
          style={{
            fontFamily: fonts.display,
            fontSize: 96,
            color: colors.white,
            letterSpacing: 1,
            lineHeight: 1,
          }}
        >
          Think of it like water.
        </div>
        <div
          style={{
            marginTop: 22,
            width: 220,
            height: 8,
            borderRadius: 4,
            background: `linear-gradient(90deg, ${colors.teal}, ${colors.tealGlow})`,
            boxShadow: `0 0 24px ${colors.teal}`,
          }}
        />
      </div>

      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <defs>
          <mask id="pipeMask">
            <path
              d={PIPE_D}
              stroke="white"
              strokeWidth={46}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </mask>
          <pattern
            id="flowStripes"
            width={60}
            height={60}
            patternUnits="userSpaceOnUse"
            patternTransform={`translate(${scrollX} 0)`}
          >
            <rect width={60} height={60} fill={colors.tealDeep} />
            <rect
              x={-20}
              y={16}
              width={100}
              height={15}
              fill={colors.tealGlow}
              opacity={0.9}
              transform="rotate(-28 30 30)"
            />
            <rect
              x={-20}
              y={-14}
              width={100}
              height={15}
              fill={colors.tealGlow}
              opacity={0.45}
              transform="rotate(-28 30 30)"
            />
          </pattern>
        </defs>

        {/* pipe outer casing */}
        <path
          d={PIPE_D}
          stroke={colors.navyLight}
          strokeWidth={62}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d={PIPE_D}
          stroke="#1c2540"
          strokeWidth={50}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* flowing water texture, masked to the tube shape */}
        <g mask="url(#pipeMask)">
          <rect x={0} y={300} width={1920} height={640} fill="url(#flowStripes)" />
        </g>

        {/* pipe rim highlight */}
        <path
          d={PIPE_D}
          stroke="rgba(148,197,193,0.28)"
          strokeWidth={46}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          transform="translate(0 -13)"
          opacity={0.35}
        />

        {/* pump */}
        <g transform={`translate(${PUMP_CENTER.x} ${PUMP_CENTER.y})`}>
          <circle r={78} fill="#0f1730" stroke={colors.tealDeep} strokeWidth={10} />
          <circle r={78} fill="none" stroke={colors.teal} strokeWidth={2} opacity={0.5} />
          <g transform={`rotate(${pumpSpin})`}>
            {[0, 90, 180, 270].map((deg) => (
              <rect
                key={deg}
                x={-8}
                y={-58}
                width={16}
                height={44}
                rx={8}
                fill={colors.tealGlow}
                opacity={0.85}
                transform={`rotate(${deg})`}
              />
            ))}
            <circle r={16} fill={colors.teal} />
          </g>
        </g>
        <text
          x={PUMP_CENTER.x}
          y={PUMP_CENTER.y + 122}
          textAnchor="middle"
          fill={colors.inkDim}
          fontFamily={fonts.mono}
          fontSize={26}
          letterSpacing={2}
        >
          PUMP
        </text>

        {/* drifting glow bubbles along the flow path */}
        {BUBBLES.map((b, i) => {
          const t = ((frame * b.speed + b.phase) % 100 + 100) % 100;
          const edgeFade = Math.min(1, Math.min(t, 100 - t) / 6);
          return (
            <circle
              key={i}
              r={b.size}
              fill={colors.tealGlow}
              opacity={0.85 * edgeFade}
              style={{
                offsetPath: `path('${PIPE_D}')`,
                offsetDistance: `${t}%`,
                offsetRotate: "0deg",
              }}
              filter="url(#bubbleGlow)"
            />
          );
        })}
        <defs>
          <filter id="bubbleGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* valve / nozzle */}
        <g transform={`translate(${VALVE_CENTER.x} ${VALVE_CENTER.y})`}>
          <rect x={-30} y={-46} width={60} height={92} rx={12} fill="#0f1730" stroke="#2a3457" strokeWidth={8} />
          <polygon points="30,-34 96,-16 96,16 30,34" fill="#0f1730" stroke="#2a3457" strokeWidth={8} />
          <ellipse
            cx={104}
            cy={0}
            rx={34}
            ry={34}
            fill={colors.amber}
            opacity={valveGlow}
            style={{ filter: `blur(${2 + valveGlow * 2}px)` }}
          />
          <ellipse
            cx={104}
            cy={0}
            rx={60}
            ry={60}
            fill={colors.amberGlow}
            opacity={valveGlow * 0.35}
            style={{ filter: "blur(18px)" }}
          />
        </g>
        <text
          x={VALVE_CENTER.x + 20}
          y={VALVE_CENTER.y + 122}
          textAnchor="middle"
          fill={colors.inkDim}
          fontFamily={fonts.mono}
          fontSize={26}
          letterSpacing={2}
        >
          VALVE
        </text>
      </svg>
    </AbsoluteFill>
  );
};
