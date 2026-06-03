# Learnings

> **⚠️ Историческая запись.** Эти learnings получены в экспериментальной Figma-verify ветке 2026-04-14, которая на `main` была revert'нута Анной 2026-04-23. Само код-направление откатилось, но **уроки про Figma Dev Mode / pixel-perfect pipeline остаются переносимыми** (применимы в любом будущем подходе к Figma→web). Snapshot ветки — в `local-figma-verify-2026-04-14`.

---

## 2026-06-04 — Figma gallery export: Option 1 vs Option 2

### [CROSS-PROJECT] Figma design files can have multiple named variants — always verify which is canonical
- **What happened:** `[Deliverables] Kleos` has two sections at top level: "Option 1" (`552:945`) and "Option 2" (`1153:6110`). Both contain the same 5 gallery portrait cards at the same y-position. I exported from Option 1 — the rejected set. Canonical is Option 2.
- **Root cause:** Didn't check which section parent the node URL pointed to before exporting. Picked the first match.
- **Rule:** When a Figma file has named sections ("Option 1/2/3", "V1/V2", "Approved/Draft") — check the section parent of the node URL before exporting. `node.parent.name` tells you which variant.

### [LOCAL] Figma cards with baked-in label boxes: hide before exporting portrait-only
- **Pattern:** Gallery cards in this file have a "Container" GROUP (585×258) baked at the bottom with label+phrase. If the component renders its own overlay (which WorkThatDisappearsV2 does), exporting with label visible = doubling. Fix: `n.visible = false` before export, `n.visible = true` after.

### [LOCAL] preview_screenshot returns white at programmatic scroll positions
- **Pattern:** Works correctly at scrollY=0. Returns white after `scrollIntoView` or `instant` scroll to mid-page. Fix: set viewport height to 4000px+ so target section falls within the initial viewport; capture at scrollY=0.

---

## 2026-06-03 — Экспорт Figma-изображений + сравнение качества

### [LOCAL] WebFetch small-model галлюцинирует точечные цитаты
- **Что случилось:** WebFetch вернул headline "Payroll that disappears so you can build" вместо реального H1 "Payroll was never the job you signed up for" с kleos.io. Строчка есть на странице, но в nav-dropdown, не в H1.
- **Root cause:** WebFetch обрабатывает HTML через small model — навигационный copy путается с hero headline.
- **Rule:** При цитировании конкретного текста — второй WebFetch с prompt «copy verbatim, no paraphrase» для верификации. Числа и структуру small model галлюцинирует реже.

### [LOCAL] Figma REST API /images: таймаут при батче > 3 крупных нод
- **Что случилось:** Запрос 8 нод с `scale=2` — `Render timeout`. С `scale=1` и батчами по 3 — работает.
- **Rule:** Не больше 3 нод за раз при `scale=1`; при `scale=2` — по 1-2.

### [LOCAL] `window.scrollTo(0,0)` не работает при browser scroll restoration
- **Fix:** `history.scrollRestoration = 'manual'` перед `scrollTo` — отключает авто-restore.

### [CROSS-PROJECT] Next.js `unoptimized: true` vs Webflow: честное сравнение качества
- **Паттерн:** `unoptimized: true` = PNG отдаётся без сжатия. Webflow автоматически конвертирует в WebP + оптимизирует. Это корректная точка сравнения при жалобах на качество изображений в Webflow.

---

## 2026-05-13 — DS token provenance gap in Figma builds

### [CROSS-PROJECT] CRITICAL: Figma DS colors/fonts ≠ Tailwind/Next.js tokens
- **What happened:** Built Figma COR block variant using Next.js Tailwind token values (`#1A2F2B`, `#00B887`, `Outfit`) instead of actual Kleos DS tokens (`#141414`, `#009423`, `Kleos Schengen A Cyrillic`). Two completely different palettes. User caught it immediately.
- **Root cause:** Never read DS token nodes (75:9810 colors, 212:887 fonts) before building. Used web-layer Tailwind config as if it were the Figma DS source of truth — it is not. Tailwind config reflects brand decisions; Figma DS is the canonical visual spec. They can diverge.
- **Canonical DS tokens for Kleos (from nodes 75:9810 + 212:887 + 620:3766):**
  - Font: `Kleos Schengen A Cyrillic` (Regular + Medium) — NOT Outfit, NOT Inter, NOT ABC Schengen A Cyrillic
  - Left card bg: `#141414` (near-black)
  - Right card bg: `#009423` (green, rgba(0,148,35))
  - Pill: `#fefda8` (yellow)
  - Text on cards: white
  - Subheading: `#5b5b5b` (gray)
  - Card padding: 48px all sides, cornerRadius 24px, gap between cards 24px
