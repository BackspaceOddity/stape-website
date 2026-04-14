# Changelog

## 2026-04-14 — v2 pixel-perfect pipeline + first mechanical Gate 3 run

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
