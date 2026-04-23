#!/usr/bin/env node
/**
 * verify-pixel-perfect.mjs — mechanical Gate 3 for pixel-perfect skill.
 *
 * For each section in web-output/stape-v2/node-map.json:
 *   1. Fetch Figma PNG via REST (needs FIGMA_ACCESS_TOKEN env var)
 *   2. Screenshot running dev server (default http://localhost:3000/v2)
 *      — by element [data-node-id="<id>"] if present, else bbox crop
 *   3. Normalize dimensions, pixelmatch diff, write diff.png
 *   4. Record pct diff in section dir
 * Generate verification.md summary. Exit 1 if any section exceeds threshold.
 *
 * Usage:
 *   node scripts/verify-pixel-perfect.mjs [--section=hero] [--threshold=0.03]
 *                                         [--url=http://localhost:3000/v2]
 *                                         [--scale=2]
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const NODE_MAP_PATH = path.join(ROOT, 'web-output/stape-v2/node-map.json');
const SECTIONS_DIR = path.join(ROOT, 'web-output/stape-v2/sections');
const VERIFICATION_MD = path.join(ROOT, 'web-output/stape-v2/verification.md');

// --- args ---
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v ?? true];
  })
);
const TARGET_SECTION = args.section || null;
const THRESHOLD = Number(args.threshold ?? 0.03); // 3% pixel diff
const BASE_URL = args.url || 'http://localhost:3000/v2';
const SCALE = Number(args.scale ?? 2);
const FIGMA_TOKEN = process.env.FIGMA_ACCESS_TOKEN;

if (!FIGMA_TOKEN) {
  console.error('ERROR: FIGMA_ACCESS_TOKEN env var required');
  process.exit(2);
}

// --- helpers ---
async function fetchFigmaPng(fileKey, nodeId, outPath) {
  const url = `https://api.figma.com/v1/images/${fileKey}?ids=${encodeURIComponent(
    nodeId
  )}&scale=${SCALE}&format=png`;
  const res = await fetch(url, { headers: { 'X-FIGMA-TOKEN': FIGMA_TOKEN } });
  if (!res.ok) throw new Error(`Figma API ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const imgUrl = data.images?.[nodeId];
  if (!imgUrl) throw new Error(`No image URL for node ${nodeId}`);
  const imgRes = await fetch(imgUrl);
  if (!imgRes.ok) throw new Error(`Image download ${imgRes.status}`);
  const buf = Buffer.from(await imgRes.arrayBuffer());
  await fs.writeFile(outPath, buf);
  return outPath;
}

async function capturePreview(page, section, outPath) {
  const selector = `[data-node-id="${section.nodeId}"]`;
  const handle = await page.$(selector);
  // Try element-level screenshot only if element is a real box (not display:contents).
  if (handle) {
    const boxable = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return false;
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return cs.display !== 'contents' && r.width > 0 && r.height > 0;
    }, selector);
    if (boxable) {
      try {
        await handle.screenshot({ path: outPath });
        return { mode: 'selector' };
      } catch { /* fall through to bbox crop */ }
    }
  }
  // Fallback: full-page screenshot, then crop to bbox.
  // node-map schema: section.bbox = { top, left, width, height }; `x/y/w/h` kept as legacy alias.
  const bb = section.bbox || { top: section.y, left: section.x, width: section.w, height: section.h };
  const { top: y, left: x, width: w, height: h } = bb;
  const fullPath = outPath.replace(/\.png$/, '.full.png');
  await page.screenshot({ path: fullPath, fullPage: true });
  const full = PNG.sync.read(await fs.readFile(fullPath));
  // Account for deviceScaleFactor — page.screenshot returns scaled pixels.
  const dpr = SCALE;
  const clipped = new PNG({ width: w * dpr, height: h * dpr });
  PNG.bitblt(full, clipped, x * dpr, y * dpr, w * dpr, h * dpr, 0, 0);
  await fs.writeFile(outPath, PNG.sync.write(clipped));
  await fs.unlink(fullPath).catch(() => {});
  return { mode: 'bbox-crop' };
}

async function resizeToMatch(src, targetW, targetH) {
  // Naive resize via canvas-less approach: if dims differ, scale via puppeteer-free nearest-neighbor.
  const img = PNG.sync.read(await fs.readFile(src));
  if (img.width === targetW && img.height === targetH) return img;
  const out = new PNG({ width: targetW, height: targetH });
  for (let y = 0; y < targetH; y++) {
    const sy = Math.floor((y * img.height) / targetH);
    for (let x = 0; x < targetW; x++) {
      const sx = Math.floor((x * img.width) / targetW);
      const si = (img.width * sy + sx) << 2;
      const di = (targetW * y + x) << 2;
      out.data[di] = img.data[si];
      out.data[di + 1] = img.data[si + 1];
      out.data[di + 2] = img.data[si + 2];
      out.data[di + 3] = img.data[si + 3];
    }
  }
  return out;
}

