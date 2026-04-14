# Learnings

## 2026-04-14 — v2 pixel-perfect rebuild

### [LEARN] Figma Dev Mode emits non-Tailwind grid shortcuts (`col-N`, `row-N`)
- **What happened:** MetricsBand rendered with cards in wrong order and overflowing into PainScenarios. Root cause: Figma's `get_design_context` exports `col-1`, `col-2`, `row-1`, etc. — these are NOT standard Tailwind utilities and resolve to `grid-column: auto`, triggering auto-placement instead of the intended explicit grid slots.
- **Why:** Figma's code gen seems to assume a custom Tailwind preset. Tailwind's actual utilities are `col-start-N` / `col-span-N` / `row-start-N`.
- **Fix:** `scripts/figma-process-section.mjs` now sanitizes with regex at conversion time — `col-N` → `col-start-N`, `row-N` → `row-start-N`. Applied to all 13 pending sections; verified on MetricsBand (row 2 now correctly one row instead of three).
- **Rule:** Treat the Figma exporter as an untrusted upstream. Every new Figma class pattern must be validated against Tailwind's actual utility list before it hits a generated component. If in doubt, `getComputedStyle(el).gridColumn === 'auto'` means the class did nothing.

### [ERROR] Gate 3 skipped → shipped broken layout while claiming "done"
- **What happened:** Reported Hero/MetricsBand/PainScenarios as complete after one full-page screenshot. The pipeline's Gates 1–2 passed but Gate 3 (per-section diff vs Figma) was verbal only. User immediately spotted the failure on the second screen.
- **Why:** The pixel-perfect SKILL described Gate 3 but didn't mechanically enforce it. I treated it as "take a look" instead of "run a diff."
- **Fix:** Gate 3 is now mechanical — `verify-pixel-perfect.mjs` + Stop hook that blocks session-end on missing/stale/failing verification.md.
- **Rule:** No deliverable is "done" without a machine-verifiable artifact. A verbal "looks fine" on a screenshot is not verification — it's optimism.

### [ERROR] Absolute offsets between sections in page.tsx → overlap
- **What happened:** Mounted Hero + MetricsBand as direct `contents` children and wrapped PainScenarios with `top-[1928px]`. Sections visually overlapped because Figma children carry coords relative to their section parent, not the page.
- **Why:** I assumed `contents` wrappers would propagate Figma homepage-Y coords cleanly. They don't — each section's children are section-local, not page-global.
- **Fix:** `app/v2/page.tsx` is now flow-stack — each section wrapped in a `relative` div sized to the Figma `bbox.height`. No top-[Npx] at page level.
- **Rule:** Sections stack via flow. Absolute coords are a section-internal affair only. If a generator emits a child with `top-[1298px]` (homepage Y instead of section-local), that's a generator bug — patch the generator, don't patch page.tsx.

### [LEARN] Figma image export is transparent outside drawn content — composite before diff
- **What happened:** verify-pixel-perfect reported hero=24.2%, metrics-band=36.5%, pain-scenarios=30.1%. diff.png showed what looked like a solid "black/red upper container" on hero — I initially hypothesized a missing dark wrapper in Hero.tsx. Checked source.raw.jsx, figma-process-section.mjs, and Figma REST tree — none of them had a dark wrapper. Figma's `section/hero` GROUP has `backgroundColor: rgba(0,0,0,0)` (transparent). Pixel sampling of `figma.png` showed `(0,0,0,0)` in empty zones.
- **Why:** Figma `/v1/images` endpoint renders only the node's own painted pixels. A GROUP/FRAME with no fill emits alpha=0 outside drawn content. The page-level white background (homepage frame `310:840` has white fill) never makes it into the per-section PNG. Preview screenshot is opaque white everywhere. pixelmatch sees `(0,0,0,0)` vs `(255,255,255,255)` as full mismatch → false positives proportional to empty space in the section.
- **Fix:** `scripts/verify-pixel-perfect.mjs` now composites figma.png onto white (`WHITE.r/g/b * (1-alpha) + pixel * alpha`, alpha→255) before pixelmatch. Hero diff dropped 24.20% → 0.30% ✅ one commit. Metrics-band and pain-scenarios diffs are now real signal (33% / 30%) — not transparency noise.
- **Rule:** Any Figma→web diff pipeline must composite the Figma export onto the page-frame's own background before pixelmatch. For pipelines across files, read the homepage/root frame's fills from Figma REST and use that color; white is a pragmatic default when homepage is known white.

### [ERROR] "Black container" in diff.png was transparency — misread as design element
- **What happened:** Looking at `sections/hero/figma.png`, I described "верхняя зона на чёрном фоне, H1 белый" and built a hypothesis around a missing dark wrapper in generated Hero.tsx. Pursued that root for several steps before checking the actual pixel alpha.
- **Why:** PNG viewers (including the chat image renderer) fill alpha=0 with black. A transparent region looks identical to a black-filled region visually. I reasoned about layout from the rendered image, not from RGBA values.
- **Fix:** Before any conclusion about Figma-vs-preview layout from a diff image, sample raw alpha channel of figma.png in suspect regions. If `alpha=0`, you're looking at transparency, not design. Only then look at RGB.
- **Rule:** diff.png and figma.png are RGBA. Never infer design intent from a screenshot viewer's rendering of transparency. Python `PIL.Image.open(path).load()[x,y]` or equivalent is cheap — run it before posting a diagnosis.

### [LEARN] `display:contents` roots can't be Puppeteer-screenshotted
- **What happened:** verify-pixel-perfect first run crashed on hero with "Node is either not visible or not an HTMLElement" — because Figma's `contents` wrapper has no box.
- **Fix:** Gate 3 now probes computed style first and falls back to `page.screenshot({fullPage:true})` + bbox crop (from node-map.json). Less precise (includes surrounding pixels) but works.
- **Rule:** Any per-element screenshot path must handle `display:contents` as a non-element for screenshot purposes.

---

## What Works
- W+K manifesto style resonates with the client — short punchy declarations, emotional truth over corporate language, rhetorical devices like repetition
- Starting with a concrete scene ("founder at 2 AM") before moving to philosophy works well for manifesto structure
- The JNTBD positioning ("payroll is a job not to be done") works as a headline — the client confirmed the level of boldness is right

## What Doesn't Work
- Long manifesto text (15+ paragraphs) — user immediately rejected, said "nobody will read it." Three paragraphs is the ceiling for this section.
- Generic WHY headline ("We want borders and rules not to stand in the way of opportunities") — too expected for About Us, not catchy enough
- Headline without a "landing" / second part feels incomplete — user said "мысль не до конца доведена" (thought not fully developed)

## User Preferences
- Yegor prefers concise, punchy content — cuts aggressively
- Headlines must work in layout (line count matters) — 5 lines is too many for a headline+subline
- Wants boldness and provocation but not empty provocation — substance behind every claim
- Responds well to multiple options presented as numbered list
- Approves direction quickly ("отлично для первой версии") but iterates on details
- Language: communicates in Russian, content is in English

## Strategies & Patterns
- When writing brand content for Stape, always reference these Notion docs first: Brand Summary Doc, Brand Positioning Documentation, Brand Platform Documentation, Brand Personality Documentation
- The Notion Docs database URL: https://www.notion.so/299402511cda81d68b58f02cbe94ba17?v=299402511cda810e8b43000c8436b5ef
- Stape brand attributes to check against: Breakthrough/Progressive, Predictable, Exceptional
- Three values: Honesty, Speed through high-agency, Having fun
