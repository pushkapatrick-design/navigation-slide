---
workflow: general-video
flow: automation
storyboard: no
message: "Electricity flows because voltage pushes current through a circuit — from the battery, through the wires, powering the load, and back again."
destination: general / embed
aspect: 1920x1080
language: en
length: 25s
---

## Intent

A 25-second, unnarrated, 4-scene motion graphic explaining how electricity
flows, using metaphors to build up to the real circuit:

1. **Water-pipe metaphor (0.0–6.9s)** — a pump pushes glowing teal water
   through a metal pipe (casing, joints, a distinct water fill with a moving
   surface highlight) toward a valve, which lights up once water reaches it.
   "Think of it like water."
2. **Color-shift wipe transition (6.1–7.4s)** — teal → violet sweep.
3. **Force / voltage-is-the-push (7.0–13.4s)** — a glowing charge sits atop a
   slope (high potential) and rolls down to the bottom (low potential) under
   the pull of "the force," with a labeled voltage bracket showing that the
   height of the slope *is* the voltage. "That force is called voltage."
4. **Color-shift wipe transition (13.0–14.3s)** — violet/gold → electric cyan.
5. **The real circuit (14.0–22.4s)** — battery/wire/bulb loop draws on,
   current flows as glowing dots via motion-path, bulb lights with a punchy
   flash plus an ambient pulse through the hold. "Now, the real circuit."
6. **Kinetic-type close (21.4–25.0s)** — "That's the flow of electricity."
   reveals word-by-word with a stagger, then holds ~2.5s.

## Notes

- 4 content scenes + 2 transitions, no narration/voiceover in the render, no
  user-supplied assets, silent — on-screen titles/labels carry the
  explanation.
- User separately requested a narration script (for their own ElevenLabs
  generation) without generating audio — see chat; script is scene-timed to
  match this cut and will need re-timing once real VO audio exists.
- Extended from 20s to 25s (user gave explicit "extend by up to 5s if
  needed") to fix the force scene, which was the most rushed beat: hill,
  labels, and voltage bracket used to land in under a second before the ball
  started rolling. The extra time also gave the closing line a longer,
  more comfortable hold instead of cutting off right after the stagger
  finished.
- Style: dark background throughout; teal = water/metaphor, violet/gold =
  force/voltage, electric-cyan + warm amber = electricity/reality. Each wipe's
  color shift *is* the metaphor payoff. Oswald (display) + IBM Plex Mono
  (labels).
- Deliberately varies animation technique per scene: scrolling-texture fluid
  motion + straight-line particle drift (water), scale-based wipe transitions,
  SVG stroke-draw + GSAP MotionPathPlugin (voltage hill, circuit loop),
  per-word kinetic-type stagger (close).
- Water-pipe visuals were revised after user feedback that v1 (a plain teal
  capsule with candy-stripe texture) didn't read as a pipe. v2 adds a metal
  casing with joint bands, flange rings at the pump/valve connections, a
  distinct water fill with two parallax wave layers + a moving surface
  highlight for a "light on water" cue.
- Routed to `/general-video`: no installed `/motion-graphics` category covers
  a multi-scene metaphor-to-diagram narrative; this is a hand-authored
  freeform composition.
- Learned mid-build: `data-track-index` is temporal-only (overlap linting),
  not paint order — visual stacking needs explicit CSS `z-index` per scene
  (transition wipes at z-index 10, content scenes at z-index 1), or a
  later-DOM scene's transparent background silently paints over earlier ones
  during any time overlap.
