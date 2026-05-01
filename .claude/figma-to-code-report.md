# Figma-to-Code Implementation Report: Kleos Homepage

> This document describes the strategies, approaches, successes and failures of implementing a Figma design as pixel-perfect code using Claude Code + Figma MCP. Written for another Claude Code instance to learn from.

## Project Context

- **Project**: Stape/Kleos marketing website (Next.js 14, App Router, Tailwind CSS)
- **Task**: Implement a full homepage from Figma mockup (file key `hIMvjVlKLiqksKDrvULUvI`, node `1:2`)
- **Page dimensions**: 1440 x 11336px (13 sections)
- **Output file**: `app/figma/page.tsx` (~720 lines, single monolithic `'use client'` component)
- **Deploy target**: Vercel (auto-deploy), with basePath `/stape-website` for GitHub Pages fallback
- **Font**: ABC Schengen A Cyrillic with `fontFeatureSettings: "'ss02'"` and `"'ss02', 'ss03'"` for display text

---

## Technical Strategy

### Phase 1: Section-by-Section Implementation

The Figma page (1440x11336) was broken into 13 discrete sections, each implemented top-to-bottom:

| Section | Figma Node | Y-offset | Height | Description |
|---------|-----------|----------|--------|-------------|
| Navbar | `1:569` | 0 | 80px | Sticky nav with logo, links, CTAs |
| Hero | — | 80 | 862px | Trust badges + headline + CTA card |
| Metrics 1 | — | 942 | 160px | 4 stat cards in flex row |
| Product Screenshot | `1:53` | 1202 | 993px | Purple bg + full-width dashboard screenshot |
| Metrics 2 | — | 2195 | 160px | 4 stat cards |
| Painfully Familiar | `1:55` | 2455 | 1016px | Purple bg + 8 cards in absolute grid with rotations |
| Two Ways | `1:223` | 3571 | 1117px | Dark card (timeline) + purple card side-by-side |
| From Payroll | `1:143` | 4786 | 545px | Purple bg + heading + timeline card |
| Legal Architecture | `1:376` | 5431 | 990px | Feature cards + dark "What Disappears" section |
| Teams | `1:188` | 6516 | 950px | Purple bg + testimonial + Google Cloud + stat cards |
| Three Options | `1:612` | 7566 | 798px | Comparison table (4 columns) |
| How Deep | `1:100` | 8464 | 988px | Purple bg + role tabs + person photo |
| What It Costs | — | 9452+ | 837px | Calculator + Kleos pricing side-by-side |

### Phase 2: Pixel-Perfect QA (Iterative)

After initial implementation, QA was done by:
1. Taking Figma screenshots (`get_screenshot`) of each section
2. Taking site screenshots (Playwright or panoramic-screenshot tool) at 1440px viewport
3. Comparing side-by-side and measuring pixel differences
4. Using `get_design_context` for exact CSS values when screenshots diverged

---

## Key Tools & How They Were Used

### 1. Figma MCP (`get_design_context`)
- **What it gives you**: Generated React+Tailwind code for any Figma node, plus asset download URLs
- **Critical insight**: The generated code is a STARTING POINT, not copy-paste ready. It uses absolute positioning, generic class names, and doesn't match your project's patterns.
- **Best use**: Extract exact values — font sizes, paddings, border-radii, shadows, colors, gap sizes. Then translate into your component structure.
- **Gotcha**: `get_design_context` output includes `items-start` on Figma auto-layout frames. This is accurate to Figma but may not mean "left-aligned" in your implementation — at 1440px width with `p-[50px]`, `items-start` + `w-[1340px]` content fills perfectly and looks centered.

### 2. Figma MCP (`get_screenshot`)
- **Best for**: Visual comparison — take a screenshot of a Figma node and compare with your site
- **Limitation**: JPEG compression makes pixel-level color comparison unreliable. Use for layout/structure, not exact colors.

### 3. Figma MCP (`get_metadata`)
- **Used for**: Getting exact node dimensions, positions, child node IDs
- **Critical for**: Verifying section heights match (all matched within ±1px after implementation)

### 4. Playwright (browser_evaluate)
- **Used for**: Measuring actual rendered dimensions on the deployed site
- **Example**: Measuring flex child widths to detect unequal flex distribution (641px vs 689px)

