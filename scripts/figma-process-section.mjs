#!/usr/bin/env node
/**
 * figma-process-section.mjs — pixel-perfect Gate 2 (CONVERT) pipeline.
 *
 * Reads:  web-output/stape-v2/sections/<name>/source.raw.jsx (verbatim from Figma)
 *         web-output/stape-v2/sections/<name>/meta.json      ({ name, nodeId, componentName })
 *
 * Does:   1. Discover all http://localhost:3845/assets/HASH.ext URLs in source.
 *         2. Download each to public/v2-assets/<name>/HASH.ext (skip if exists).
 *         3. Rewrite URLs in source → /v2-assets/<name>/HASH.ext.
 *         4. Write components/v2/<ComponentName>.tsx with autogen header.
 *
 * Rules (per ~/.claude/skills/pixel-perfect/SKILL.md Gate 2):
 *   - URL substitution is the ONLY transform. Tailwind classes, colors, sizes, text — verbatim.
 *   - Generated file gets a banner: "GENERATED — DO NOT EDIT".
 *
 * Usage:
 *   node scripts/figma-process-section.mjs <section-name>
 *   node scripts/figma-process-section.mjs --all
 *
 * Requires Node 18+ (for global fetch). Figma Dev Mode local server must be running on :3845.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const SECTIONS_DIR = join(REPO_ROOT, 'web-output', 'stape-v2', 'sections');
const NODE_MAP_PATH = join(REPO_ROOT, 'web-output', 'stape-v2', 'node-map.json');
const PUBLIC_ASSETS = join(REPO_ROOT, 'public', 'v2-assets');
const OUTPUT_DIR = join(REPO_ROOT, 'components', 'v2');

const ASSET_RE = /http:\/\/localhost:3845\/assets\/([a-f0-9]{40})\.(png|jpg|jpeg|svg|webp)/g;

// Read Next.js basePath from next.config.js so generated asset paths resolve under the deployed prefix.
function readBasePath() {
  const cfg = readFileSync(join(REPO_ROOT, 'next.config.js'), 'utf8');
  const m = cfg.match(/basePath:\s*['"]([^'"]+)['"]/);
  return m ? m[1] : '';
}
const BASE_PATH = readBasePath();

async function downloadAsset(url, destPath) {
  if (existsSync(destPath)) return { skipped: true };
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(destPath, buf);
  return { downloaded: true, bytes: buf.length };
}

async function processSection(name) {
  const sectionDir = join(SECTIONS_DIR, name);
  const sourcePath = join(sectionDir, 'source.raw.jsx');
  const metaPath = join(sectionDir, 'meta.json');

  if (!existsSync(sourcePath)) throw new Error(`Missing ${sourcePath}`);
  if (!existsSync(metaPath)) throw new Error(`Missing ${metaPath}`);

  const source = readFileSync(sourcePath, 'utf8');
  const meta = JSON.parse(readFileSync(metaPath, 'utf8'));

  // 1. Discover assets
  const matches = [...source.matchAll(ASSET_RE)];
  const unique = new Map();
  for (const m of matches) unique.set(m[0], { hash: m[1], ext: m[2] });

  // 2. Download
  const assetDir = join(PUBLIC_ASSETS, name);
  if (!existsSync(assetDir)) mkdirSync(assetDir, { recursive: true });
  const downloads = [];
  for (const [url, { hash, ext }] of unique) {
    const dest = join(assetDir, `${hash}.${ext}`);
    const r = await downloadAsset(url, dest);
    downloads.push({ url, dest, ...r });
  }

  // 3. Rewrite URLs in source
  let rewritten = source.replaceAll(
    /http:\/\/localhost:3845\/assets\/([a-f0-9]{40})\.(png|jpg|jpeg|svg|webp)/g,
    `${BASE_PATH}/v2-assets/${name}/$1.$2`
  );

  // 4. Strip the leading verbatim-comment banner (lines beginning with "// VERBATIM" through the blank line)
  rewritten = rewritten.replace(/^\/\/ VERBATIM[\s\S]*?\n\n/, '');

  // 4b. Normalize Figma's non-Tailwind grid class shortcuts. Figma's Dev Mode emits
  // `col-1`..`col-9` and `row-1`..`row-9` which are NOT Tailwind utilities — they resolve to
  // `grid-column: auto`, breaking the grid layout. Rewrite to `col-start-N` / `row-start-N`.
  // (Arbitrary values like `col-[1/span_2]` are left intact.)
  rewritten = rewritten.replace(/(\bclassName="[^"]*?)\bcol-([1-9])\b/g, '$1col-start-$2');
  rewritten = rewritten.replace(/(\bclassName="[^"]*?)\brow-([1-9])\b/g, '$1row-start-$2');
  // Re-run to catch multiple occurrences in the same className (regex lastIndex progresses).
  rewritten = rewritten.replace(/(\bclassName="[^"]*?)\bcol-([1-9])\b/g, '$1col-start-$2');
  rewritten = rewritten.replace(/(\bclassName="[^"]*?)\brow-([1-9])\b/g, '$1row-start-$2');

  // 4c. Subtract bbox.top from `top-[Npx]` values that are homepage-absolute.
  // Figma Dev Mode inconsistently exports root-child Y as either section-local
  // (small numbers) or homepage-absolute (≥ section.bbox.top). Threshold v >= bboxTop
  // separates them cleanly: section-local values are by definition < bbox.height,
  // and bbox.top is large for any section past the first. Without this, root
  // children render at page-y = wrapper.y + N which puts them far past the
  // section, leaving the section visually empty. (page.tsx comment calls this
  // out as "fix the generator, not page.tsx".)
  const nodeMap = JSON.parse(readFileSync(NODE_MAP_PATH, 'utf8'));
  const sectionEntry = nodeMap.sections.find((s) => s.name === name);
  if (!sectionEntry) throw new Error(`section "${name}" missing from node-map.json`);
  const bboxTop = sectionEntry.bbox.top;
  const bboxHeight = sectionEntry.bbox.height;
  rewritten = rewritten.replace(/\btop-\[(-?\d+)px\]/g, (m, n) => {
    const v = Number(n);
    return v >= bboxTop ? `top-[${v - bboxTop}px]` : m;
  });

  // 4d. Sanity-check: after rewrite, no top-[Npx] should still be ≥ bbox.height.
  // Any remaining large value means the rewrite missed something — fail loudly
  // rather than silently emit broken JSX.
  const leftovers = [...rewritten.matchAll(/\btop-\[(-?\d+)px\]/g)]
    .map((m) => Number(m[1]))
    .filter((v) => v >= bboxHeight);
  if (leftovers.length > 0) {
    throw new Error(
      `${name}: ${leftovers.length} top-[Npx] value(s) still ≥ bbox.height (${bboxHeight}) after rewrite: ${leftovers.slice(0, 5).join(', ')}${leftovers.length > 5 ? '...' : ''}. ` +
      `Likely a Figma export quirk — inspect source.raw.jsx and update the rewrite rule.`
    );
  }

  // 5. Add autogen header + ensure React import (for typed CSSProperties etc.)
  const header = `// AUTO-GENERATED by scripts/figma-process-section.mjs — DO NOT EDIT MANUALLY.
// Source: web-output/stape-v2/sections/${name}/source.raw.jsx
// Figma node: ${meta.nodeId} (file ${meta.fileKey})
// Regenerate: node scripts/figma-process-section.mjs ${name}

import React from 'react';

`;

  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });
  const outPath = join(OUTPUT_DIR, `${meta.componentName}.tsx`);
  writeFileSync(outPath, header + rewritten);

  return {
    name,
    component: outPath,
    assets: downloads.length,
    downloaded: downloads.filter(d => d.downloaded).length,
    skipped: downloads.filter(d => d.skipped).length,
  };
}

const arg = process.argv[2];
if (!arg) {
  console.error('Usage: node scripts/figma-process-section.mjs <section-name> | --all');
  process.exit(1);
}

const targets = arg === '--all'
  ? readdirSync(SECTIONS_DIR).filter(n => existsSync(join(SECTIONS_DIR, n, 'meta.json')))
  : [arg];

for (const t of targets) {
  try {
    const r = await processSection(t);
    console.log(`✓ ${r.name} → ${r.component} (${r.downloaded} downloaded, ${r.skipped} cached)`);
  } catch (e) {
    console.error(`✗ ${t}: ${e.message}`);
    process.exitCode = 1;
  }
}