async function diffSection(section) {
  const dir = path.join(SECTIONS_DIR, section.name);
  await fs.mkdir(dir, { recursive: true });
  const figmaPath = path.join(dir, 'figma.png');
  const previewPath = path.join(dir, 'preview.png');
  const diffPath = path.join(dir, 'diff.png');

  // 1. Figma
  await fetchFigmaPng(nodeMap.fileKey, section.nodeId, figmaPath);

  // 2. Preview
  const previewMeta = await capturePreview(page, section, previewPath);

  // 3. Normalize + diff
  const figmaImg = PNG.sync.read(await fs.readFile(figmaPath));
  const previewImg = await resizeToMatch(previewPath, figmaImg.width, figmaImg.height);
  const diff = new PNG({ width: figmaImg.width, height: figmaImg.height });
  const mismatched = pixelmatch(
    figmaImg.data,
    previewImg.data,
    diff.data,
    figmaImg.width,
    figmaImg.height,
    { threshold: 0.1, alpha: 0.3 }
  );
  await fs.writeFile(diffPath, PNG.sync.write(diff));
  const pct = mismatched / (figmaImg.width * figmaImg.height);
  return { pct, mismatched, dims: `${figmaImg.width}×${figmaImg.height}`, mode: previewMeta.mode };
}

// --- main ---
const nodeMap = JSON.parse(await fs.readFile(NODE_MAP_PATH, 'utf8'));
const sections = TARGET_SECTION
  ? nodeMap.sections.filter((s) => s.name === TARGET_SECTION)
  : nodeMap.sections;
if (sections.length === 0) {
  console.error(`No sections matched (target: ${TARGET_SECTION || 'all'})`);
  process.exit(2);
}

console.log(`Launching puppeteer, navigating to ${BASE_URL} ...`);
const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: SCALE });
try {
  await page.goto(BASE_URL, { waitUntil: 'networkidle0', timeout: 30000 });
} catch (e) {
  console.error(`ERROR: could not load ${BASE_URL} — is dev server running? (${e.message})`);
  await browser.close();
  process.exit(2);
}
await new Promise((r) => setTimeout(r, 1500)); // let fonts/animations settle

const results = [];
for (const section of sections) {
  process.stdout.write(`  ${section.name.padEnd(22)} ... `);
  try {
    const r = await diffSection(section);
    const pass = r.pct <= THRESHOLD;
    results.push({ section: section.name, nodeId: section.nodeId, ...r, pass });
    console.log(`${pass ? '✅' : '❌'} ${(r.pct * 100).toFixed(2)}% diff [${r.mode}]`);
  } catch (e) {
    results.push({ section: section.name, nodeId: section.nodeId, error: e.message, pass: false });
    console.log(`💥 ${e.message}`);
  }
}

await browser.close();

// --- write verification.md ---
const now = new Date().toISOString();
const lines = [
  `# Pixel-Perfect Verification`,
  ``,
  `**Generated:** ${now}`,
  `**Base URL:** ${BASE_URL}`,
  `**Threshold:** ${(THRESHOLD * 100).toFixed(1)}% pixel diff`,
  `**Scope:** ${TARGET_SECTION || 'all sections'}`,
  ``,
  `| Section | nodeId | Diff | Mode | Status |`,
  `|---------|--------|------|------|--------|`,
  ...results.map((r) =>
    r.error
      ? `| ${r.section} | \`${r.nodeId}\` | — | — | 💥 ${r.error} |`
      : `| ${r.section} | \`${r.nodeId}\` | ${(r.pct * 100).toFixed(2)}% | ${r.mode} | ${r.pass ? '✅ pass' : '❌ fail'} |`
  ),
  ``,
  `**Artifacts per section:** \`web-output/stape-v2/sections/<name>/{figma,preview,diff}.png\``,
];

// Merge with existing (keep prior runs as history)
let existing = '';
try { existing = await fs.readFile(VERIFICATION_MD, 'utf8'); } catch {}
const history = existing
  ? `\n\n---\n\n## Prior runs\n\n${existing.replace(/^# Pixel-Perfect Verification[\s\S]*?(?=\n## |\n$)/, '').trim()}`
  : '';
await fs.writeFile(VERIFICATION_MD, lines.join('\n') + history);

const failed = results.filter((r) => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} passed. Report: ${path.relative(ROOT, VERIFICATION_MD)}`);
if (failed.length > 0) {
  console.log(`FAILED: ${failed.map((f) => f.section).join(', ')}`);
  process.exit(1);
}
process.exit(0);
