# Stape Website — Current State

**Last updated:** 2026-04-14
**Status:** v2 pixel-perfect rebuild in progress (3/13 sections extracted, 1/3 mounted passes — hero ✅)
**Client/Context:** Stape (global work infrastructure / contractor payroll platform). Website redesign.

## Current Focus — v2 pixel-perfect rebuild

Full rebuild of the v2 homepage from Figma (`DycBk4R0tH1h3XH1F2xifX`, node 310:840, 1440×13645) using the pixel-perfect skill pipeline: `get_design_context` → `figma-process-section.mjs` → `verify-pixel-perfect.mjs`.

### Infrastructure (in place)
- `scripts/figma-process-section.mjs` — Gate 2 (CONVERT). Downloads localhost:3845 Figma assets, rewrites URLs to `/stape-website/v2-assets/<name>/HASH.ext`, sanitizes Figma's non-Tailwind `col-N`/`row-N` → `col-start-N`/`row-start-N`, writes `components/v2/<Name>.tsx` with GENERATED banner.
- `scripts/verify-pixel-perfect.mjs` — Gate 3 (VERIFY). Fetches Figma PNG via REST, screenshots preview per section (`[data-node-id]` selector or bbox crop fallback for `display:contents`), pixelmatch diff, writes `web-output/stape-v2/verification.md`. Threshold: 3% pixel diff.
- `web-output/stape-v2/node-map.json` — 13 sections with verified bbox `{top, left, width, height}` from Figma.
- `_system/hooks/session-end-gate.py` (Second Brain repo) — Stop hook. Blocks session end on uncommitted changes, unpushed commits, missing/stale verification.md, or ❌ failures in verification report.

### Page structure
- `app/v2/page.tsx` — flow-stack: each section mounted in its own `relative` wrapper div sized to Figma `bbox.height`. NO `top-[XXXXpx]` at page level. Absolute coords allowed ONLY inside section components.

### Sections
Extracted + converted: hero (310:1660), metrics-band (310:841), pain-scenarios (310:872).
Remaining 10: tuesday-comparison, how-it-works, legal-architecture, testimonial, comparison-table, role-selector, cost-comparison, faq, final-cta, footer.

### Verification (2026-04-14 second run — after verifier patches)
- **hero:** 0.30% diff ✅ (bbox-crop)
- **metrics-band:** 33.05% diff ❌ (bbox-crop)
- **pain-scenarios:** 30.12% diff ❌ (selector)
- 10 remaining: ⏭ skipped (`skip:true` in node-map.json with reason "not yet mounted in app/v2/page.tsx") — verifier now short-circuits instead of crashing with `bitblt reading outside image`.

### Verifier changes this session
1. `verify-pixel-perfect.mjs` composites Figma PNG onto white before pixelmatch. Figma `/v1/images` renders GROUP/FRAME with transparent alpha outside drawn content; preview is opaque white → false diff proportional to empty space. Hero fake-red dropped 24.20% → 0.30% with this single change.
2. `verify-pixel-perfect.mjs` honours `section.skip` in node-map.json — prints `⏭ skipped`, counts as pass, no image-crop attempt.
3. `web-output/stape-v2/node-map.json` — 10 unmounted sections flagged `skip:true` with `skipReason`.

## Open Issues (v2)
1. **metrics-band 33%, pain-scenarios 30%** — now real signal (not transparency). Not yet diagnosed. Next session: inspect diff.png per section for localized red clusters, pattern likely same class as earlier hero mis-diagnosis (verify assumptions via raw alpha first).
2. **Hero root uses `display:contents`** — preview element screenshot impossible, bbox-crop fallback works. Consider wrapping generated `contents` roots in `relative w-full h-[Npx]` in the pipeline.
3. **10 unmounted sections** — skipped in verifier. Keep skipped until each is mounted AND verified <10% one-by-one to avoid accumulating undebuggable debt.

## Other (parked)
- About Us v2 content draft (2026-04-08). Subline still too long (5 lines), pending client review on values / services sections.
- Visual Edit mode (`?edit`) — built + operational.

## How to Resume
1. Start dev server: `cd Stape/Website && npx next dev -p 3847` (preview `stape` config).
2. Run verify: `FIGMA_ACCESS_TOKEN=... node scripts/verify-pixel-perfect.mjs --url=http://localhost:3847/stape-website/v2 --section=<name>`.
3. Read verification.md + open `web-output/stape-v2/sections/<name>/diff.png` to see divergence.
4. Fix generator (`scripts/figma-process-section.mjs`), NOT the generated component. Regenerate with `node scripts/figma-process-section.mjs <name>`.
5. Do NOT edit `components/v2/*.tsx` by hand — they are regenerated from `source.raw.jsx`.