### 5. Panoramic Screenshot Tool
- **Custom tool** at `~/Cursor/Home space/Backspace Oddity/Internal projects/panoramic-screenshot`
- **Used for**: Full-page screenshots of the deployed site, removing sticky headers/footers
- **Better than Playwright screenshots** for full-section comparison

---

## Successful Solutions

### 1. Purple Background Sections (5 sections share one image)
All 5 purple sections use the SAME `purple-bg.png` (2835x3544px) as a background:
```jsx
<div className="absolute inset-0">
  <img src="/images/purple-bg.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
  <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
  <div className="absolute inset-0 bg-black/30" />
</div>
```
- **Verified via MD5 hash**: Downloaded Figma assets for all 5 sections, confirmed they're the identical image
- **Key math**: At 1440px width, the image width (2835) scales to exactly 1440 (ratio 0.508). There is ZERO horizontal overflow. Only vertical crop varies per section height.
- **Overlay layers**: `bg-black/10 mix-blend-overlay` + `bg-black/30` for the darkening effect (extracted from Figma)

### 2. Section Height Verification
Every section height was verified against Figma using `get_metadata`:
```
Navbar: 80 ✅, Hero: 862 ✅, Metrics1: 160 ✅, Product: 993 ✅,
Metrics2: 160 ✅, Painfully: 1018 ✅, Two Ways: 1117 ✅,
From Payroll: 546 ✅, Legal: 990 ✅, Teams: 950 ✅,
Three Options: 798 ✅, How Deep: 988 ✅, What It Costs: 837 ✅
```

### 3. Pain Points Card Grid (Absolute Positioning with Rotations)
The "Painfully Familiar" section has 8 cards in a 4x2 grid, some rotated:
```jsx
<div className="relative" style={{ width: 1340, height: 670 }}>
  {painPoints.map((p, i) => {
    const row = i < 4 ? 0 : 1;
    const col = i % 4;
    const size = row === 0 ? 320 : 319.25;
    const gapX = row === 0 ? 340 : 340.25;
    const x = col * gapX + (row === 1 && col >= 2 ? -1.29 : 0);
    const y = row === 0 ? 4.1 : 344.1 + (col >= 2 ? 5 : 0);
    const rotations = { 1: -1.49, 2: 0.43, 6: 0.65 };
    // ...absolute positioned cards
  })}
</div>
```
- **Strategy**: Extracted exact x, y, width, height, rotation from `get_design_context` for each card
- **Why absolute**: Figma uses a flat grid layout with specific per-card rotations — CSS Grid/Flex can't replicate this

### 4. Equal Flex Widths Fix (`w-[calc(50%-5px)]`)
The "From Payroll" section has two side-by-side elements that should be equal width:
- **First attempt**: `flex-1 min-w-0` — resulted in 641px vs 689px (unequal)
- **Second attempt**: Added `overflow-hidden` — still 641px vs 689px
- **Root cause**: Content minimum widths were overriding flex distribution. The heading text on the left had a smaller minimum width than the timeline card on the right.
- **Solution**: Explicit `w-[calc(50%-5px)]` for both children (5px = half of `gap-[10px]`)
- **Result**: Both 665px ✅

### 5. Page Max-Width Centering
- **Problem**: On viewports wider than 1440px, all content appeared left-aligned because `px-[50px]` starts from the viewport edge
- **Solution**: `<main className="max-w-[1440px] mx-auto">` — caps page at design width and centers it
- **Figma context**: Figma design is exactly 1440px wide. This ensures the site looks identical to the mockup at any viewport width.

---

## Mistakes & Failures

