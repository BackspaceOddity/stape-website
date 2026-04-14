// Stape v2 homepage — flow-stack mount.
// Each section is a block in normal document flow. Section bbox + gapBefore live
// in web-output/stape-v2/node-map.json (single source of truth for Figma layout).
// gapBefore preserves Figma's inter-section spacing (typically 100px); without it
// the flow-stack collapses and verify-pixel-perfect crops the wrong region.
//
// Absolute positioning is allowed INSIDE a section (children carry section-local
// coords) but NEVER at page level. If a generated component has children with
// homepage-absolute Y coords baked in (e.g. MetricsBand row at `top-[1298px]`),
// that's a pipeline bug — fix the generator, not page.tsx.

import Hero from '@/components/v2/Hero';
import MetricsBand from '@/components/v2/MetricsBand';
import PainScenarios from '@/components/v2/PainScenarios';
import nodeMap from '@/web-output/stape-v2/node-map.json';

const COMPONENTS: Record<string, React.ComponentType> = {
  hero: Hero,
  'metrics-band': MetricsBand,
  'pain-scenarios': PainScenarios,
};

export default function HomeV2() {
  const mounted = nodeMap.sections.filter((s) => COMPONENTS[s.name]);
  return (
    <main className="w-[1440px] mx-auto bg-white">
      {mounted.map((s) => {
        const Component = COMPONENTS[s.name];
        return (
          <div
            key={s.name}
            className="relative w-full"
            style={{ height: s.bbox.height, marginTop: s.gapBefore }}
          >
            <Component />
          </div>
        );
      })}
    </main>
  );
}
