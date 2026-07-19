import "./index.css";
import { Composition } from "remotion";
import { HowElectricityFlows } from "./HowElectricityFlows";

const FPS = 30;
const TOTAL_DURATION_IN_FRAMES = 600; // 20s @ 30fps

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HowElectricityFlows"
        component={HowElectricityFlows}
        durationInFrames={TOTAL_DURATION_IN_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
