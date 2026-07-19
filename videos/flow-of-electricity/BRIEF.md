---
workflow: general-video
flow: automation
storyboard: no
message: "Electricity flows in a single closed loop — from the battery, through the circuit, powering the load, and back again."
destination: general / embed
aspect: 1920x1080
language: en
length: 15s
---

## Intent

A 15-second, unnarrated, 4-scene motion graphic explaining how electricity
flows, using a water metaphor to bridge into the real circuit:

1. **Water-pipe metaphor (0.0–5.3s)** — a pump pushes glowing teal water
   through a looping pipe toward a valve, which lights up once water reaches
   it. "Think of it like water."
2. **Color-shift wipe transition (4.9–6.0s)** — teal → cyan/amber sweep,
   bridging metaphor into reality.
3. **The real circuit (5.0–12.0s)** — battery/wire/bulb loop draws on, current
   flows as glowing dots via motion-path, bulb lights with a punchy flash.
   "Now, the real circuit."
4. **Kinetic-type close (12.0–15.0s)** — "That's the flow of electricity."
   reveals word-by-word with a stagger.

## Notes

- 4 scenes, no narration/voiceover, no user-supplied assets, silent —
  on-screen titles/labels carry the whole explanation (per user's explicit
  choice: keep 15s, silent captions, 16:9).
- Style: dark background throughout; teal = water/metaphor, electric-cyan +
  warm amber = electricity/reality (the color shift on the wipe *is* the
  metaphor payoff). Oswald (display) + IBM Plex Mono (labels).
- Deliberately varies animation technique per scene: scrolling-texture fluid
  motion (water), scale-based wipe transition, SVG stroke-draw + GSAP
  MotionPathPlugin (circuit), per-word kinetic-type stagger (close).
- Routed to `/general-video`: no installed `/motion-graphics` category covers
  a multi-scene metaphor-to-diagram narrative; this is a hand-authored
  freeform composition.
- Learned mid-build: `data-track-index` is temporal-only (overlap linting),
  not paint order — visual stacking needs explicit CSS `z-index` per scene,
  or a later-DOM scene's transparent background silently paints over earlier
  ones during any time overlap.
