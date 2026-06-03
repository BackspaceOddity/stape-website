# Stape Website (Kleos) — Current State

**Last updated:** 2026-06-04
**Status:** Live on GitHub Pages + kleos.io production launched. /kleos-v3 image-quality test route added.
**Client:** Kleos (rebranded Stape). Production URL: https://backspaceoddity.github.io/stape-website/
**Repo:** https://github.com/BackspaceOddity/stape-website

---

## What the site is

Next.js 14 + TypeScript + Tailwind CSS + Framer Motion. Static export for GitHub Pages (`output: 'export'`, `basePath: '/stape-website'`). All pages are server-component safe; edit-mode toolbar uses `'use client'` + `/api/save-draft` (dev-only).

Rebranded Stape→Kleos by Anna Barinova on 2026-05-01 (commit `3f9db9e`).

## Current route map

| Route | Status | Notes |
|---|---|---|
| `/` | ✅ Live | 14-section homepage (see below) |
| `/about` | ✅ Live | Hero + story + values + team + careers |
| `/pricing` | ✅ Live | |
| `/contractor-of-record` | ✅ Live | |
| `/employer-of-record` | ✅ Live | |
| `/solutions/founders` | ✅ Live | |
| `/use-cases/global-hiring` | ✅ Live | |
| `/use-cases/ip-transfer` | ✅ Live | |
| `/industry/web3` | ✅ Live | Stablecoin-friendly framing |
| `/blog` | ✅ Scaffold | No real posts |
| `/careers` | ✅ Scaffold | |
| `/about-v2` | 🧪 Dev-only | Alternative about page draft |
| `/kleos-v3` | 🧪 Image QA | Figma-exported images (no compression) vs kleos.io Webflow for quality diff |
| `/v2` | 🗑 Legacy | Pixel-perfect branch — reverted, do not touch |

## Homepage sections (top to bottom)

1. HeroV2
2. TrustBadgeBar
3. MetricsV2
4. TriggerBar
5. WorkThatDisappearsV2
6. TimelineV2
7. ComplianceFirewall
8. SocialProofV2
9. ComparisonTableV2
10. PayrollGeekLevel
11. PricingComparison
12. FAQV2
13. CTAV2
14. Footer

## About page sections

- Hero + hero image (Kleos dashboard)
- Metrics band (600+, 150+, $40M+, 0 failures)
- Client logos (SVG wordmarks — Vertex AI, Beacon Labs, Nexus Studios, Lightfold, Orbital, Basecamp)
- Our Story (W+K manifesto style, 3 paragraphs)
- Values (Honesty, Speed through high-agency, Having fun)
- What We Do (4 product pillars)
- Leadership (3 mock team members)
- Careers
- Footer

## Key technical notes

- **basePath:** `/stape-website` — still old Stape name, not updated after rebrand
- **Edit mode:** `?edit` query param activates visual comment toolbar (dev only)
- **Visual edits:** `_edit-threads.json` — currently 0 pending
- **Static export:** `next.config.js` → `output: 'export'` in production, `undefined` in dev (needed for `/api/save-draft`)
- **Fonts:** Custom fonts via `app/fonts/` + `app/globals.css`
- **Images:** Unoptimized (GitHub Pages constraint)

## Open issues / tech debt

1. **`basePath: '/stape-website'`** — inconsistent with Kleos brand. Changing requires updating GitHub Pages deployment config + all internal links.
2. **`app/v2/` legacy route** — pixel-perfect pipeline artifacts from reverted branch. Can be cleaned up.
3. **Stop hook Gate 3 false positive** — `web-output/stape-v2/verification.md` triggers pixel-perfect stale warning on any `.tsx` change. Not a real issue; legacy from revert.
4. **`/kleos-v3` gallery card filenames** — `card2-yellow`, `card3-city` etc. no longer match Option-2 portrait colours; cosmetic only.
5. **MetricsV2 on `/about`** — still shows `$40M+`; fix updated only the shared component (affects homepage). About page has its own metric band — needs separate fix.

## How to run locally

```bash
cd "Client projects/Stape/Website"
npx next dev -p 3850
# Preview: http://localhost:3850/stape-website/
```

## Historical context (archived)

The pixel-perfect Figma→Next.js pipeline (`scripts/figma-process-section.mjs`, `scripts/verify-pixel-perfect.mjs`, `app/v2/`) was built 2026-04-14 and reverted by Anna on 2026-04-23. Relevant learnings preserved in LEARNINGS.md. Branch snapshot: `local-figma-verify-2026-04-14`.
