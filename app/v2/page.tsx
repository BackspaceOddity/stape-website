// Stape v2 homepage — flow-stack mount.
// Each section is a block in normal document flow. Section bboxes live in
// web-output/stape-v2/node-map.json; page.tsx only reserves each section's
// Figma `height` via a wrapper div. Absolute positioning is allowed INSIDE a
// section (where children carry Figma-absolute coords relative to the section's
// own 0,0) but NEVER at page level.
//
// If a generated component has children with homepage-absolute Y coords baked
// in (e.g. MetricsBand row at `top-[1298px]`), that's a pipeline bug — the
// verify-pixel-perfect.mjs script will flag it. Do not patch page.tsx to
// compensate; fix the generator instead.

import Hero from '@/components/v2/Hero';
import MetricsBand from '@/components/v2/MetricsBand';
import PainScenarios from '@/components/v2/PainScenarios';

// Heights from web-output/stape-v2/node-map.json (bbox.height).
const SECTION_HEIGHTS = {
  hero: 1198,
  metricsBand: 530,
  painScenarios: 1038,
} as const;

export default function HomeV2() {
  return (
    <main className="w-[1440px] mx-auto bg-white">
      <div className="relative w-full" style={{ height: SECTION_HEIGHTS.hero }}>
        <Hero />
      </div>
      <div className="relative w-full" style={{ height: SECTION_HEIGHTS.metricsBand }}>
        <MetricsBand />
      </div>
      <div className="relative w-full" style={{ height: SECTION_HEIGHTS.painScenarios }}>
        <PainScenarios />
      </div>
    </main>
  );
}
