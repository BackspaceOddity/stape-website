'use client';

import HeroV2 from '@/components/v2/HeroV2';
import TriggerBar from '@/components/v2/TriggerBar';
import MetricsV2 from '@/components/v2/MetricsV2';
import ProductShowcaseV2 from '@/components/v2/ProductShowcaseV2';
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

export default function HomeV2() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroV2 />
      <MetricsV2 />
      <TriggerBar />
      <ProductShowcaseV2 />
      <WorkThatDisappearsV2 />
      <TimelineV2 />
      <ComplianceFirewall />
      <SocialProofV2 />
      <ComparisonTableV2 />
      <PayrollGeekLevel />
      <PricingComparison />
      <FAQV2 />
      <CTAV2 />
      <Footer />
    </main>
  );
}
