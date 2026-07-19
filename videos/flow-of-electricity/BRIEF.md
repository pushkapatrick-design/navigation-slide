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
- Bug fixed: the charge ball drifted off the slope line during its scale
  tweens (fade-in, bounce landing, resting pulse). Cause: `#charge-ball`
  was missing `transform-box: fill-box; transform-origin: 50% 50%` — without
  it, SVG's default transform-origin is the *viewport's* origin, not the
  element's own center, so scaling shifted the ball's rendered position away
  from its `motionPath` coordinate. `#battery-group`/`#bulb-group` already
  had this rule (that's why they didn't show the bug); any future SVG
  element combining `scale` with `motionPath` or positional tweens needs it
  too.
- Bug fixed: even after the above, the ball's *center* rode exactly on the
  `#hill-edge` line, so the ball visually straddled/sank into the slope
  instead of resting on top of it. Fixed by adding an invisible `#ball-path`
  parallel to `#hill-edge`, offset perpendicular by the ball's radius (24px)
  in the direction away from the filled wedge, and motion-pathing the ball
  along that instead — the ball is now tangent to the visible line, like it's
  rolling on the surface, and still stops exactly at the slope's end point.
- That offset attempt was reverted per explicit user feedback ("still not
  rolling on top of the yellow line") — the user's actual intent was
  simpler: the ball's center should ride the visible `#hill-edge` line
  directly, start to end, no offset. Reverted to `motionPath: { path:
  "#hill-edge" }` with the ball's initial `cx/cy` back at the line's start
  (150,150); the `transform-box: fill-box` fix from the prior round stays
  (that one was a real bug, confirmed independently of the offset question).
- Smoothed the battery/bulb reveal in the circuit scene: was `scale: 0.8 ->
  1` over 0.25s with `ease: "back.out(1.7)"` (bouncy overshoot, read as
  "too aggressive" per user feedback on the bulb specifically). Now `scale:
  0.9 -> 1` over 0.45s with `ease: "power2.out"` (smooth, no overshoot).
  Applied to both battery and bulb since they shared the identical bouncy
  pattern — smoothing only one would have made them visually inconsistent.
- **Root-caused the ball-on-line bug.** The "ball rides the line directly"
  fix above still wasn't actually correct — user feedback ("still not
  rolling on top of the yellow line") plus a pixel-precision check (sampling
  ball-color pixels in rendered frames, comparing centroid to the line's own
  equation) found `motionPath: { path: "#hill-edge" }` was landing the ball
  a *constant* ~98px (canvas px) / ~70 SVG-units below the visible line at
  every point along the roll — a real MotionPathPlugin quirk on this
  element, invisible in a small thumbnail but obvious at full resolution or
  measured precisely. Fixed by dropping MotionPathPlugin for this element
  entirely and tweening the circle's own `cx`/`cy` attributes directly
  (`attr: { cx: 850, cy: 450 }`) — since the path is just a straight line,
  this needs no path-tracing and sidesteps whatever transform-composition
  issue MotionPathPlugin had here. Verified pixel-exact on the visible line
  at full resolution before re-rendering. **Lesson: don't trust a small
  contact-sheet thumbnail to validate exact-alignment claims — measure
  precisely (pixel sampling) or inspect a full-resolution single frame.**
- Simplified the bulb "lights up" moment from a flash-burst + scale-pop to a
  plain, calm fade (per user: "too aggressive... fade in instead") — removed
  the `#bulb-flash` burst and the `scale: 1 -> 1.12` pop entirely; the glow/
  rays/fill now just fade in together over 0.7s with `power1.out`. The
  ambient post-light-up glow pulse (ballast/breathing effect during the
  hold) is unchanged.
- Reworked the two wipe transitions to be uniform: previously a
  scaleY-cover-then-opacity-fade combo (asymmetric feel). Now both are the
  identical directional slide — `x` from off-screen-left to 0 (cover), hold,
  then `x` to off-screen-right (reveal) — same durations/eases for both;
  only the gradient colors differ (teal→violet vs violet/gold→cyan).
- Style: dark background throughout; teal = water/metaphor, violet/gold =
  force/voltage, electric-cyan + warm amber = electricity/reality. Each wipe's
  color shift *is* the metaphor payoff. Oswald (display) + IBM Plex Mono
  (labels).
- Deliberately varies animation technique per scene: scrolling-texture fluid
  motion + straight-line particle drift (water), a uniform directional-slide
  wipe between scenes, SVG stroke-draw + attr-based straight-line tween
  (voltage hill) + GSAP MotionPathPlugin (circuit's closed-loop current
  flow, unaffected by the above bug since it never showed the same offset),
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
