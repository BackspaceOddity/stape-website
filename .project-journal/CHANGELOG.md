# Changelog

> **⚠️ Историческая запись.** Записи 2026-04-14 описывают экспериментальную Figma-verify ветку, которая на `main` была revert'нута Анной 2026-04-23 (см. `git log --grep="^Revert"`). Сохранено как контекст рассуждений и попыток. Snapshot ветки — в `local-figma-verify-2026-04-14`.

---

## 2026-06-04 — /kleos-v3 image quality test route + kleos.io launch review

**What happened:**
- kleos.io went live (Webflow production). H1: "Payroll was never the job you signed up for / We make it disappear".
- Created `/kleos-v3` route: homepage mirroring kleos.io structure with Figma-exported PNG images (no compression) for quality comparison against Webflow.
- New component `HeroImageBand.tsx` — full-width `hero-wide.png` below hero text.
- `TimelineV2` + `CTAV2`: added optional `backgroundImage` prop (backward-compatible). `/kleos-v3` passes `sky.png` and `bg-city.png` respectively.
- `WorkThatDisappearsV2`: swapped 5 placeholder portraits for real Figma gallery cards.
  - First export pulled from "Option 1" section (`518:xxxx`) — wrong set.
  - Corrected to "Option 2" (`1146:7xxx`) after Yegor pointed to node `1146:7186`.
  - `card1-blue` (`1146:6717`, "Close the deal") is shared between both options — correct from the start.
- `MetricsV2`: `$40M+` → `$60M+` to match live kleos.io.
- 6 background images + 5 gallery cards exported from `[Deliverables] Kleos` Figma file, node `1146:6001`.

