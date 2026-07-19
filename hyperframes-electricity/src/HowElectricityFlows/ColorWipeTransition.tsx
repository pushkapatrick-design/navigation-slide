import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

// Shared sync constants — Scene1 reads these too so its clip-path reveal
// lines up exactly with the color band sweeping over it.
export const WIPE_START = 150; // absolute frame, 5.0s @ 30fps
export const WIPE_END = 177; // absolute frame, 5.9s @ 30fps
export const WIPE_BAND_WIDTH = 22; // percent of screen width

export const getWipeSweepPercent = (localFrame: number) => {
  const progress = interpolate(localFrame, [0, WIPE_END - WIPE_START], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.61, 0.02, 0.4, 0.98),
  });
  return interpolate(progress, [0, 1], [-WIPE_BAND_WIDTH, 100 + WIPE_BAND_WIDTH]);
};

export const ColorWipeTransition: React.FC = () => {
  const frame = useCurrentFrame();
  const sweep = getWipeSweepPercent(frame);

  const progress = interpolate(frame, [0, WIPE_END - WIPE_START], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Brightest right at the halfway point, when the flash is centered on frame.
  const midBoost = 1 - Math.abs(progress - 0.5) * 2;

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {/* Soft wide glow bloom trailing the hard core */}
      <AbsoluteFill
        style={{
          left: `${sweep - WIPE_BAND_WIDTH * 1.4}%`,
          width: `${WIPE_BAND_WIDTH * 3.8}%`,
          background:
            "linear-gradient(90deg, rgba(45,212,191,0) 0%, rgba(45,212,191,0.55) 30%, rgba(253,230,138,0.65) 55%, rgba(251,191,36,0.55) 70%, rgba(251,191,36,0) 100%)",
          filter: `blur(${60 + midBoost * 30}px)`,
          opacity: 0.9,
        }}
      />
      {/* Crisp hard-edged core sweep */}
      <AbsoluteFill
        style={{
          left: `${sweep}%`,
          width: `${WIPE_BAND_WIDTH}%`,
          background:
            "linear-gradient(90deg, #0f766e 0%, #2dd4bf 22%, #f5f8ff 50%, #fde68a 68%, #fbbf24 100%)",
          boxShadow: `0 0 ${120 + midBoost * 160}px ${40 + midBoost * 40}px rgba(253,224,71,${0.35 + midBoost * 0.35})`,
        }}
      />
    </AbsoluteFill>
  );
};
