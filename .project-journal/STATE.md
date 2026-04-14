# Stape Website — Current State

**Last updated:** 2026-04-14
**Status:** v2 pixel-perfect rebuild in progress (3/13 sections extracted, **2/3 mounted pass <3% — hero ✅ metrics-band ✅**, pain-scenarios 19.42% pending)
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

### Verification (2026-04-14 final run)
- **hero:** 0.27% ✅ (bbox-crop)
- **metrics-band:** 0.37% ✅ (bbox-crop)
- **pain-scenarios:** 19.42% ❌ (selector) — separate class of mismatch
- 10 unmounted: ⏭ skipped

### Pipeline changes this session (cumulative)
1. **Transparency fix** — `verify-pixel-perfect.mjs` composites Figma PNG onto white before pixelmatch. Hero 24.20% → 0.30%.
2. **Skip flag** — `node-map.json` + verifier support `skip:true`/`skipReason`. 10 unmounted sections stop crashing verify.
3. **gapBefore** — `node-map.json` stores Figma inter-section gap; `app/v2/page.tsx` reads node-map and renders sections with `marginTop=gapBefore`. Metrics-band 33% → 5.74%.
4. **Generator top-rewrite** — `figma-process-section.mjs` rewrites `top-[Npx]` → `top-[(N − bbox.top)px]` where N ≥ bbox.top, with residual-coord assertion. Metrics-band 5.74% → 3.25%.
5. **Neighbor-aware crop + threshold 0.15** — `node-map.json` stores `bleed:{top,bottom}` from Figma REST descendant walk; verifier trims `prev.bleed.bottom` / `next.bleed.top` off both figma.png and preview.png symmetrically before pixelmatch; threshold 0.1 → 0.15 silences font-AA. Metrics-band 3.25% → **0.37%**.

## Decision threads (resolved this session)
- `Second Brain/docs/DECISIONS-INBOX/stape-metrics-band-homepage-absolute-coords.md` — top-rewrite + asymmetric-heuristic rationale.
- `Second Brain/docs/DECISIONS-INBOX/stape-verifier-neighbor-aware-crop.md` — bleed geometry + threshold 0.15.

Both promoted to `web-architect` HEURISTICS (#6, #7, #12).

## Open Issues (v2)
1. **pain-scenarios 19.42%** — not neighbor-bleed (both neighbors have zero bleed toward it). Next session: inspect diff.png per section for localized red clusters, likely content-level class (font, asset, or layout within the section). Open a new thread when picking it up.
2. **Hero root uses `display:contents`** — preview element screenshot impossible, bbox-crop fallback works. Consider wrapping generated `contents` roots in `relative w-full h-[Npx]` in the pipeline.
3. **10 unmounted sections** — skipped in verifier. Keep skipped until each is mounted AND verified <3% one-by-one to avoid accumulating undebuggable debt.

## Other (parked)
- About Us v2 content draft (2026-04-08). Subline still too long (5 lines), pending client review on values / services sections.
- Visual Edit mode (`?edit`) — built + operational.

## How to Resume
1. Start dev server: `cd Stape/Website && npx next dev -p 3847` (preview `stape` config).
2. Run verify: `FIGMA_ACCESS_TOKEN=... node scripts/verify-pixel-perfect.mjs --url=http://localhost:3847/stape-website/v2 --section=<name>`.
3. Read verification.md + open `web-output/stape-v2/sections/<name>/diff.png` to see divergence.
4. Fix generator (`scripts/figma-process-section.mjs`), NOT the generated component. Regenerate with `node scripts/figma-process-section.mjs <name>`.
5. Do NOT edit `components/v2/*.tsx` by hand — they are regenerated from `source.raw.jsx`.
