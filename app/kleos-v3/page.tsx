'use client';

import HeroV2 from '@/components/v2/HeroV2';
import HeroImageBand from '@/components/v2/HeroImageBand';
import TriggerBar from '@/components/v2/TriggerBar';
import MetricsV2 from '@/components/v2/MetricsV2';
import WorkThatDisappearsV2 from '@/components/v2/WorkThatDisappearsV2';
import TimelineV2 from '@/components/v2/TimelineV2';
import ComplianceFirewall from '@/components/v2/ComplianceFirewall';
import SocialProofV2 from '@/components/v2/SocialProofV2';
import ComparisonTableV2 from '@/components/v2/ComparisonTableV2';
import PayrollGeekLevel from '@/components/v2/PayrollGeekLevel';
import PricingComparison from '@/components/PricingComparison';
import FAQV2 from '@/components/v2/FAQV2';
import CTAV2 from '@/components/v2/CTAV2';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TrustBadgeBar from '@/components/TrustBadgeBar';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function KleosV3() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroV2 />
      <HeroImageBand />
      <TrustBadgeBar />
      <MetricsV2 />
      <TriggerBar />
      <WorkThatDisappearsV2 />
      <TimelineV2 backgroundImage={`${BASE}/kleos-v3/images/sky.png`} />
      <ComplianceFirewall />
      <SocialProofV2 />
      <ComparisonTableV2 />
      <PayrollGeekLevel />
      <PricingComparison />
      <FAQV2 />
      <CTAV2 backgroundImage={`${BASE}/kleos-v3/images/bg-city.png`} />
      <Footer />
    </main>
  );
}
