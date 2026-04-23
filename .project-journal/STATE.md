# Stape Website — Current State

**Last updated:** 2026-04-14
**Status:** v2 pixel-perfect rebuild in progress (3/13 sections extracted, 0/13 verification-pass)
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

### Verification (2026-04-14 run)
- **hero:** 24.20% diff ❌ (bbox-crop mode, root is `contents`)
- **metrics-band:** 36.55% diff ❌ (bbox-crop mode)
- **pain-scenarios:** 30.12% diff ❌ (selector mode, has own box)
- 10 remaining sections: 💥 bitblt out-of-image (expected — not yet mounted in page.tsx)

All 3 above threshold. Artifacts: `web-output/stape-v2/sections/<name>/{figma,preview,diff}.png`.

## Open Issues (v2)
1. **3/3 mounted sections fail 3% threshold.** Root cause not yet diagnosed — likely font-loading (ABC Schengen), asset scaling (Figma @2x vs preview dpr=2), or remaining Tailwind class mismatches. Next session: open the diff.png per section, identify which pixel regions diverge, trace back to source classes.
2. **Hero root uses `display:contents`** — preview element screenshot impossible, bbox-crop fallback works but is less precise. Consider wrapping generated `contents` roots in `relative w-full h-[Npx]` in the pipeline.
3. **10 unextracted sections** — need `get_design_context` pass each (Gate 1).

## Other (parked)
- About Us v2 content draft (2026-04-08). Subline still too long (5 lines), pending client review on values / services sections.
- Visual Edit mode (`?edit`) — built + operational.

## How to Resume
1. Start dev server: `cd Stape/Website && npx next dev -p 3847` (preview `stape` config).
2. Run verify: `FIGMA_ACCESS_TOKEN=... node scripts/verify-pixel-perfect.mjs --url=http://localhost:3847/stape-website/v2 --section=<name>`.
3. Read verification.md + open `web-output/stape-v2/sections/<name>/diff.png` to see divergence.
4. Fix generator (`scripts/figma-process-section.mjs`), NOT the generated component. Regenerate with `node scripts/figma-process-section.mjs <name>`.
5. Do NOT edit `components/v2/*.tsx` by hand — they are regenerated from `source.raw.jsx`.
