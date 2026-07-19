import { AbsoluteFill, Sequence } from "remotion";
import { colors } from "./theme";
import { Scene1WaterPipe } from "./Scene1WaterPipe";
import { Scene2RealCircuit } from "./Scene2RealCircuit";
import { Scene3KineticType } from "./Scene3KineticType";
import { Scene4Outro } from "./Scene4Outro";
import { ColorWipeTransition, WIPE_START, WIPE_END } from "./ColorWipeTransition";

// Timing map (30fps):
// Scene 1  — Water pipe metaphor     : 0    -> 177  (0.0s  - 5.9s, wipe eats the last 0.9s)
// Wipe     — teal -> cyan/amber sweep: 150  -> 177  (5.0s  - 5.9s)
// Scene 2  — Real circuit            : 150  -> 360  (5.0s  - 12.0s, revealed by the wipe)
// Scene 3  — Kinetic type close      : 360  -> 450  (12.0s - 15.0s, hard cut)
// Scene 4  — Outro                   : 450  -> 600  (15.0s - 20.0s, hard cut)

export const SCENE1_DURATION = 177;
export const SCENE2_START = 150;
export const SCENE2_DURATION = 210;
export const SCENE3_START = 360;
export const SCENE3_DURATION = 90;
export const SCENE4_START = 450;
export const SCENE4_DURATION = 150;

export const HowElectricityFlows: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.navyDark }}>
      {/* Scene 2 sits underneath scene 1 so the wipe can reveal it */}
      <Sequence
        from={SCENE2_START}
        durationInFrames={SCENE2_DURATION}
        name="Scene 2 — Real circuit"
      >
        <Scene2RealCircuit />
      </Sequence>

      <Sequence
        from={0}
        durationInFrames={SCENE1_DURATION}
        name="Scene 1 — Water pipe metaphor"
      >
        <Scene1WaterPipe />
      </Sequence>

      <Sequence
        from={WIPE_START}
        durationInFrames={WIPE_END - WIPE_START}
        name="Transition — Color wipe"
        layout="none"
      >
        <ColorWipeTransition />
      </Sequence>

      <Sequence
        from={SCENE3_START}
        durationInFrames={SCENE3_DURATION}
        name="Scene 3 — Kinetic type close"
      >
        <Scene3KineticType />
      </Sequence>

      <Sequence
        from={SCENE4_START}
        durationInFrames={SCENE4_DURATION}
        name="Scene 4 — Outro"
      >
        <Scene4Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