### 1. WRONG DIAGNOSIS: `object-position` for "left-aligned" complaint
- **User said**: "центрирование картинок не совпадает с макетом" (image centering doesn't match mockup)
- **My diagnosis**: Background image crop positioning is wrong → changed `object-position` from `50% 50%` to `50% 33%`
- **Why it was wrong**: At 1440px width, the purple-bg.png has ZERO horizontal overflow (2835px image scales to exactly 1440px). Changing `object-position` X value has NO visible effect. The Y value change (from 50% to 33%) only shifts the vertical crop, which the user didn't complain about.
- **What the user actually meant**: Content/foreground elements appeared left-aligned on wider viewports (their monitor was likely >1440px). The fix was `max-w-[1440px] mx-auto` on the page wrapper.
- **Lesson**: Before changing CSS, calculate whether the property can even have an effect. For `object-cover`, you need overflow in that axis for `object-position` to matter.

### 2. Multiple Failed Flex Approaches Before Finding the Fix
For the "From Payroll" equal-width issue:
1. `flex-1` alone → unequal (content minimum widths differ)
2. `flex-1 min-w-0` → still unequal (min-width: 0 not enough when content forces width)
3. `flex-1 min-w-0 overflow-hidden` → still unequal
4. `w-[calc(50%-5px)]` → fixed ✅

**Lesson**: When `flex-1` doesn't equalize widths, measure the actual rendered widths (via Playwright), check `scrollWidth` to confirm content minimum widths are the issue, then switch to explicit width calculations.

### 3. Not Clarifying User's Complaint Earlier
- User said "images are left-aligned" → I assumed background images → wasted a cycle
- Should have asked: "Which specific images? Can you point to an example?"
- Or should have compared at the user's actual viewport width, not just 1440px

---

## Patterns That Worked

### Consistent Section Structure
Every purple section follows the same pattern:
```jsx
<section className="relative overflow-hidden min-h-[Xpx] mt-[50px|100px]">
  {/* Background layer */}
  <div className="absolute inset-0">
    <img src="/images/purple-bg.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
    <div className="absolute inset-0 bg-black/30" />
  </div>
  {/* Content layer */}
  <div className="relative px-[50px] py-[50px]">
    {/* Section-specific content */}
  </div>
</section>
```

### Font Feature Settings Pattern
```jsx
const ff = { fontFeatureSettings: "'ss02'" } as const;          // body text
const ffDisplay = { fontFeatureSettings: "'ss02', 'ss03'" } as const;  // display headings
```
Applied via `style={ff}` or `style={ffDisplay}` on every text element.

### Data-Driven Rendering
All repeating content (pain points, timeline steps, comparison rows, feature cards, etc.) was extracted into const arrays at the top of the file and rendered with `.map()`. This made iteration faster during QA.

---

## Workflow Summary

```
1. get_design_context(section_node) → extract exact CSS values
2. Implement section in code using extracted values
3. get_screenshot(section_node) → Figma reference image
4. Take site screenshot at 1440px viewport → compare
5. If mismatch: measure rendered dimensions (Playwright), identify deltas, fix
6. Repeat for each section
7. Full-page QA pass comparing all sections
```

### What I'd Do Differently Next Time

1. **Set `max-w-[1440px] mx-auto` from the start** — matches Figma canvas width, prevents all viewport-width issues
2. **Ask the user's viewport width upfront** — "what resolution are you viewing at?"
3. **For `flex-1` layouts: always verify with measurements** — don't assume flex distribution will work; measure immediately after implementing
4. **For `object-position`: calculate overflow first** — if rendered_size == container_size on an axis, position on that axis is irrelevant
5. **Use `get_design_context` for exact values, `get_screenshot` for visual verification** — don't try to extract pixel values from screenshots
6. **Verify background images are identical before assuming** — I spent time downloading and MD5-comparing Figma assets for all 5 purple sections; this confirmed they use the same image, saving implementation time

---

## Technical Stack

```json
{
  "framework": "Next.js 14.2 (App Router)",
  "styling": "Tailwind CSS 3.4",
  "font": "ABC Schengen A Cyrillic (local, via @font-face in globals.css)",
  "deployment": "Vercel (primary), GitHub Pages (fallback via static export)",
  "basePath": "/stape-website",
  "figma_file": "hIMvjVlKLiqksKDrvULUvI",
  "figma_page_node": "1:2",
  "page_width": 1440,
  "page_height": 11336,
  "implementation": "Single monolithic page component (~720 lines)"
}
```

## Files Involved

- `app/figma/page.tsx` — main implementation (~720 lines)
- `public/images/purple-bg.png` — shared background image (2835x3544px)
- `public/images/product-screenshot.png` — dashboard screenshot
- `public/images/person-closeup.png`, `person-desktop.png` — "How Deep" section photos
- `public/images/google-cloud-sphere.png`, `google-cloud-logo.svg` — Teams section
- `public/images/avatar-sarah.png` — testimonial avatar
- `public/images/iso-badge.png` — ISO 27001 badge
- `next.config.js` — conditional basePath and static export config