**Decisions made:**
- Image export: 1× PNG scale (2× times out for batches > 2 large nodes).
- Gallery cards: label Container hidden before export, restored after (baked-in label would double with component's own overlay).
- Figma "Option 2" (`1153:6110` section) is the canonical portrait set, not "Option 1" (`552:945`).

**Errors encountered:**
- `preview_screenshot` returns white at any scrolled position after `scrollIntoView` — fix: tall viewport (4000px+) + `scrollTo(0)`.
- Figma REST `/images` render timeout: >3 large nodes at scale=1 or any at scale=2.
- WebFetch small model reported wrong H1 headline (nav copy vs hero H1).

**Result:**
- `/kleos-v3` live on GitHub Pages at `https://backspaceoddity.github.io/stape-website/kleos-v3`
- Commits: `64fc0aa` → `0709ba7` (3 commits)

---

## 2026-04-14 — v2 pixel-perfect pipeline + first mechanical Gate 3 run (revert'нуто 2026-04-23)

**What happened:**
- Built Figma → component pipeline for Stape v2 homepage (file `DycBk4R0tH1h3XH1F2xifX`, node `310:840`).
- Extracted + converted 3 sections (hero, metrics-band, pain-scenarios) via `get_design_context` → `scripts/figma-process-section.mjs` → `components/v2/*.tsx`.
- Mounted on `app/v2/page.tsx` (initially with absolute offsets — failed), rebuilt as flow-stack.
- Wrote `scripts/verify-pixel-perfect.mjs` (Gate 3): Figma REST PNG vs puppeteer preview, pixelmatch diff, verification.md report with ❌/✅ per section.
- First mechanical Gate 3 run: hero 24.20% / metrics-band 36.55% / pain-scenarios 30.12% diff — all ❌ fail against 3% threshold.

**Decisions made:**
- Generated components are immutable — regeneration only, never hand-edit.
- Sections stack via flow; NO `top-[Npx]` between sections at page level.
- Tailwind sanitization at CONVERT time (col-N → col-start-N, row-N → row-start-N).
- Gate 3 threshold: 3% pixel diff per section.
- Failures left un-fixed this session — next session diagnoses via diff.png per section.

**Errors encountered:**
- `col-N`/`row-N` = unknown Tailwind utilities → grid auto-placement broke MetricsBand layout. Fixed in pipeline.
- Cross-section absolute offsets in page.tsx caused PainScenarios to overlap MetricsBand. Fixed with flow-stack.
- First verify run crashed on hero because root is `display:contents`. Fixed with bbox-crop fallback.

**Result:**
- Infrastructure: `scripts/figma-process-section.mjs`, `scripts/verify-pixel-perfect.mjs`, `web-output/stape-v2/node-map.json` (with verified bbox), `web-output/stape-v2/verification.md`.
- Generated: `components/v2/{Hero,MetricsBand,PainScenarios}.tsx`, `public/v2-assets/<section>/*` (24 assets total).
- `app/v2/page.tsx`: flow-stack mount of 3 sections.
- Next session: diagnose per-section diffs, fix generator (not components), regenerate, re-verify.

---

## 2026-04-08 — Journal sync + Visual Edit mode documented

**What happened:**
- Ran project-journal at session end
- Synced STATE.md to include Visual Edit Mode (previously untracked in journal)
- Updated FILES.md with edit mode files

**Decisions made:**
- n/a

**Errors encountered:**
- n/a

**Result:**
- STATE.md and FILES.md now reflect current project state including edit mode feature

---

## 2026-04-08 — About Us v2 content: first draft + iterations

**What happened:**
- Fetched and analyzed all brand strategy docs from Notion (Brand Summary, Brand Positioning, Brand Platform, Brand Personality, PMF Narrative, Product Analysis)
- Fetched current about-v2 page from GitHub Pages
- Wrote full About Us v2 content draft including: hero, Our Story manifesto, key numbers, services, values, vision, open positions
- Manifesto condensed from ~15 paragraphs to 3 per user feedback ("too long, nobody will read it")
- Headline iterated from generic WHY statement → "Payroll is a job not to be done." → added subline "That's why we exist — and why one day we won't have to."
- User flagged subline is too long for design (5 lines) — offered 4 shorter alternatives, not yet selected

**Decisions made:**
- Manifesto tone: W+K agency style (bold, provocative, human, declarative)
- Positioning: Job Not To Be Done is the core narrative thread
- Headline direction: direct JNTBD statement + paradox of self-obsolescence
- User approved 3-paragraph manifesto as "great for first version"
- "Payroll is a job not to be done" confirmed as headline — level of boldness is right

**Errors encountered:**
- None

**Result:**
- `about-v2-content.md` created with full page content
- Content verified against brand strategy docs (WHY, values, JTBD audiences, positioning all reflected)
- Identified gaps: Super App positioning omitted (intentional), "default layer" vision implicit not explicit

### 2026-05-13 — orphan session rolled up (PID no longer alive)

- Timeline file `2026-05-13-1556-42774-yegorkorobeynikov.md` had 2 user prompts, 91 tool calls, 0 errors. Full raw log has been deleted (retention policy).

### 2026-05-13 — orphan session rolled up (PID no longer alive)

- Timeline file `2026-05-13-1651-53101-yegorkorobeynikov.md` had 12 user prompts, 189 tool calls, 0 errors. Full raw log has been deleted (retention policy).

### 2026-05-13 — orphan session rolled up (PID no longer alive)

- Timeline file `2026-05-13-1842-76418-yegorkorobeynikov.md` had 6 user prompts, 217 tool calls, 0 errors. Full raw log has been deleted (retention policy).

### 2026-05-14 — orphan session rolled up (PID no longer alive)

- Timeline file `2026-05-13-2108-7646-yegorkorobeynikov.md` had 1 user prompts, 24 tool calls, 0 errors. Full raw log has been deleted (retention policy).

### 2026-06-03 — orphan session rolled up (PID no longer alive)

- Timeline file `2026-06-03-1000-12414-yegorkorobeynikov.md` had 11 user prompts, 171 tool calls, 0 errors. Full raw log has been deleted (retention policy).
