import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Self-hosted (rather than fetched live from Google Fonts) so rendering
// never depends on the sandbox's outbound network access.
loadFont({
  family: "Anton",
  url: staticFile("fonts/Anton-Regular.woff2"),
  weight: "400",
  style: "normal",
});

loadFont({
  family: "JetBrains Mono",
  url: staticFile("fonts/JetBrainsMono-500.woff2"),
  weight: "500",
  style: "normal",
});

loadFont({
  family: "JetBrains Mono",
  url: staticFile("fonts/JetBrainsMono-700.woff2"),
  weight: "700",
  style: "normal",
});

export const fonts = {
  display: "Anton",
  mono: "JetBrains Mono",
};

export const colors = {
  navyDark: "#060a14",
  navy: "#0a1022",
  navyLight: "#121a30",

  teal: "#2dd4bf",
  tealDeep: "#0f766e",
  tealGlow: "#5eead4",

  cyan: "#22d3ee",
  cyanDeep: "#0e7490",
  cyanGlow: "#7dd3fc",

  amber: "#fbbf24",
  amberDeep: "#b45309",
  amberGlow: "#fde68a",

  ink: "#dbe3f5",
  inkDim: "#7d8bab",
  white: "#f5f8ff",
};