- **Systemic fix landed:** Extended `pre-figma-gate.py` with hardcoded-hex-without-DS-token-read warning (Option A, minimal-diff). BSO issue filed for dedicated `require-ds-grounding-before-figma-build.py` hook (Option B).
- **Rule (MANDATORY):** Before ANY `figma_execute` build touching colors/fonts — read the canonical DS component OR token nodes first. `figma_get_variables` / `figma_get_styles` / read the actual node with `figma_execute` inspect. Tailwind config is web-layer, NOT Figma DS source of truth.
- **Pattern:** `creation-without-prior-observation-antipattern` — third incident this project.

---

## 2026-05-13 — SVG mock logos в /about + resume workflow

### [LOCAL] Stop hook Gate 3 — false positive после rebrand
- **What happened:** Stop hook жалуется на stale `web-output/stape-v2/verification.md` когда изменяем `app/about/page.tsx`.
- **Why:** Gate 3 сканирует все изменённые `.tsx` файлы и сравнивает с датой `verification.md`, но pixel-perfect pipeline относится только к `/v2` route (revert'нутая ветка). `/about/page.tsx` к этому pipeline не относится.
- **Rule:** Gate 3 false positive на этом repo — `web-output/stape-v2/` это legacy от revert'нутой ветки. Игнорировать если не работаем над `/v2` route.

---

## 2026-04-14 — v2 pixel-perfect rebuild (Figma-verify branch, revert'нуто 2026-04-23)

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

### [LEARN] Neighbor-aware crop — treat Figma overlap as design data, not as exception
- **What happened:** After fixing generator homepage-absolute coords (metrics-band 5.74% → 3.25%), residual 3.25% broke down as 2.46% bottom-band (pain-scenarios' negative-top decorative children bleeding UP into metrics-band's crop) + 0.80% font AA on 80px ABC Schengen. Per-section bbox-crop cannot distinguish "my pixels" from "neighbor's intentional overlap" — Figma REST exports clip to node bounds but the rendered page preserves authorial bleed.
- **Fix:** Record `bleed:{top,bottom}` per section in node-map at generation time (Figma REST descendant walk: `bleed.top = max(0, section.top − min(child.y))`, `bleed.bottom = max(0, max(child.y+h) − (section.top + section.h))`). At verify time, trim `prevSection.bleed.bottom` rows from top and `nextSection.bleed.top` rows from bottom of BOTH figma.png and preview.png symmetrically before pixelmatch. Raise pixelmatch threshold 0.1 → 0.15 for font-AA. metrics-band 3.25% → **0.37%** ✅.
- **Rule:** Bleed is a design property, co-located with bbox/gapBefore/skip in node-map — the verifier stays generic, node-map stays the single source of truth. Don't fix verifier symptoms with magic numbers; model the design input.
- **Promoted to:** `web-architect` HEURISTIC #12. See `Second Brain/nodes/figma-web-pixel-diff-neighbor-aware-crop.md` for full methodology.

### [LEARN] Generator rewrites homepage-absolute top, not left (asymmetric heuristic)
- **What happened:** Figma Dev Mode emitted `top-[1298px]` `left-[50px]` on MetricsBand's direct children — homepage-absolute, not section-local (the other sections emit section-local). Caused children to render 1298px past section wrapper origin → section visually empty.
- **Fix:** `figma-process-section.mjs` rewrites `top-[Npx]` → `top-[(N − bbox.top)px]` where N ≥ bbox.top. Top threshold robust: section-local is small (0..bbox.height), homepage-absolute is large (≥ bbox.top). Left NOT rewritten by default: both values in same 50-100px page-gutter range → can't disambiguate section-local padding from homepage-absolute.
- **Rule:** Asymmetric magnitudes → clean threshold → rewrite. Symmetric magnitudes → can't disambiguate → leave alone. Add Phase 2 for `left` only if `top`-rewrite alone doesn't close the diff AND diff.png shows horizontal sliding.
- **Assertion:** After rewrite, fail loud if any residual `top-[Npx]` with `N ≥ bbox.height` remains — means the rule missed a case.

### [LEARN] Cross-session work via DECISIONS-INBOX (git) + living agent (HEURISTICS) beats human-as-message-bus
- **What happened:** Three consecutive Stape v2 infra bugs. First resolved via human copy-paste between SB-architect session and Stape-implementer session — slow, error-prone. Second and third via `Second Brain/docs/DECISIONS-INBOX/*.md` thread files (Problem / Hypothesis / Options / Recommendation / Resolution / Promoted rule) + `/invite web-architect` + `/learn` on resolution.
- **Rule:** Non-trivial decisions affecting generators, schemas, or shared contracts → open a thread. Inbox holds decisions (wet clay); agent HEURISTICS hold canon (fired ceramic); project-journal holds status. Each layer has one job.
- **Promoted to:** `Second Brain/nodes/decisions-inbox-cross-session-protocol.md`.

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
